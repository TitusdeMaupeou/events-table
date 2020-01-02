import React, { useState } from "react";
import { Link } from "react-router-dom";
import FetchData from "../hooks/FetchData";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  Slider,
  Paper
} from "@material-ui/core/";
import Row from "./Row";

const API_URL =
  "https://app.ticketmaster.com/discovery/v2/events.json?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd";

const DataTable = () => {
  const [dataState] = FetchData(API_URL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const priceRanges = row =>
    Object.keys(row).map(() => {
      let obj = {};
      row.priceRanges !== undefined
        ? row.priceRanges.map(j => {
            obj.max = j.max;
            obj.min = j.min;
            obj.currency = j.currency;
          })
        : (obj.min = "-");
      return obj;
    });

  return (
    <div className="container">
      <Paper>
        <Table>
          <Slider
            defaultValue={50}
            onChange={handlePriceChange}
            step={10}
            max={200}
            valueLabelDisplay="auto"
            className="table__slider"
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
            ).map(row => (
              <Row
                key={row.id}
                row={row}
                priceMin={priceMin}
                price={priceRanges(row)[0]}
              ></Row>
            ))}
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
