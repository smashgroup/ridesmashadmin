import React, { useEffect, useState } from 'react'
import './dataTableRides.scss'
import { DataGrid } from '@mui/x-data-grid';
import { ridesColumns } from '../../data/dataSource';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot, query, orderBy, where} from "firebase/firestore";
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
// const notCapitalQuery = query(citiesRef, where("capital", "!=", false));
    const collectionRef = collection(db, "order")
    const queryOrder = query(collectionRef, orderBy("timeStamp", "desc"))
    // const queryDate = query(queryOrder, where("status", '!=', "ORDER_COMPLETED"))
    const unsub = onSnapshot(queryOrder, (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data(), timeStamp: doc.data().timeStamp.toDate()})
        
      })
      setData(list)
      setIsLoading(false)

      // console.log("user created at:", data.createdAt.toDate());
    }, 
      (error) => {
        console.log(error)
      }
    );

    return () => {
      unsub();
    }

// //END LISTEN REAL TIME    

  },[])

  console.log(data)

  // const date = new Timestamp.toDate().toDateString();
  // console.log(date)

  // let dataTime = data.timeStamp

  // let thisDay = new Date()
  // let thisDate = thisDay.toLocaleString()

  // console.log(new Date(dataTime.toDate()).toUTCString())


  // const date = data.timeStamp

  // const realTime = date.toDate()

  // console.log(realTime)

  // const savedTime    = data.timeStamp;
  // const formatedDate = new Date(savedTime).toLocaleString(
  // "en-US",
  //   {
  //     month: "short",
  //     day: "2-digit",
  //     year: "numeric",
  //   }
  // );

  // const myDate = new Date(savedTime).getTime();

  // let timestamp = savedTime;
  // let newDate = new Date(timestamp * 1000)
  // let Hours = newDate.getHours()
  // let Minutes = newDate.getMinutes()
  // const HourComplete = Hours + ':' + Minutes
  // let formatedTime = HourComplete
  // console.log(formatedTime)

  // console.log(myDate);

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
                       <Link to={`/rides/${params.row.id}`} style={{textDecoration:"none"}}>
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
        All Rides
      </div>
      {isLoading ? <Spinner/> : 
        <DataGrid
            className="rideTableGrid"
            rows={data}
            columns={ridesColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    }

      
    </div>
  )
}

export default DataTable