import React, { useMemo } from "react";
import {  Typography, Link, Grid, Paper, Tabs, Tab } from "@mui/material";
import { useSelector} from 'react-redux';
import { useParams, Link as RouterLink} from "react-router-dom";


export default function ProductDetailsPage() {
  const {data: { productList }} = useSelector(state => state.productList);
  const { pId } = useParams();

  const productDetails = useMemo(() => {
    return productList.find((pItem) => pItem.id == pId);
  }, [pId, productList]);

  return (
    <>
    <Grid item xs={12}  container  style={{backgroundColor: 'black'}}  >
    <Paper style={{marginInlineStart: '20%'}}>
      <Tabs
        value={productDetails?.id}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ backgroundColor: 'black' }}
      >
           <Tab
            component={RouterLink}
            to="/ProductList"
            key={'all'}
            label={
              <Typography style={{color: 'white', textTransform: 'none', fontSize: '14px' }}>
               All Products
              </Typography>
            }
            value={'all'}
            sx={{ backgroundColor: 'black' }}
          />
      </Tabs>
    </Paper>
    </Grid>
    <Grid item xs={12} justifyContent={"flex-end"}  style={{marginInlineStart: '20%' }}>
          <div className="tab" id={productDetails?.id}>       
      <div key={`${productDetails?.id}`} className="dish-item">
      <div className="dish-details">
      <Link href="#" underline="none">
        <Typography variant="h6" style={{ color: 'white', fontSize: '13px', fontFamily: 'Arial', display: 'flex', alignItems: 'center' }}>
          {productDetails?.title}
        </Typography>
        </Link>
        <Typography className="dish-c-wrapper">
          <span>$ {productDetails?.price}</span>
          
        </Typography>
        <Typography className="dish-desc">
          {productDetails?.description}
        </Typography>
        <br />
        {/* <button
          className="cart-add-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            const buttonWidth = e.currentTarget.offsetWidth;
            const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;
            if (clickPosition < buttonWidth / 2) {
              dispatch(decrementQuantity(dishDetails))
            }
            if (clickPosition >= buttonWidth / 2) {
              dispatch(incrementQuantity(dishDetails))
            }
          }}
        > */}
          {/* <p className="p-cart-add-btn">-</p>
          <span className="p-cart-add-btn">
            { (cart?.length && cart?.find((cartItem) => cartItem?.dish_id == dishDetails?.dish_id)?.quantity) || 0}
            </span>
          <p className="p-cart-add-btn">+</p>
        </button> */}
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
          </div>    
    </Grid>
    </>
  );
}