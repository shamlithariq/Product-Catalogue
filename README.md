# Product Catalogue

This project is for displaying products with its complete details.
Details included are product name, description and price. An image is also displayed.

## Features included are
1. Product Sorting
2. Product Search
3. Product filter based on categories
4. Add to favourite feature
5. Infinite scrolling
6. Product details page
7. My favourite products page


###  Technical stack included
1. React
2. react-infinite-scroll-component
3. Redux Toolkit
4. Material UI
5. axios

### API - Fake store API https://fakestoreapi.com/

Note:
For categoryWise filter and product search , there is no API available. So implemeted as in the below steps
1. Fetch all categories and products
2. Store the categories/Products data in the application state using redux toolkit
3. For category wise filter, search & pagination, the logic is implemented inside the component itslef using useMemo feature since no API for filter/pagination/search
4. For add to favourite feature, an application state is used

