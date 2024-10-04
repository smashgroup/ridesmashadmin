import React, { useEffect, useState } from 'react'
import './dataTableSettings.scss'
import { DataGrid } from '@mui/x-data-grid';
import { settingsColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, getDocs,  deleteDoc, doc, onSnapshot } from "firebase/firestore";
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

    const unsub = onSnapshot(collection(db, "settings"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data()})
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

    await deleteDoc(doc(db, "settings", id));
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
                       <Link to={`/settings/${params.row.id}`} style={{textDecoration:"none"}}>
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
        All Foodmie Admins
        <Link to="/settings/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New Admin
          </div>
        </Link>
      </div>
      {isLoading 
      ? <Spinner/>
      :<DataGrid
          className="userTableGrid"
          rows={data}
          columns={settingsColumns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      }
    </div>
  )
}

export default DataTable