import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import {serverTimestamp, addDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";



const New = ({inputs, title}) => {

  const [ data, setData ] = useState({})



  const handleInput = (e) =>{
    const id = e.target.id;
    const value = e.target.value;

    setData({...data, [id]:value})
  }

  
  const handleAdd = async(e) => {
    e.preventDefault()

    try{

     await addDoc(doc(db, "notifications"), {
         ...data,
        timeStamp: serverTimestamp(),
        
      }
      );
      console.log()
      
    }catch (err) {
      console.log(err);
    } 

  }

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
      <Navbar/>
        <div className='top'>
          <div className='topLeft'><h1>{title}</h1></div>
          
          <div className='topRight'>
          
          </div>
        </div>
        <div className='bottom'>
          <div className="left">
            <div className='camerawrap'>

              {/* <img
                src={file 
                  ? URL.createObjectURL(file) 
                  : "../images/user.png"}
                alt=""
              /> */}
              
            </div>
          </div>
          <div className='right'>
            <form onSubmit={handleAdd}>
             
                 {inputs.map((input, index) =>

                    <div className='formInput' key={index.toString()} >
                        
                       <label>{input.label}:</label>
                       <input type={input.type} placeholder={input.placeholder} onChange={handleInput} id={input.id}/>
                     </div>
              
              )}

             <button  type='submit'>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
