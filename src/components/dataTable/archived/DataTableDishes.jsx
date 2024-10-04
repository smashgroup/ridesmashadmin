import React, { useEffect, useState } from 'react';
import './dataTableDishes.scss';
import { DataGrid } from '@mui/x-data-grid';
import { dishColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, orderBy,query } from "firebase/firestore";
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

    const collectionRef = collection(db, "dishes")
    const queryDishes = query(collectionRef, orderBy("timeStamp", "desc"))

    const unsub = onSnapshot(queryDishes, (snapShot) => {
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

    //   swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover this!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // })
    // .then((willDelete) => {
    //     if (willDelete) {
    //         // axios.delete('/path/to/delete/resource')
    //             .then((response) =>  {
    //                 swal("Deleted successfully!", {
    //                         icon: "success",
    //                     });
    //             })
    //             .catch(() => {
    //                 swal("Error!", "Failed to delete!", "error");
    //             })
    //     }
    // })

      await deleteDoc(doc(db, "dishes", id));
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
                       <Link to="" style={{textDecoration:"none"}}>
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
        All Dishes
        <Link to="/dishes/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New Dish
          </div>
        </Link>
      </div>
      {isLoading ? <Spinner/> : 
        <DataGrid
            className="userTableGrid"
            rows={data}
            columns={dishColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    }
    </div>
  )
}

export default DataTable