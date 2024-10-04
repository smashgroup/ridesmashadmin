import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './salesTable.scss'
import { db } from '../../firebase';
import { getDoc, doc, collection, onSnapshot } from 'firebase/firestore' 



const  SalesTable = () => {

  const [ rows, setRows ] = useState([])

  useEffect(() => {
    
    //LISTEN REAL TIME
    
        onSnapshot(collection(db, "order"), (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data()})
          })
          setRows(list)
          
        }, 
          (error) => {
            console.log(error)
          }
        ); 
     
  },[])
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="tableRow"> 
            {/* <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Image</TableCell>
            <TableCell className='tableCell'>Food Name</TableCell>
            <TableCell className='tableCell'>Customer Name</TableCell>
            <TableCell className='tableCell'>Date - Time</TableCell>
            <TableCell className='tableCell'>($)Amount</TableCell>
            <TableCell className='tableCell'>No of Coin</TableCell>
            <TableCell className='tableCell'>Status</TableCell> */}

            <TableCell className='tableCell'>Tracking ID</TableCell>
            <TableCell className='tableCell'>Name</TableCell>
            <TableCell className='tableCell'>Email</TableCell>
            <TableCell className='tableCell'>Price</TableCell>
            <TableCell className='tableCell'>Quantity</TableCell>
            <TableCell className='tableCell'>Telephone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}  className="tableRow">
              {/* <TableCell className='tableCell'>
                <span>{row.id}</span>
                </TableCell>
              <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.image} className='image' alt=''/>
                </div>
                </TableCell>
                <TableCell className='tableCell'>{row.Food}</TableCell>
                <TableCell className='tableCell'>{row.customer}</TableCell>
                <TableCell className='tableCell'>{row.date}-{row.time}</TableCell>
                <TableCell className='tableCell'>${row.amount}</TableCell>
                <TableCell className='tableCell'>{row.coin}</TableCell>
                <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
               <TableCell className='tableCell'>
                <span>{row.id}</span>
                </TableCell>
              {/* <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.image} className='image' alt=''/>
                </div>
                </TableCell> */}
                {/* <TableCell className='tableCell'>{row.Food}</TableCell> */}
                <TableCell className='tableCell'>{row.fullname}</TableCell>
                <TableCell className='tableCell'>{row.email}</TableCell>
                <TableCell className='tableCell'>N{row.price}.00</TableCell>
                <TableCell className='tableCell'>{row.quantity}</TableCell>
                <TableCell className='tableCell'>{row.telephone}</TableCell>
                {/* <TableCell className='tableCell'>
                 <span className={`status ${row.status}`}>{row.status}</span>
               </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SalesTable