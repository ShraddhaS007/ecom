import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Home from './pages/Home'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import Nabar from './components/Nabar'
import ProCol from './pages/ProCol'
import NewArrivals from './pages/NewArrivals'
import Footer from './components/Footer'
import ShopContextProvider from './context/ShopContext'
import BestSellers from './pages/BestSellers'
import Traditional from './pages/Traditional'
import ShopByCategory from './components/ShopByCategory'
import Top from './pages/Top'
import Bottom from './pages/Bottom'
import Lehe from './pages/Lehe'
import Dress from './pages/Dress'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from './pages/Verify'




const App = () => {
  return (
    <div className='abcd'>
       <ShopContextProvider> <Nabar/>       </ShopContextProvider>
     
      <Routes>
          <Route path='/' element={<ShopContextProvider><Home/></ShopContextProvider>}/>
          
          <Route path='/ProCol' element={<ShopContextProvider><ProCol /></ShopContextProvider>}/>
          <Route path='/ShopByCategory' element={<ShopByCategory/>}/>
          <Route path='/NewArrivals' element={<ShopContextProvider><NewArrivals/></ShopContextProvider>}/>
          <Route path='/BestSellers' element={<ShopContextProvider><BestSellers/></ShopContextProvider>}/>
          <Route path='/Traditional' element={<ShopContextProvider><Traditional/></ShopContextProvider>}/>
          <Route path='/top' element={<ShopContextProvider><Top/></ShopContextProvider>}/>
          <Route path='/bottom' element={<ShopContextProvider><Bottom/></ShopContextProvider>}/>
          <Route path='/lehe' element={<ShopContextProvider><Lehe/></ShopContextProvider>}/>
          <Route path='/dress' element={<ShopContextProvider><Dress/></ShopContextProvider>}/>
        
          <Route path='/Orders' element={<ShopContextProvider><Orders/></ShopContextProvider>}/>
          <Route path='/Login' element={<ShopContextProvider><Login/></ShopContextProvider>}/>
          <Route path='/product/:_id' element={<ShopContextProvider><Product/></ShopContextProvider>}/>
          <Route path='/PlaceOrder' element={<ShopContextProvider><PlaceOrder/></ShopContextProvider>}/>
          <Route path='/Cart' element={<ShopContextProvider><Cart/></ShopContextProvider>}/>
          <Route path='/verify' element={<ShopContextProvider><Verify/></ShopContextProvider>}/>
      </Routes>
      <Footer/>
      <ToastContainer />
    </div>
   

  )
}

export default App

