import React, {useState, useEffect} from 'react'
import './single.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
// import Chart from '../../../components/chart/Chart'
// import SalesTable from '../../../components/table/SalesTable'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc, onSnapshot, collection, query, orderBy } from "firebase/firestore"
import { db } from '../../../firebase'
import OrderTable from '../../../components/table/orderTable'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom"
import { Navigation } from '@mui/icons-material';
// import driver from './images/onboardingontheway.png'
// import driver from './animations/dispatch-rider.json';

const Single = () => {

  const {orderId} = useParams()

  const navigate = useNavigate();


  const [ orderData, setOrderData ] = useState([])
  const [ shopping, setShopping ] = useState([])
  const [ statusUpdate, setStatusUpdate ] = useState("")
  const [ selectQuery, setSelectQuery ] = useState([])
  const [ openModal, setOpenModal ] = useState(false)
  const [ driverData, setDriverData ] = useState([])
  const [ driverDetails, setDriverDetails ] = useState()
  const [ selectedDriver, setSelectedDriver ] = useState('')

  const closeModal = () => setOpenModal(false)
  
  
  const getOrder = async() => {

      const docRef = doc(db, "order", orderId);

      const docSnap = await getDoc(docRef);

      let shoppingArray = [] ;

          
      if (docSnap.exists()) {

        setOrderData(docSnap.data() )
        shoppingArray = docSnap.data().shoppingCart

      } else {
        
        console.log("No such document!");
      }

        setShopping([...shoppingArray])

        // console.log(shopping)

      

      
  }

  // console.log(shoppingArray)

   console.log(orderData)

  useEffect(()=>{

    getOrder()

  }, [])

 const acceptOrder = async() => {
      
  const acceptRef = doc(db, "order", orderId);

     const updateStatus = updateDoc(acceptRef, {
      status: "PROCESSING_ORDER"
    });

    const thisStatus = updateStatus.status
    console.log(thisStatus)
        

 }


 //SELECTED DRIVER INFORMATION



//  const getDriverInfo = async() => {

//   const docRef = doc(db, "drivers", driverDetails);

//   const docSnap = await getDoc(docRef);


  
//   if (docSnap.exists()) {

//     console.log('selected driver:', docSnap.data())

//     setSelectedDriver(docSnap.data())
//     // console.log(userData)
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

// useEffect(()=>{
//   getDriverInfo()
// }, [])

// console.log('selected driver:', driverDetails)

// const firstname = selectedDriver.firstname;
// const lastname = selectedDriver.Lastname;
// const telephone = selectedDriver.telephone;




  //PROCESSING DRIVERS

    const processingOrder = async(e) => {

      e.preventDefault()

       try{

        const docRef = doc(db, "drivers", driverDetails);

        const docSnap = await getDoc(docRef);
      
      
        
        if (docSnap.exists()) {
      
          console.log('selected driver:', docSnap.data())
      
          setSelectedDriver(docSnap.data())
          // console.log(userData)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        const firstname = selectedDriver.firstname;
        const lastname = selectedDriver.Lastname;
        const telephone = selectedDriver.telephone;


         const acceptRef = doc(db, "order", orderId);
    
         await updateDoc(acceptRef, {

          status: "DELIVERING_ORDER", driverFirstname: firstname, driverLastname: lastname, driverTelephone: telephone

        });

        closeModal()
        // navigate('/orders')

      }catch (err) {

            console.log(err);

      } 

    }
      

          const declineOrder = async() => {
      
            const acceptRef = doc(db, "order", orderId);
          
              const updateStatus = await updateDoc(acceptRef, {
                status: "DECLINE_ORDER"
              });
          
           
          }

         

          const completeOrder = async() => {
      
            const acceptRef = doc(db, "order", orderId);
          
              const updateStatus = await updateDoc(acceptRef, {
                status: "ORDER_COMPLETED"
              });
          
           
          }
    // QUERY FOR THE ORDER

    const getOrderStatus = async() => {

      onSnapshot(doc(db, "order", orderId), (doc) => {
      console.log("Current data: ", doc.data());
      setStatusUpdate(doc.data());
      console.log(statusUpdate);
      console.log(statusUpdate.status)
      console.log(orderId)
      // const newStatus = statusUpdate.status
      console.log(newStatus)

    });

   
    
    }

    const newStatus = statusUpdate.status 

    useEffect(()=>{
      getOrderStatus()
    }, [])


    // QUERY FOR THE DRIVER

    // const getSelectedDriver = async() => {

    //   onSnapshot(doc(db, "drivers", driverDetails), (doc) => {
    //   setSelectedDriver(doc.data());
    //   console.log(selectedDriver);

    // });

   
    
    // }

   

    // useEffect(()=>{
    //   getSelectedDriver()
    // }, [])


    //QUERY FOR ALL

    useEffect(() => {
   
    
      //LISTEN REAL TIME
      
          const collectionRef = collection(db, "drivers")
          const queryDrivers = query(collectionRef, orderBy("timeStamp", "desc"))
      
          const unsub = onSnapshot(queryDrivers, (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data()})
              
            })
            setDriverData(list)
            // setIsLoading(false)
          }, 
            (error) => {
              console.log(error)
            }
          );
      
          return () => {
            unsub();
          }
      
      //END LISTEN REAL TIME    
      
        },[])
      
        // console.log(driverData)
      

    // console.log(statusUpdate.status)

      
  // const getOrderStatus = async() => {

  //   onSnapshot(doc(db, "order", orderId), (doc) => {
  //     console.log("Current data: ", doc.data());
  //     setStatusUpdate(doc.data())
  //   });
      
  // }

  // useEffect(()=>{
  //   getOrderStatus()
  // }, [])


  // const handleDriver = async(e) => {

  //   e.preventDefault()
  //   // setIsloading(true)

  //   try{
       
       
  //      await addDoc(collection(db, "dishes"), {
  //       ...data,
  //       timeStamp: serverTimestamp(),
        

  //     });
      
  //     setIsloading(false)

  //     navigate('/dishes')
      
      
  //   }catch (err) {
  //     console.log(err);
  //   } 

  // }





  const Modal = ({open, close}) => {
     
     if(!open) return null
     return(
      <div className='overlay'>
        <div className="modalContainer">
          {/* <img src="./images/onboardingontheway.png" alt="driver" /> */}
          {/* <div className="modalLeft" style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:"center", 
          }}>
          <img
                src = {selectedDriver.img}
                alt="avatar"
                style={{width:'100px', height:'100px', borderRadius:'50%', marginBottom:'10px'}}
                   
            /> 
            <p>{selectedDriver.firstname}</p>
            <p>{selectedDriver.Lastname}</p>
            <p>{selectedDriver.telephone}</p>
          </div> */}
          <div className="modalRight">
            <p className="closeBtn" onClick={close}>X</p>
            <div className="content">
              <p className="head">Your Driver must be Ready for Delivery</p>
              <h3 className="driver">Choose a Driver</h3>

            </div>

            <div className='formContainer'>
            <form  onSubmit={processingOrder}>
                    <div className='formInput' >
                       
                      <label>Driver Name:</label>
                         <select value = {driverDetails} onChange={(e) => setDriverDetails(e.target.value)}>
                           <option>Select a Driver</option>
                           {
                            driverData.map((driver, index) => 
                            <option value={driver.id} key={index}>{driver.firstname} {driver.Lastname} - {driver.telephone}</option>
                            )
                           }
                          
                         </select>
                      </div>
             
                      <div className="btnContainer">

                        <button className="btnoutline" onClick={close}>
                          <span className="bold">No</span>, Thanks
                        </button>
                        <button className="btnprimary" type='submit' >
                          <span className='bold'>Yes</span>,Continue
                        </button>

                      </div>

               </form>


            </div>
           
          </div>
        </div>
      </div>
     )
  }


  return (
    <div className='single'>
      <Sidebar/>
      <div className='singleContainer'>
        <Navbar/>
        <div className='topTitle'>

        <div className='topLeft'><h4>Transaction ID - {orderData.transacton}</h4></div>
          
          <div className='topRight'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/orders"
            >
              Order List
            </Link>
            <Typography color="green">Order Details</Typography>
          </Breadcrumbs>
          </div>
        </div>
       
        <div className="top">

        
       
          <div className="left">
            
            <div className='item'>
               
                <div className="details">
                  <h3 className='itemTitle'>{orderData.fullname}</h3>
                  <div className='detailItem'>
                    <span className='itemKey'>Email:</span>
                    <span className='itemValue'>{orderData.email}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Phone:</span>
                    <span className='itemValue'>{orderData.telephone}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Address:</span>
                    <span className='itemValue'>{orderData.address}</span>
                  </div>
              
                </div>
            </div>
          </div>
          <div className='right'>
          
            <div className='listTitle'><h3>Ordered Items</h3></div>
              <OrderTable
                shopping = {shopping}
                price = {orderData.price}
                quantity = {orderData.quantity}
              />
              
            </div>
          </div>
          <div className="bottom">
            <h3>Manage Order Status</h3>

            {newStatus === 'ORDER_COMPLETED'
            
            ?

            <div className='completedContainer'>
              <div className='completedWrapper'>
                  <button className= 'completed' disabled> This Order has been Delivered Successfully</button>
              </div>
              
            </div>

            :

              <div>
                 <div className='buttonTop'>

                  {newStatus === 'RECEIVED_ORDER'

                  ?     <div>
                          <button className= 'buttonAccept' onClick={acceptOrder}>ACCEPT ORDER</button>
                        </div>

                  :     <div>
                          <button className= 'received' disabled onClick={acceptOrder}>ACCEPT ORDER</button>
                        </div>

                  }


                  <div>
                    <button className='buttonDecline' onClick={declineOrder}>DECLINE ORDER</button>
                  </div>

                  </div>

                  {((newStatus === 'PROCESSING_ORDER') || (newStatus === 'DELIVERING_ORDER') || (newStatus === 'DELIVERED_ORDER')) &&

                  <div className='buttonBottom'>

                  { ((newStatus === 'PROCESSING_ORDER') || (newStatus === 'DELIVERING_ORDER') || (newStatus === 'DELIVERED_ORDER') )

                    ?   
                        
                        
                        <div>
                          {/* <button className='processing' onClick={processingOrder}>PROCESSING ORDER</button> */}
                          <button className='processing' onClick={() => setOpenModal(true)}>PROCESSING ORDER</button>
                          <Modal open={openModal} close={closeModal}/>
                        </div>

                    :   <div>
                          <button className= 'received' disabled onClick={processingOrder}>PROCESSING ORDER</button>
                        </div>

                  }


                  { ((newStatus === 'DELIVERING_ORDER') || (newStatus === 'DELIVERED_ORDER'))

                    ?   <div>
                            <hr className='lines-processing'/>
                        </div>

                    :   <div>
                            <hr className='lines-disabledProcessing'/>
                        </div>

                  }


                  { ((newStatus === 'DELIVERING_ORDER') || (newStatus === 'DELIVERED_ORDER'))

                  ?   <div>
                        <button className='delivering' >DELIVERING ORDER</button>
                      </div>

                  :   <div>
                        <button className= 'disableDelivering' disabled >DELIVERING ORDER</button>
                      </div>

                  }


                  { (newStatus === 'DELIVERED_ORDER')

                  ?   <div>
                          <hr className='lines-delivering'/>
                      </div>

                  :   <div>
                          <hr className='lines-disabledDelivering'/>
                      </div>

                  }


                  { (newStatus === 'DELIVERED_ORDER') 

                  ?   <div>
                        <button className='delivered' onClick={completeOrder}>COMPLETE DELIVERY</button>
                      </div>

                  :   <div>
                        <button className= 'disabledDelivered' disabled >CUSTOMER WILL CONFIRM DELIVERY</button>
                      </div>

                  }



                  </div>
                  }
              </div>
            
            }

           
         
        </div>
        </div>
       
      </div>
  )
}

export default Single