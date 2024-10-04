import React, { useEffect, useState } from 'react'
import './dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userRows,userColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
// import { collection, getDocs,  deleteDoc, doc, onSnapshot } from "firebase/firestore";
// import { db } from '../../firebase'



const DataTable = () => {

  const [ data, setData ] = useState([])

  useEffect(() => {
    //  const fetchData = async () => {
    //   let list = [];

    //   try{
    //     const querySnapshot = await getDocs(collection(db, "customers"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({id: doc.id, ...doc.data()});
    //     });

    //     setData(list);
    //     console.log(list)
    //   }catch(err){
    //     console.log(err)
    //   }
      
      
    // }; 
    // fetchData() 
    
//LISTEN REAL TIME

    const unsub = onSnapshot(collection(db, "customers"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data()})
      })
      setData(list)
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

  const handleDelete =async (id) => {

    try{

      await deleteDoc(doc(db, "customers", id));
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
                       <Link to="/customers/test" style={{textDecoration:"none"}}>
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
        Add New Customer
        <Link to="/customers/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New
          </div>
        </Link>
      </div>
      <DataGrid
        className="userTableGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable