import React, { useState, useContext } from "react";
import { AuthContext } from "../auth";

// style
import "../css/StoreCreate.css";

// firebase
import firebase from "firebase";
import fireApp from "../firebase";

// material ui
import { TextField, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function StoreCreate(props) {
  const { setIsCreatingStore, setDataUpdate } = props;
  const { currentUser } = useContext(AuthContext);
  const [storeName, setStoreName] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  console.log(storeName);
  console.log(storeLocation);

  const close = () => {
    setIsCreatingStore(false);
  };

  const createStore = (e) => {
    e.preventDefault();
    const db = fireApp.firestore();
    const userRef = db.collection("users").doc(currentUser.uid);
    const storeRef = db.collection("stores").doc();
    const storeUid = storeRef.id;

    if (storeName && storeLocation) {
      storeRef
        .set({
          createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          lastChangeTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          storeUid: storeUid,
          storeName: storeName,
          storeLocation: storeLocation,
          storeLogo: '',
          searchCode: '',
          joinRequests: [],
          manager: [],
          owner: []
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((err) => {
          console.error("Error adding document: ", err);
        });
    }

    userRef.update({
      stores: firebase.firestore.FieldValue.arrayUnion(storeUid),
    });

    setDataUpdate(true);

    close();
  };

  return (
    <div className='store-create-create'>
      <div >
        <span className='store-create-back' onClick={() => close()}>
          <ArrowBackIcon />
        </span>
      </div>

      <div className='store-create-header'>Create a store</div>

      <form className='store-create-form' onSubmit={(e) => createStore(e)}>
        <TextField
          id=''
          label='Store Name'
          variant='outlined'
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Store Location'
          variant='outlined'
          value={storeLocation}
          onChange={(e) => setStoreLocation(e.target.value)}
        />
        <Button
          className='store-create-button'
          variant='contained'
          color='primary'
          type='submit'
        >
          Create
        </Button>
      </form>
    </div>
  );
}
