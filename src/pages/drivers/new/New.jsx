import React, { useState } from 'react'
import './new.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"
import LunchDiningIcon from '@mui/icons-material/LunchDining';



const New = ({inputs, title}) => {

  const [file, setFile ] = useState("")
  const [ data, setData ] = useState({})
  const [ perc, setPerc ] = useState(null)
  const [ isloading, setIsloading ] = useState(false)

  const navigate = useNavigate();


  const Spinner = () => {
    return(
      <span className='spinner-container'>
          <span className='loading-spinner'></span>
      </span>
    )
  }

  

  useEffect(() => {
    const uploadFile = () => {

      const name = new Date().getTime() + file.name;
      
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
        
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
         
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({...prev, img: downloadURL}))
          });
        }
      );

    };

    file && uploadFile();

  }, [file]);

  const handleInput = (e) =>{
    const id = e.target.id;
    const value = e.target.value;

    setData({...data, [id]:value})
  }

  
  const handleAdd = async(e) => {

    e.preventDefault()
    setIsloading(true)

    try{
       
       
       await addDoc(collection(db, "drivers"), {
        ...data,
        timeStamp: serverTimestamp(),
        

      });
      
      setIsloading(false)

      navigate('/drivers')
      
      
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
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/drivers"
            >
              Drivers List
            </Link>
            <Typography color="green">New Driver</Typography>
          </Breadcrumbs>
          </div>
        </div>
        
        <div className='bottom'>
          <div className="left">
            {/* <div className='camerawrap'> */}

              <img
                src={file 
                  ? URL.createObjectURL(file) 
                  : "../images/user.png"}
                alt=""
                className='imgs'
                resizeMode = "contain"
              />
              
            {/* </div> */}
          </div>
          <div className='right'>
            <form onSubmit={handleAdd}>
              <div className='formInput'>
                <label htmlFor='file'>
                 Image: < DriveFolderUploadIcon className="icon"/>
                </label>
                <input type="file" id="file" onChange= {e => setFile(e.target.files[0])} style={{display:'none'}}/>
              </div>

              {inputs.map((input, index) =>

                     <div className='formInput' key={index.toString()} >
                        
                       <label>{input.label}:</label>
                       <input type={input.type} placeholder={input.placeholder} onChange={handleInput} id={input.id} required/>
                     </div>
              
              )}

             <button disabled={perc !== null && perc < 100} type='submit'>
              {isloading && <span>...</span>}
              {isloading ? <span>loading</span> : <span>Submit</span>}

              
             </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
