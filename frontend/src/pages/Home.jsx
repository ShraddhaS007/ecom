import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import { products } from '../assets/assets'
import NewArrival from '../components/NewArrival'
 import ShopByCategory from '../components/ShopByCategory'
import OurPolicy from '../components/OurPolicy'
import TestimonialSlider from '../components/TestimonialSlider'




const Home = () => {
  
  
  return (
    <div>
      <Hero/>
      <ShopByCategory products={products}/>
      <NewArrival products={products}/>
      <BestSeller products={products}/>
      <OurPolicy/>
      <TestimonialSlider/>
      
    </div>
  )
}

export default Home

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ShopContextProvider from './context/ShopContext';
// import Home from './pages/Home';

// const App = () => {
//   return (
//     <ShopContextProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* Add other routes */}
//         </Routes>
//       </Router>
//     </ShopContextProvider>
//   );
// }

// export default App;
