import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import "./index.css";
import { store } from './pages/store/index';
import PageRoutes from './routes/Routes';
import Header from './Layout/Header';
import { Grid} from '@mui/material';

function App() {
  return (
    <>
    <Provider store={store}>   
      <Router>
      <Grid container spacing={0}>
      <Header />  
        <PageRoutes /> 
        </Grid>      
      </Router> 
      
    </Provider>
    </>
  );
}
export default App;
