// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'


// const List = ({token}) => {

//     const [list,setList]=useState([])

//     const fetchList= async()=>{
//         try {
//             const response= await axios.post(backendUrl+'/api/product/list')
//             if(response.data.success){
//                 setList(response.data.products);
//             }else{
//                 toast.error(response.data.message)
//             }
            
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     const removeProduct=async(id)=>{
//         try {
//             const response= await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})
//             if(response.data.success){
//                 toast.success(response.data.message)
//                 await fetchList();
//             }else{
//                 toast.error(response.data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         fetchList()
//     },[])
//   return (
//     <>
//     <p className='mb-2'>All Product List</p>
//     <div className='flex flex-col gap-2'>
//     <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-pink-200 text-sm'>
//         <b>Image</b>
//         <b>Name</b>
//         <b>Category</b>
//         <b>Price</b>
//         <b className='text-center'>Action</b>
//     </div>

//     {/* Product List */}
//     {
//         list.map((item,index)=>(
//             <div key={index}>
//                 <img src={item.image[0]} alt="" />
//                 <p>{item.name}</p>
//                 <p>{item.category}</p>
//                 <p>{currency}{item.price}</p>
//                 <p onClick={()=>removeProduct(item._id)} className='cursor-pointer'>X</p>
//             </div>
//         ))
//     }
//     </div>
//     </>
//   )
// }

// export default List

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import './List.css'

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <p className="title">All Product List</p>
      <div className="list-header hidden md:grid">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="action">Action</b>
      </div>

      {/* Product List */}
      {list.map((item, index) => (
        <div key={index} className="list-item">
          <img src={item.image[0]} alt={item.name} className="product-image" />
          <p className="product-name">{item.name}</p>
          <p className="product-category">{item.category}</p>
          <p className="product-price">
            {currency}
            {item.price}
          </p>
          <p
            onClick={() => removeProduct(item._id)}
            className="remove-product"
          >
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
