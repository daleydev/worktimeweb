import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 1200
  },
  container: {
    maxWidth: 1200,
    width: "80vw",
    margin: "auto",
    marginTop: 50
  },
  title: {
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 30,

  }
});

function createWeek(name, mon, tue, wed, thu, fri, sat, sun) {
  return { name, mon, tue, wed, thu, fri, sat, sun };
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

var dates = [9, 10, 11, 12, 13, 14, 15];

const rows = [
  createWeek("Daley", "5 - c", "5 - c", "", "11:30 - 6", "", "7 - c", ""),
  createWeek("Kevin", "7 - c", "11:30 - 6", "", "", "", "5 - c", "4 - 11"),
  createWeek("Kevin", "7 - c", "11:30 - 6", "", "", "", "5 - c", "4 - 11"),
  createWeek("Kevin", "7 - c", "11:30 - 6", "", "", "", "5 - c", "4 - 11"),
  createWeek("Kevin", "7 - c", "11:30 - 6", "", "", "", "5 - c", "4 - 11")
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Typography className={classes.title} variant="h4" id="tableTitle">
        Time Table
      </Typography>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>March</TableCell>
            {dates.map(date => (
              <TableCell align="center">{date}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            {days.map(day => (
              <TableCell align="center">{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.mon}</TableCell>
              <TableCell align="center">{row.tue}</TableCell>
              <TableCell align="center">{row.wed}</TableCell>
              <TableCell align="center">{row.thu}</TableCell>
              <TableCell align="center">{row.fri}</TableCell>
              <TableCell align="center">{row.sat}</TableCell>
              <TableCell align="center">{row.sun}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
