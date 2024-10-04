import React, {useState, useEffect} from 'react'
import './list.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import {db} from '../../../firebase'
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from "firebase/firestore";

const List = () => {

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
    
        const unsub = onSnapshot(collection(db, "notifications"), (snapShot) => {
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


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <DataTable/> */}

        <div className='reviewTitle'>
          <h3 className='title'>Notifications to your Customers</h3>
          <Link to="/notifications/new"  style={{textDecoration:"none"}} >
          <div className='link'>
            Add New Notification
          </div>
        </Link>
        </div>

        {isLoading ? <Spinner/> : 

        
        data.map(row => {

          return (

          <div className='reviewBody'>
              <div className='reviewSingle' key={row.id}>
                    <div className='reviewLeft'>
                      <div className='reviewPhoto'>
                      <img
                          src="../photo/student4.jpg"
                          alt="avatar"
                          className="itemimg"
                      />
                      </div>
                      <div className='details'>
                        <div className="name">{row.fullname}</div>
                        <div className="email">{row.email}</div>
                        <div className="telephone">{row.telephone}</div>
                      </div>
                      

                    </div>
                    <div className='reviewRight'>
                        <div className='reviewRightTop'>
                          <div>{row.rating}</div>
                          <div>{row.transaction}</div>
                        </div>
                        <div>{row.message}</div>
                        <div></div>
                    </div>
              </div>
          </div>
          
          )

        })

  

        }

      </div>
    </div>
  )
}

export default List