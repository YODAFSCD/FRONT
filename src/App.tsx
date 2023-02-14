import './App.css';
import RootLayout from "./layouts/RootLayout";
import {Home} from "./pages/Home";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import {NotFound} from "./pages/NotFound";

import {Product} from "./pages/Product";
import Client from './pages/ClientGet';
import { Invoice } from './pages/Invoice';
import Category from './pages/Category';
import { Detail } from './pages/Detail';



const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>

        <Route index element={<Home />}/>
        <Route path='category' element={<Category />}/>
        <Route path='client' element={<Client />}/>
        <Route path='invoice' element={<Invoice  />}/>
        <Route path='detalle' element={<Detail  />}/>
        <Route path='product' element={<Product />}/>
        <Route path="*" element={<NotFound />}/>
    </Route>
))

function App() {
  return (
          <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
