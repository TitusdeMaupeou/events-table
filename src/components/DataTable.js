import React, { useState } from "react";
import { Link } from "react-router-dom";
import FetchData from "./FetchData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Paper } from "@material-ui/core";

const API_URL =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd";

const DataTable = () => {
  const [dataState] = FetchData(API_URL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

// const priceRanges = Object(dataState.data).map((key, index) => {
//   let arr = []
//   dataState.data[index].priceRanges !== undefined
//   ? dataState.data[index].priceRanges.map(j =>
//       arr[index] = j.min + " to " + j.max + " " + j.currency
//     ) : arr[index] = "-"
//   return arr;
// });

const priceRanges = (row, index) => Object.values(row).map((key, index) => {
  let arr = []
  row.priceRanges !== undefined
  ? row.priceRanges.map(j =>
      arr[index] = j.min + " to " + j.max + " " + j.currency
    ) : arr[index] = "-"
  return arr;
});

  return (
    <div className="container">
      <Paper>
        <Table>
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
            ).map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link to={"/" + row.id}>{row.name}</Link>
                </TableCell>
                <TableCell>
                  <Link to={"/" + row.id}>
                  {priceRanges(row, i)[0]}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={"/" + row.id}>
                    {row.dates.start.localDate} {row.dates.start.localTime}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={50}
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
