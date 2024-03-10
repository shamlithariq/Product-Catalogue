import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography, Backdrop } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Header() {
  const navigate = useNavigate();
  const {data: { favProdList }, isLoading} = useSelector(state => state.productList);
  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
  <Grid container item xs={12}  spacing={3} style={{marginInlineStart: '20%'}} p={2}>
       <Grid item xs={4}>
          <Typography variant="h4" style={{ fontFamily: 'Roboto', color: 'white', fontWeightRegular: 400, fontSize: '1.2rem' }}>
          Zara Fashion
        </Typography>
      </Grid>
      <Grid item xs={4} container justifyContent={"flex-end"}>
        <div style={{  color: 'white', display: 'flex', alignItems: 'center' }} onClick={()=> navigate('/myFavProducts')}>
        <span style={{ marginRight: '8px' }}>My Favourites</span>
        <FavoriteIcon />
          <div className='cart-wrapper'>
            <span
              className="cart-count"
            >
              {favProdList?.length}
            </span>
          </div> 
        </div>
      </Grid>
  </Grid>  
  );
}