import React from "react";
import "../css/StoreCard.css";
import imagePlaceholder from '../img/img_placeholder.png';

export default function StoreCard(props) {
  const { store } = props;

  return (
    <div className='store-card'>
      <div className='store-card-header'>
        <div className='store-card-header-info'>
          <div className='store-card-header-name'>
               { store.storeName || 'Store Name' }
          </div>
          <div className='store-card-header-location'>
               { store.storeLocation || 'location'}
          </div>
        </div>

        <div className='store-card-header-img'>
             <img src={store.storeLogo || imagePlaceholder} alt='workplace image' />
        </div>
      </div>
    </div>
  );
}
