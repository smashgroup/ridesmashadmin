import React, { useEffect, useState } from 'react'
import './dataTableRiders.scss'
import { DataGrid } from '@mui/x-data-grid';
import { riderColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, getDocs,  deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase'
import swal from 'sweetalert';


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


  useEffect(() => {

//LISTEN REAL TIME

    const collectionRef = collection(db, "customers")
    const queryCustomers = query(collectionRef, orderBy("timeStamp", "desc"))

    const unsub = onSnapshot(queryCustomers, (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data(), timeStamp: doc.data().timeStamp.toDate()})
      })
      setData(list)
      setIsLoading(false)
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

  console.log(data)

  const handleDelete = async(id) => {

    await deleteDoc(doc(db, "customers", id));
    setData(data.filter((item) => item.id !== id))  

      // swal({
      //   title: "Are you sure?",
      //   text: "Once deleted, you will not be able to recover this user",
      //   icon: "warning",
      //   buttons: true,
      //   dangerMode: true,
      // }).
      
      // then(async (deleted) => {

      //         if (deleted) {

      //           await deleteDoc(doc(db, "customers", id));
      //           setData(data.filter((item) => item.id !== id))
        
      //           swal("Poof! Your imaginary file has been deleted!", {
      //             icon: "success",
      //           });
      //         } else {
      //           swal("Your imaginary file is safe!");
      //         }
            
      // });

    
      
    }

  const actionColumn = [

    { field: 'action', headerName: 'Action', width: 130, 
    
            renderCell:(params) => {
                return(
                    <div className='cellAction'>
                       <Link to={`/riders/${params.row.id}`} style={{textDecoration:"none"}}>
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
        All Riders
        <Link to="/riders/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New Rider
          </div>
        </Link>
      </div>
      {isLoading 
      ? <Spinner/>
      :<DataGrid
          className="riderTableGrid"
          rows={data}
          columns={riderColumns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      }
    </div>
  )
}

export default DataTable