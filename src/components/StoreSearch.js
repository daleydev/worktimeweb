import React, { useState, useEffect } from "react";
import fireApp from "../firebase";
import "../css/StoreSearch.css";
import StoreCard from "./StoreCard";

import SearchIcon from "@material-ui/icons/Search";

export default function StoreSearch(props) {
  const { setIsSearchingStore } = props;
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [targetStore, setTargetStore] = useState("");
  

  const close = () => {
    setIsSearchingStore(false);
  };

  const getStores = (text) => {
    const db = fireApp.firestore();
    setSearchResult([]);

    db.collection("stores")
      .where("searchCode", "==", text.toLowerCase())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          setSearchResult((result) => [...result, doc.data()]);
        });
      });
  };

  if (targetStore) {
       alert(`Confirm to send request to ${targetStore.storeName}`)
  }

  return (
    <div className='store-search'>
      <div onClick={() => setIsSearchingStore()}>back</div>
      <div className='store-search-header'>
        <input
          className='store-search-input'
          placeholder='enter code'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span onClick={() => getStores(searchText)}>
          <SearchIcon />
        </span>
      </div>

      <div className='store-search-results'>
        {searchResult.map((store) => (
          <div onClick={ () => setTargetStore(store)}>
            <StoreCard key={store.storeUid} store={store} />
          </div>
        ))}
      </div>
    </div>
  );
}
