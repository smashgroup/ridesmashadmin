import React, {useState, useEffect} from 'react'
import './list.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import {db} from '../../../firebase'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

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
        const collectionRef = collection(db, "reviews")
        const queryReviews = query(collectionRef, orderBy("timeStamp", "desc"))
    
        const unsub = onSnapshot(queryReviews, (snapShot) => {
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

      // console.log(data.timeStamp)

      //  const thisDay = data.timeStamp.toDate().to
      // console.log(thisDay).

      const replyReview = () => {

      }

      const directMessage = () => {

      }

      const deleteReview = () => {

      }


  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <DataTable/> */}

        <div className='reviewTitle'>
          <h3 className='title'>Customers Reviews</h3>
        </div>

        {isLoading ? <Spinner/> : 

        
        data.map(row => {

          return (

          <div className='reviewBody'>
              <div className='reviewSingle' key={row.id}>
                    <div className='reviewLeft'>
                      <div className='reviewPhoto'>
                      <img
                          src="../images/user.png"
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
                          <div className='reviewRightTopLeft'>
                          <div className='ratingContainer'>
                          {row.rating >= 1 ? (
                          <StarIcon className="rating"/> 
                          ) : ( 
                          <StarBorderIcon className="rating" /> 
                          )} 
                           {row.rating >= 2 ? (
                          <StarIcon className="rating" /> 
                          ) : ( 
                          <StarBorderIcon className="rating"/> 
                          )} 
                           {row.rating >= 3 ? (
                          <StarIcon className="rating"/> 
                          ) : ( 
                          <StarBorderIcon className="rating"/> 
                          )}
                           {row.rating >= 4 ? (
                          <StarIcon className="rating"/> 
                          ) : ( 
                          <StarBorderIcon className="rating"/> 
                          )} 
                          {row.rating >= 5 ? (
                          <StarIcon className="rating"/> 
                          ) : ( 
                          <StarBorderIcon className="rating"/> 
                          )} 
                                  
                          </div>
                          {/* <div>{row.timeStamp}</div> */}
                          <div className='transaction'><p className='title'>TRANSACTION ID:</p><p>{row.transacton}</p></div>
                          </div>
                          <div className='reviewRightTopRight'>
                              <button className="deleteReview" onClick={() => deleteReview()}><p>X</p></button>
                          </div>
                        
                        </div>
                        <div className='reviewMiddle'><p>{row.message}</p></div>
                        <div className="reviewBottom">
                          <button className="reviewBottomMail" onClick={() => directMessage()}><MailOutlineIcon className="mail"/><p>DIRECT MESSAGE</p></button>
                          <button className="reply" onClick={() => replyReview()}><p>REPLY</p></button>
                        </div>
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