import React, { useState, useEffect } from 'react'
import './new.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {serverTimestamp, setDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom"
// import swal from 'sweetalert';



const New = ({inputs, title}) => {

  const [file, setFile ] = useState("")
  const [ data, setData ] = useState({})
  const [ perc, setPerc ] = useState(null)

  const navigate = useNavigate();

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

    try{

      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
 
      await setDoc(doc(db, "customers", res.user.uid), {
         ...data,
        timeStamp: serverTimestamp(),
        
      }
      );
      navigate('/customers')
      
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
              href="/customers"
            >
              Customers List
            </Link>
            <Typography color="green">New Customer</Typography>
          </Breadcrumbs>
          </div>
        </div>
        <div className='bottom'>
          <div className="left">
            <div className='camerawrap'>

              <img
                src={file 
                  ? URL.createObjectURL(file) 
                  : "../images/user.png"}
                alt="pic"
              />
              
            </div>
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
                       <input type={input.type} placeholder={input.placeholder} onChange={handleInput} id={input.id}/>
                     </div>
              
              )}

             <button disabled={perc !== null && perc < 100} type='submit'>submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
