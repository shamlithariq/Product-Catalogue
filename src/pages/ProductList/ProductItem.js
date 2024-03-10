import React from "react";
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Link } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToFavourites } from "../store/ProductList/productSlice";

export default function ProductItem({productDetails}) {
  const {data: { favProdList }} = useSelector(state => state.productList);
  const dispatch = useDispatch();

   const addToFav = (prodId) => {
  dispatch(addToFavourites(prodId))
   }

  return (
    <div key={`${productDetails?.id}`} className="dish-item">
    <div className="dish-details">
    <Link component={RouterLink} to={`/productDetails/${productDetails?.id}`} underline="none">
      <Typography variant="h6" style={{ color: 'white', fontSize: '13px', fontFamily: 'Arial', display: 'flex', alignItems: 'center' }}>
        {productDetails?.title}
      </Typography>
      </Link>
      <Typography className="dish-c-wrapper">
        <span>$ {productDetails?.price}</span>
        <span className="dish-cal" onClick={() => addToFav(productDetails?.id)} > 
        <FavoriteIcon htmlColor={`${favProdList?.includes(productDetails?.id) ? `red`:  `white`}`} /></span>
      </Typography>
      <Typography className="dish-desc">
        {productDetails?.description}
      </Typography>
      <br />      
      {productDetails?.addonCat && productDetails?.addonCat.length > 0 && (
        <div style={{ color: 'red', marginTop: '10px', fontSize: '11px' }}>
          Customizations available
        </div>
      )}
    </div>
    <div className="dish-info">
      <img
        className="dish-image"
        src={productDetails?.image}
        alt=""
        style={{ width: '120px', height: '100px', borderRadius: '10px' }}
      />
    </div>
  </div>
  );
}