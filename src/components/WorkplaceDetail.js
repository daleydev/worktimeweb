import React from "react";
import { Firestore } from '../firebase/firebase'
import TimeTable from "./TimeTable";

// material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    maxWidth: 1200,
    height: 300,
    margin: "auto",
    width: "80vw"
  }
}));

const Workplace = () => {
  const classes = useStyles();

  const foo = () => {
    Firestore.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }

  return (
    <div>
      {/* <button onClick={foo}>Click</button> */}
      <Paper className={classes.header}>Chatime</Paper>
      <TimeTable />
    </div>
  );
};

export default Workplace;
