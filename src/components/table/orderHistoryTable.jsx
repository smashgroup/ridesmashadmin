import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter'
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import './orderHistoryTable.scss' 


const  OrderHistoryTable = ({ shopping, price, quantity}) => {

  
  return (
    <TableContainer component={Paper} className="table">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="tableRow"> 
            <TableCell className='tableCell'>Photo</TableCell>
            <TableCell className='tableCell'>Food</TableCell>
            <TableCell className='tableCell'>Quantity</TableCell>
            <TableCell className='tableCell'>Price/Item</TableCell>
            <TableCell className='tableCell'>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(shopping)} */}

          {shopping.map(row => (
            <TableRow key={row.id}  className="tableRow">
               
               <TableCell className='tableCell'>
                <div className='cellWrapper'>
                  <img src={row.img} className='image' alt=''/>
                </div>
                </TableCell> 
              <TableCell className='tableCell'>{row.title}</TableCell> 
              <TableCell className='tableCell'>{row.qty}</TableCell>
              <TableCell className='tableCell'>N{row.price}.00</TableCell>
              <TableCell className='tableCell'>N{row.TotalItemPrice}.00</TableCell>
                
                
            </TableRow>
        ))}
        </TableBody>
        <TableBody>
        <TableRow className="tableRow">
          <TableCell className='tableCell'><DeliveryDiningIcon sx={{ fontSize: 60 }} color="disabled"/></TableCell> 
          <TableCell className='tableCell'>Transportation</TableCell> 
          <TableCell className='tableCell'></TableCell>
          <TableCell className='tableCell'></TableCell>
          <TableCell className='tableCell'>N500.00</TableCell>
        </TableRow>
        </TableBody>
        <TableFooter>
        <TableRow className="tableRow">
          <TableCell className=''></TableCell> 
          <TableCell className='foot'><h3>Total</h3></TableCell> 
          <TableCell className=' foot'><h3>{quantity}</h3></TableCell>
          <TableCell className=''></TableCell>
          <TableCell className=' foot'><h3>N{price}.00</h3></TableCell>
        </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default OrderHistoryTable