import React, { useState, useEffect } from "react";
import FirebaseApp from "../../../firebase";
import TimeTable from "./WorkplaceTimeTable";

// material ui imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Fab } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {},
  goBack: {
    marginBottom: 30
  },
  editFAB: {
    position: "absolute",
    bottom: "5vh",
    right: "10vw"
  }
}));

const WorkplaceDetail = ({ workplace, close }) => {
  const classes = useStyles();

  const [loadTable, setLoadTable] = useState(true);
  const [onEdit, setOnEdit] = useState(false);
  const [userList, setUserList] = useState([]);

  console.log(userList);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const db = FirebaseApp.firestore();
    const usersRef = db
      .collection("workplaces")
      .doc(workplace.workplaceUid)
      .collection("users");

    usersRef
      .where("onTimeTable", "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUserList(userList => [...userList, doc.data()]);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div>
      <button onClick={close} className={classes.goBack}>
        Go back
      </button>
      <Typography variant="h4">{workplace.name}</Typography>
      <Typography variant="h6">{workplace.address}</Typography>

      <Fab
        color="secondary"
        aria-label="edit"
        className={classes.editFAB}
        onClick={() => setOnEdit(!onEdit)}
      >
        <EditIcon />
      </Fab>

      <TimeTable users={userList} workplace={workplace} />
    </div>
  );
};

export default WorkplaceDetail;
