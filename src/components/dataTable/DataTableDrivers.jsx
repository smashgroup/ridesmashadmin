import React, { useEffect, useState } from 'react'
import './dataTableDrivers.scss'
import { DataGrid } from '@mui/x-data-grid';
import { driversColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
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

  useEffect(() => {
   
    
//LISTEN REAL TIME

    const unsub = onSnapshot(collection(db, "drivers"), (snapShot) => {
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

  const handleDelete = async (id) => {

    try{

      await deleteDoc(doc(db, "drivers", id));
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
                       <Link to={`/drivers/${params.row.id}`} style={{textDecoration:"none"}}>
                          <div className="viewbutton">View</div>
                       </Link>
                       {/* <div className='deletebutton'>Delete</div> */}
                       <div className='deletebutton' onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
    }
      
  ]  

  return (
    <div className="datatable">
      <div className='datatableTitle'>
            All Drivers
            <Link to="/drivers/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New Driver
          </div>
        </Link>
      </div>
      
    {isLoading ? <Spinner/> : 
        <DataGrid
            className="userTableGrid"
            rows={data}
            columns={driversColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    }
    </div>
  )
}

export default DataTable