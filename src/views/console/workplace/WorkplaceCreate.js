import React, { useState, useContext  } from "react";
import firebaseApp from '../../../firebase'
import { AuthContext } from '../../../auth'
import firebase from 'firebase'

import { makeStyles, Grid, Typography, Paper, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      height:300
    },
  }));

const WorkplaceCreateView = (props) => {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);

    const handleCreate = event => {
        event.preventDefault();
        const { name, address, description } = event.target.elements;
        console.log(name.value)

        const db = firebaseApp.firestore()
        const workplaceRef = db.collection("workplaces").doc();
        const userRef = db.collection('users')

        workplaceRef.set({
            name: name.value || '',
            address: address.value || '',
            description: description.value || '',
        })
        .then(function() {
            console.log("Document successfully written!");
            return props.close()
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });


        if (currentUser) {
            userRef.doc(currentUser.uid).update({
                managedWorkplaces: firebase.firestore.FieldValue.arrayUnion(workplaceRef.id)
            }).then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }


      }

  return (
    <>
      <Paper className={classes.root}>
          <button onClick={props.close}>close</button>
        <form onSubmit={handleCreate}>
            <TextField id="standard-basic" label="Workplace Name" name='name' />
            <TextField id="standard-basic" label="Address" name='address' />
            <TextField id="standard-basic" label="Description" name='description' />
            <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
      </Paper>
    </>
  );
};

export default WorkplaceCreateView;
