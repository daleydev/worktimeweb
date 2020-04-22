import React from "react";

// style
import "../css/StoreDetail.css";

// material ui
import CancelIcon from "@material-ui/icons/Cancel";

export default function StoreDetail(props) {
  const { currStore, setCurrStore } = props;

  const close = () => {
    setCurrStore();
  };

  return (
    <div className='store-detail'>
      <div className='store-detail-close'>
        <span>
          <CancelIcon onClick={() => close()} />
        </span>
      </div>

      <div className='store-detail-header'>
        <div>{currStore.storeName}</div>
        <div>{currStore.storeLocation}</div>
      </div>

      <div className='store-detail-timetable'></div>

      <div className='store-detail-users'></div>
    </div>
  );
}
