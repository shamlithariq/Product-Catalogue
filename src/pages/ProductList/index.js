import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Tabs, Tab, Paper, Typography, Grid, InputBase } from "@mui/material";
import InfiniteScroll from 'react-infinite-scroll-component';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { getProductCat, getProductList } from '../store/ProductList/actions';
import ProductItem from "./ProductItem";

export  const ProductList = () => {
  const {data: { productList, pCategories }} = useSelector(state => state.productList);
  const dispatch = useDispatch();
  
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchField, setSearchField] = useState('');
  const [sortField, setSortField] = useState(true);
  const [page, setPage] = useState(1);
  const rowCount = 5;

  const fetchNextData = () => {
   setPage(prevPage => prevPage + 1)
 };

  useEffect(() => {
    dispatch(getProductCat());   
  }, []);

  useEffect(() => {
   if(pCategories?.length > 0) {
    dispatch(getProductList());
   }
  }, [dispatch, pCategories]);
  
  const onCategoryChange = (e, catId) => {
    setSelectedCat(catId);
  };

  const filteredProducts = (useMemo(() => {
    let filteredProd = productList;
    if(productList?.length > 0) {
    if(selectedCat !== 'all' && searchField)
    filteredProd = productList.filter((pItem) => pItem.category === selectedCat 
    && new RegExp( searchField, "i").test( pItem.title ));
    else if(selectedCat !== 'all' && !searchField)
    filteredProd = productList.filter((pItem) =>  pItem.category === selectedCat );
    else if(selectedCat === 'all' && searchField)
    filteredProd = productList.filter((pItem) =>  new RegExp( searchField, "i").test( pItem.title ));
    }
    if(sortField)  // ASC
    filteredProd = [...filteredProd].sort( (a,b) => a.title.localeCompare(b.title ));
    else 
    filteredProd = [...filteredProd].sort((a,b) => b.title.localeCompare(a.title ));
    return filteredProd;

  }, [productList, selectedCat, searchField, sortField]));

  const paginatedProducts = useMemo(() => {
    return filteredProducts?.slice( 0, page*rowCount);
  }, [filteredProducts, page]);

  return (
    <>   
    <Grid item xs={12}  container  style={{backgroundColor: 'black'}}  >
    <Paper style={{marginInlineStart: '20%'}}>
      <Tabs
        value={selectedCat}
        onChange={onCategoryChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ backgroundColor: 'black'}}
      >
         <Tab
            key={'all'}
            label={              
              <Typography style={{ color: selectedCat === 'all' ? 'red' : 'white', textTransform: 'none', fontSize: '14px' }}>
            All Products
              </Typography>
            }
             value={'all'}
            sx={{ backgroundColor: 'black' }}
          />
         
        {pCategories && pCategories?.map?.((catg) => (
          <Tab
            key={catg}
            label={
              <Typography style={{ color: selectedCat === catg ? 'red' : 'white', textTransform: 'capitalize', fontSize: '14px' }}>
             {catg} 
              </Typography>
            }
             value={catg}
            sx={{ backgroundColor: 'black' }}
          />
        ))}
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
   <Grid item xs={12} justifyContent={"flex-end"}  style={{marginInlineStart: '20%' }} p={2}>
      {selectedCat && (
              <InfiniteScroll
              dataLength={paginatedProducts?.length} //This is important field to render the next data
              next={fetchNextData}
              hasMore={paginatedProducts?.length < filteredProducts?.length} 
              loader={<h4>Loading...</h4>}
              endMessage={
                <p >
                  <b>Yay! You have seen it all</b>
                </p>
              }
              >
        <div className="tab" id={selectedCat}>
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

export default ProductList;
