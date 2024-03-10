import { useState, useMemo } from "react";
import { useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { Tabs, Tab, Paper, Typography, Grid, InputBase } from "@mui/material";

import InfiniteScroll from 'react-infinite-scroll-component';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import SearchIcon from '@mui/icons-material/Search';

import ProductItem from "./ProductItem";

export  const FavProducts = () => {
  const {data: { productList, favProdList }} = useSelector(state => state.productList);  

  const [searchField, setSearchField] = useState('');
  const [sortField, setSortField] = useState(true);
  const [page, setPage] = useState(1);
  const rowCount = 5;

  const fetchNextData = () => {
   setPage(prevPage => prevPage + 1)
 };

  const favProducts = (useMemo(() => {
    let filteredProd = productList;
    if(productList?.length > 0) {
    if(searchField)
    filteredProd = productList.filter((pItem) => favProdList?.includes(pItem.id)
    && new RegExp( searchField, "i").test( pItem.title ));
    else
    filteredProd = productList.filter((pItem) => favProdList?.includes(pItem.id));
    }
    if(sortField)  // ASC
    filteredProd = [...filteredProd].sort( (a,b) => a.title.localeCompare(b.title ));
    else 
    filteredProd = [...filteredProd].sort((a,b) => b.title.localeCompare(a.title ));
    return filteredProd;
  }, [productList, sortField, searchField, favProdList]));

  const paginatedProducts = useMemo(() => {
    return favProducts?.slice( 0, page*rowCount);
  }, [favProducts, page]);

  return (
    <> 
     <Grid item xs={12}  container  style={{backgroundColor: 'black'}}  >
     <Paper style={{marginInlineStart: '20%'}}>
      <Tabs
        value={'all'}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ backgroundColor: 'black' }}
      >
        <Tab
            component={Link}
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
         <Tab
            key={'all'}
            label={
              <Typography style={{color: 'red', textTransform: 'none', fontSize: '14px' }}>
            My Favourite Products
              </Typography>
            }
             value={'all'}
            sx={{ backgroundColor: 'black' }}
          />
      </Tabs>
    </Paper>
    </Grid>
    <Grid container item xs={12}  spacing={3} style={{marginInlineStart: '20%'}} p={2}>
       <Grid item xs={4}>
       <span onClick={()=> setSortField(!sortField)}  style={{  color: 'white' }}><SortOutlinedIcon />  Sort </span>
      </Grid>
      <Grid item xs={4} container justifyContent={"flex-end"}>
      <div style={{  color: 'white', display: 'flex', alignItems: 'center' }} >
      <span style={{ marginRight: '8px' }}> 
      <InputBase
        placeholder="Search…"
        style={{ color: 'white', fontSize: '1rem' }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e)=> setSearchField(e.target.value)}
        endAdornment={<SearchIcon />}
      /></span>
      </div>
      </Grid>
    </Grid>  
  <Grid item xs={12} justifyContent={"flex-end"}  style={{marginInlineStart: '20%' }}>
      {paginatedProducts?.length > 0 && (
              <InfiniteScroll
              dataLength={paginatedProducts?.length} //This is important field to render the next data
              next={fetchNextData}
              hasMore={paginatedProducts?.length < favProducts?.length} 
              loader={<h4>Loading...</h4>}
              endMessage={
                <p >
                  <b>Yay! You have seen it all</b>
                </p>
              }
              >
        <div className="tab" id={'all'}>
        {paginatedProducts?.length > 0 && paginatedProducts.map((pItem) => (
            <ProductItem productDetails={pItem}/>
              )
            )}
        </div>
        </InfiniteScroll>
      )}
    </Grid>
  </>
  );
};

export default FavProducts;
