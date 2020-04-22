import React, { useState, useContext, useEffect } from "react";
import "../css/StoreList.css";
import StoreCard from "./StoreCard";
import StoreCreate from "./StoreCreate";
import StoreSearch from "./StoreSearch";
import StoreDetail from "./StoreDetail";
import { AuthContext } from "../auth";
import fireApp from "../firebase";
import SearchIcon from "@material-ui/icons/Search";

export default function StoreList() {
  const storeListTitile = "Workplaces";
  const { currentUser } = useContext(AuthContext);

  // states
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [isSearchingStore, setIsSearchingStore] = useState(false);
  const [currStore, setCurrStore] = useState();
  const [dataUpdate, setDataUpdate] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores();
  }, [dataUpdate]);

  const getStores = async () => {
    const db = fireApp.firestore();
    const userRef = db.collection("users").doc(currentUser.uid);
    const storeRef = db.collection("stores");
    let storeUids = [];

    storeUids = await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data().stores);
          return (storeUids = doc.data().stores);
        } else {
          // doc.data() will be undefined in this case
          console.log("User not found");
        }
      })
      .catch((err) => {
        console.log("Error getting document:", err);
      });

    storeUids.forEach(async (storeUid) => {
      setStores([]);

      const data = await storeRef
        .doc(storeUid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("Store not found");
          }
        })
        .catch((err) => {
          console.log("Error getting document:", err);
        });

      setStores((stores) => [...stores, data]);
      setDataUpdate(false);
    });
  };

  function showCreatingStore() {
    return setIsCreatingStore(true);
  }

  function showSearchView() {
    return setIsSearchingStore(true);
  }

  if (isCreatingStore) {
    return (
      <div className='store-list'>
        <StoreCreate
          setIsCreatingStore={setIsCreatingStore}
          setDataUpdate={setDataUpdate}
        />
      </div>
    );
  }

  if (isSearchingStore) {
    return (
      <div className='store-list'>
        <StoreSearch setIsSearchingStore={setIsSearchingStore} />
      </div>
    );
  }

  if (currStore) {
    return (
      <div className='store-list'>
        <StoreDetail currStore={currStore} setCurrStore={setCurrStore}/>
      </div>
    );
  }

  return (
    <div className='store-list'>
      <div className='store-list-header'>
        <div className='store-list-title'>{storeListTitile}</div>

        <button className='store-list-search' onClick={() => showSearchView()}>
          <SearchIcon style={{ color: "#fff" }} />
        </button>
      </div>

      <div className='store-list-body'>
        {stores.map((store) => (
          <div onClick={() => setCurrStore(store)}>
            <StoreCard key={store.storeUid} store={store} />
          </div>
        ))}

        <div className='store-list-add' onClick={() => showCreatingStore()}>
          <span>+</span>
        </div>
      </div>
    </div>
  );
}
