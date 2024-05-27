
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home';
import Item from './pages/Item';
import ItemCategory from './pages/ItemCategory';
import Stock from './pages/Stock';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import EditOrder from "./pages/EditOrder";
import Users from './pages/Users';
import Order from './pages/Order';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/item' element={<Item/>}/>
          <Route path="/itemcategory" element={<ItemCategory/>}/>
          <Route path="/stock" element={<Stock/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/orders/:id/editOrder" element={<EditOrder />} />
          <Route path="/order" element={<Order/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
