import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import './Add.css'

const Add = ({token}) => {
    
    const [image1,setImage1]=useState(false)
    const [image2,setImage2]=useState(false)
    const [image3,setImage3]=useState(false)
    const [image4,setImage4]=useState(false)

    const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("Traditional");
    const[bestseller,setBestseller]=useState(false);
    const[newArrival,setNewArrival]=useState(false);
    const[sizes,setSizes]=useState([]);

    const onSubmitHandler= async(e)=>{
        e.preventDefault();
        try {
            const formData=new FormData()

            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("bestseller",bestseller)
            formData.append("newArrival",newArrival)
            formData.append("sizes",JSON.stringify(sizes))

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response= await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')

            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    
    <form onSubmit={onSubmitHandler} className='flex flex-col  w-full items-start gap-3'>
        <div>
            <p>Upload image</p>
            <br />
            <div className='flex gap-3 abc'>
                
                <label htmlFor="image1">
                    <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
                </label>
               
                <label htmlFor="image2">
                    <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id="image2" hidden />
                </label>
                <label htmlFor="image3">
                    <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id="image3" hidden />
                </label>
                <label htmlFor="image4">
                    <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e)=>setImage4(e.target.files[0])} type="file"  id="image4" hidden />
                </label>
            </div>
        </div>

        <div>
            <p>Product Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Type here' required/>
        </div>
        <div>
            <p>Product Description</p>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Type here'></textarea>
            
        </div>
        <div>
            <p>Category</p>
            <select onChange={(e)=>setCategory(e.target.value)}>
              <option value="traditional">Traditional</option>
              <option value="dress">Dress</option>
              <option value="lehe">Lehenga</option>
              <option value="bottomwear">BottomWear</option>
              <option value="topwear">Topwear</option>
            </select>
        </div>
        <div>
            <p>Price</p>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} type="Number" placeholder='$1000'/>
        </div>
        <div >
            <p>Product Sizes</p>
            <div className='flex gap-3'>
                <div onClick={()=>setSizes(prev=>prev.includes("S")? prev.filter(item=>item !=="S"):[...prev,"S"])}><p className={`${sizes.includes("S")? "bg-pink-400":"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p></div>
                <div onClick={()=>setSizes(prev=>prev.includes("M")? prev.filter(item=>item !=="M"):[...prev,"M"])}><p className={`${sizes.includes("M")? "bg-pink-400":"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p></div>
                <div onClick={()=>setSizes(prev=>prev.includes("L")? prev.filter(item=>item !=="L"):[...prev,"L"])}><p className={`${sizes.includes("L")? "bg-pink-400":"bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p></div>
                <div onClick={()=>setSizes(prev=>prev.includes("XL")? prev.filter(item=>item !=="XL"):[...prev,"XL"])}><p className={`${sizes.includes("XL")? "bg-pink-400":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p></div>
            </div>
        </div>
        <div>
            <input onChange={()=> setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
            <label htmlFor="bestseller">Add to BestSeller</label>
        </div>
        <div>
            <input onChange={()=> setNewArrival(prev=>!prev)} checked={newArrival} type="checkbox" name="" id="newArrival" />
            <label htmlFor="newArrival">Add to New Arrival</label>
        </div>
        <div className='w-28 py-3 mt-4 '><button type='submit'>ADD</button></div>
    </form>
  )
}

export default Add
