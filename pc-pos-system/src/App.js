
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './pages/utils/AuthContext';
import ProtectedRoutes from './pages/utils/ProtectedRoutes';


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Authenticated Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route index element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/item' element={<Item />} />
              <Route path="/itemcategory" element={<ItemCategory />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders/:id/editOrder" element={<EditOrder />} />
              <Route path="/order" element={<Order />} />
            </Route>

            {/* UnAuthenticated Routes */}
            <Route path='*' element={<NoPage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;
