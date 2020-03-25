import React, { useState, useEffect } from "react";
import FirebaseApp from "../../../firebase";
import { getCurrentWeek } from "../../../helper/date";

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
    paddingTop: 30
  }
});

const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function WorkplaceTimeTable({ users, workplace }) {
  const classes = useStyles();
  const [sundayFirst, setSundayFirst] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek(sundayFirst));
  const [currentShifts, setCurrentShifts] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const db = FirebaseApp.firestore();
  const workplaceRef = db.collection("workplaces").doc(workplace.workplaceUid);

  // console.log("The users from this workplace are: ", users);
  // console.log("The current workplace is: ", workplace);
  // console.log("The shifts of current week are: ", currentShifts);
  console.log(currentWeek)

  useEffect(() => {
    getShifts();
  }, [currentWeek]);

  useEffect(() => {
    fillTableWithShifts();
  }, [users]);

  const getShifts = () => {
    setCurrentShifts([]);
    const calendarRef = workplaceRef.collection("calendar");
    currentWeek.map(day => {
      const date = `${day.getDate()}-${day.getMonth() +
        1}-${day.getFullYear()}`;
      calendarRef
        .doc(date)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());

            const translateShifts = (shifts) => {
              console.log(shifts)
              let newShifts = []
              if (shifts) {
                shifts.map( shift => {
                // console.log(shift)
                const newShift = {
                  userId: shift.userId,
                  userName: shift.userName,
                  startTime: shift.startTime.toDate(),
                  endTime: shift.endTime.toDate()
                }
                newShifts.push(newShift)
              })
              return newShifts
              } else {
                return newShifts
              }
            }  
            
            let data = {
              note: doc.data().note || '',
              date: doc.data().date.toDate(),
              shifts: translateShifts(doc.data().shifts)
            }
            setCurrentShifts(shifts => [...shifts, data]);
            // return doc.data();
          } else {
            // doc.data() will be undefined in this case
            setCurrentShifts(shifts => [...shifts, {}]);
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
      console.log(date);
    });
  };

  const fillTableWithShifts = () => {
    setUserRows([])
    const dayList = ['sun','mon','tue','wed','thu','fri','sat']
    users.map(user => {
      console.log(user)
      let userRow = {
        name: user.userName,
        id: user.userId,
        mon: '',
        tue:'',
        wed:'',
        thu: '',
        fri: '',
        sat: '',
        sun: ''
      };
      currentShifts.forEach( (dayShifts, index) => {
      //   console.log(index)
      console.log(dayShifts)
        if (dayShifts.shifts) {
          dayShifts.shifts.map( shift => {
            console.log(shift)
            if (shift.userId == user.userId) {
              const day = dayList[shift.startTime.getDay()];
              const startTime = `${shift.startTime.getHours()}:${shift.startTime.getMinutes()}`
              const endTime = `${shift.endTime.getHours()}:${shift.endTime.getMinutes()}`

              userRow[day] = `${startTime} - ${endTime}`
            }
          })
        }
      })
      setUserRows( userRows => [...userRows, userRow])
    });
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{""}</TableCell>
            {currentWeek.map(date => (
              <TableCell align="center" key={date.getDate()}>
                {days[date.getDay()]} {date.getDate()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
{userRows.map(userRow => (
            <TableRow key={userRow.id}>
              <TableCell component="th" scope="row">
                {userRow.name}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.sun : userRow.mon}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.mon : userRow.tue}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.tue : userRow.wed}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.wed : userRow.thu}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.thu : userRow.fri}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.fri : userRow.sat}
              </TableCell>
              <TableCell>
                { sundayFirst ? userRow.sat : userRow.sun}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
