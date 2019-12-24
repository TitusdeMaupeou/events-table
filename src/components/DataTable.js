import React, { useState } from "react";
import { Link } from "react-router-dom";
import FetchData from "../hooks/FetchData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Paper } from "@material-ui/core";
import Slider from '@material-ui/core/Slider';

const API_URL =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd";

const DataTable = () => {
  const [dataState] = FetchData(API_URL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [priceMin, setPriceMin] = useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const handlePriceChange = (event, newValue) => {
    setPriceMin(newValue);
  };

const priceRanges = (row, priceMin) => 
  Object.keys(row).map(() => {
    let obj = {}
    row.priceRanges !== undefined
    ? row.priceRanges
    .filter(i => {
      return i.min < priceMin
    })
    .map(j =>
        obj.min = j.min
      ) : obj.min = "-"
    return obj.min;
});

/*  to filter out whole rows with a lower price,
    I could use this and replace the dataState.data
    below with this function
*/

const rows = dataState.data.filter(top => {
  if (top.priceRanges !== undefined) {
      top.priceRanges.filter(i => i.min < priceMin)
    }
  }
);
return (
  <div className="container">
    <Paper>
      <Table>
        <Slider   
          defaultValue={0}
          onChange={handlePriceChange}
          step={10}
          valueLabelDisplay="auto" 
        />
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell>Price Ranges</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dataState.data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : dataState.data
          )
          .map(row => (
            <TableRow key={row.id}>
              <TableCell>
                <Link to={"/" + row.id}>{row.name}</Link>
              </TableCell>
              <TableCell>
                <Link to={"/" + row.id}>
                {priceRanges(row, priceMin)[0]}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={"/" + row.id}>
                  {row.dates.start.localDate} {row.dates.start.localTime}
                </Link>
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={dataState.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  </div>
);
};

export default DataTable;
