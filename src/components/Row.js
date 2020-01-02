import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@material-ui/core/";

const Row = ({ row, priceMin, price }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(price.min < priceMin ? false : true);
  }, [price, priceMin]);

  return (
    <>
      {
        <TableRow key={row.id} className={disabled ? "disabled" : "show"}>
          <TableCell>
            <Link to={"/" + row.id}>{row.name}</Link>
          </TableCell>
          <TableCell>
            <Link to={"/" + row.id}>
              {price.max
                ? price.min + " to " + price.max + " " + price.currency
                : "-"}
            </Link>
          </TableCell>
          <TableCell>
            <Link to={"/" + row.id}>
              {row.dates.start.localDate} {row.dates.start.localTime}
            </Link>
          </TableCell>
        </TableRow>
      }
    </>
  );
};

export default Row;
