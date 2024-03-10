import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';

import ProductList from '../pages/ProductList';
import FavProducts from '../pages/ProductList/FavProducts';
import ProductDetailsPage from '../pages/ProductList/ProductDetails';

const PageRoutes = () => {
    return (   
        <Routes >          
          <Route path="/" element={<Navigate replace to="/productList" />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/myFavProducts" element={<FavProducts />} />
          <Route path="/productDetails/:pId" element={<ProductDetailsPage />}/>
        </Routes >
    )}

export default PageRoutes;