import React, {useState} from 'react';
import { Link, BrowserRouter } from 'react-router-dom'
import FetchData from './fetchData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import {Paper, Grid} from '@material-ui/core';
// import {API_URL} from '../constants';

const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=3ofV0pnHEKQLOpEUzPvMmDkW2vzJOGJd"

const TableList = () => {
	const [dataState] = FetchData(API_URL);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [tableItem, setItem] = useState({
		promoter: [],
	});
	
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		console.log(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
		console.log(event.target.value);
	}

	if (dataState.data.length > 0) {
		console.log(dataState.data[0]);
	}

	// dataState.foreach(el => console.log(el)
	
	return (
	<div className="container">
		<Paper>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Event</TableCell>
						<TableCell>Promoter</TableCell>
						<TableCell>Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
            {(rowsPerPage > 0
              ? dataState.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : dataState.data
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell>
					<Link to={'/' + row.id}>
                  		{row.name}
				 	 </Link>
                </TableCell>
                <TableCell>
					<Link to={'/' + row.id}>
					</Link>
				</TableCell>
                <TableCell>
					<Link to={'/' + row.id}>
						{row.dates.start.localDate} {row.dates.start.localTime}
					</Link>
				</TableCell>
              </TableRow>
            ))}
          </TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={50}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	</div>
	)
}

  export default TableList;