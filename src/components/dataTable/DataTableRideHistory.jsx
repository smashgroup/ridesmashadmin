import React, { useEffect, useState } from 'react'
import './dataTableRideHistory.scss'
import { DataGrid } from '@mui/x-data-grid';
import { rideHistoryColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, query, where, getDocs  } from "firebase/firestore";
import { db } from '../../firebase'



const DataTable = () => {

  const [ data, setData ] = useState([])

  const [ isLoading, setIsLoading ] = useState(true)


  const Spinner = () => {
    return(
      <div className='spinner-container'>
          <div className='loading-spinner'></div>
      </div>
    )
  }

//   useEffect(() => {
   
    
//LISTEN REAL TIME

    // const unsub = onSnapshot(collection(db, "order"), (snapShot) => {
    //   let list = [];
    //   snapShot.docs.forEach((doc) => {
    //     list.push({ id: doc.id, ...doc.data(), createdAt: new Date().getTime()})
        
    //   })
    //   setData(list)
    //   setIsLoading(false)

      // console.log("user created at:", data.createdAt.toDate());
    // }, 
    //   (error) => {
    //     console.log(error)
    //   }
    // );

    // return () => {
    //   unsub();
    // }

// //END LISTEN REAL TIME    

//   },[])

//   console.log(data)

  // const savedTime    = data.timeStamp;
  // const formatedDate = new Date(savedTime).toLocaleString(
  // "en-US",
  //   {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   }
  // );

  // console.log(data.timeStamp);


 

    const queryOrder = async() => {

        const q = query(collection(db, "order"), where("status", "==", "ORDER_COMPLETED"));
  
        const querySnapshot = await getDocs(q);
    
        let list = [];
        querySnapshot.forEach((doc) => {
    
            list.push({ id: doc.id, ...doc.data() })
        //   console.log(doc.id, " => ", doc.data());
        })

        setData(list)
        setIsLoading(false)

    }
   
    useEffect(() => {
        queryOrder()
    }, [])

 


  const handleDelete = async (id) => {

    try{

      await deleteDoc(doc(db, "order", id));
      setData(data.filter((item) => item.id !== id))

    }catch(err){

      console.log(err)

    }
   
  }

  const actionColumn = [

    { field: 'action', headerName: 'Action', width: 130, 
    
            renderCell:(params) => {
                return(
                    <div className='cellAction'>
                       <Link to={`/rideHistory/${params.row.id}`} style={{textDecoration:"none"}}>
                          <div className="viewbutton">View</div>
                       </Link>
                       <div className='deletebutton' onClick={() => handleDelete(params.row.id)}>Delete</div>
                   
                    </div>
                )
            }
    }
      
  ]  

  return (
    <div className="datatable">
      <div className='datatableTitle'>
        Delivered Orders
      </div>
      {isLoading ? <Spinner/> : 
        <DataGrid
            className="userTableGrid"
            rows={data}
            columns={rideHistoryColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    }

      
    </div>
  )
}

export default DataTable