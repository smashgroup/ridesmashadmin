import React, { useEffect, useState } from 'react'
import './widget.scss'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'; import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { collection, where, query, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { Link } from "react-router-dom";

const Widget= ({type}) => {

  const [diff, setDiff] = useState(null);
  const [customer, setCustomer] = useState(null)
  const [order, setOrder] = useState(null)
  const [datas, setDatas ] = useState([])
  const [total, setTotal] = useState(null)


  
  let data;

  switch(type){
    case "customers":
      data={
        title:"CUSTOMERS",
        isMoney:false,
        link:"see all customers",
        page:"/customers",
        amount: customer,
        icon:<
          PersonOutlineOutlinedIcon className="icon" 
          style={{
          color:"crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)"
        }}/>,
      }
      break;
      case "order":
        data={
          title:"ORDERS",
          isMoney:false,
          link:"view all orders",
          page:"/orders",
          amount: order,
          icon:<
            ShoppingCartOutlinedIcon className="icon"
            style={{
              color:"goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)"
            }}
            />,
        }
        break;

      case "earning":
        data={
          title:"EARNINGS",
          isMoney:true,
          link:"view net earnings",
          page:"/earnings",
          amount: total ,
          icon:<MonetizationOnOutlinedIcon className="icon"
          style={{
            color:"green",
            backgroundColor: "rgba(0, 128, 0, 0.2)"
          }}/>,
        }
        break;
        
      case "balance":
        data={
          title:"BALANCE",
          isMoney:true,
          link:"see details",
          page:"/balance",
          amount: customer,
          icon:<AccountBalanceWalletOutlinedIcon className="icon"
          style={{
            color:"purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)"
          }}
          />,
        }
        break;
      default:
      break
  }


  useEffect(() => {

    //LISTEN REAL TIME
    
        const collectionRef = collection(db, "order")
    
        const unsub = onSnapshot(collectionRef, (snapShot) => {
          let list = [];
          // let total = 0
          
          snapShot.docs.forEach((doc) => {
            list.push({price:doc.data().price})
          })
          setDatas(list)
          const earning = list.reduce((tot, currentValue) => tot = tot + currentValue.price,0);
          setTotal(earning)
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

    

    // console.log('earning:', earning);

    console.log(datas);
    console.log(total);

    // const users = [{ name: 'Tom', age: 21}, { name: 'Mike', age: 23}, { name: 'Anna', age: 54}]

    // const getAverageAge = (datas) => {
    //   let sum = 0
    //   for (let i = 0; i < datas.length; i++) {
    //     sum += datas[i].price
    //   }
    //   return sum
      
    // }
  
    //   getAverageAge(datas) 



      

    
    

    // console.log('sum:', sum);



  useEffect(() => {
    const fetchData = async() => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2))
      console.log(lastMonth)
      console.log(prevMonth)

      const lastMonthQuery = query(
        collection(db, "customers"), 
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, "customers"), 
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const customerQuery = collection(db, "customers")
      const allCustomer = await getDocs(customerQuery)
      setCustomer(allCustomer.docs.length)

      const orderQuery = collection(db, "order")
      const allOrder = await getDocs(orderQuery)
      setOrder(allOrder.docs.length)


      // const collectionRef = collection(db, "order")
    
    
      const lastMonthData = await getDocs(lastMonthQuery)
      const prevMonthData = await getDocs(prevMonthQuery)

    
      setDiff((lastMonthData.docs.length - prevMonthData.docs.length) / (prevMonthData.docs.length) * 100)

      // let timestamp = '1452488445471';
      // let newDate = new Date(timestamp * 1000)
      // let thisDay = new Date(timeStamp)
      // let thisDate = thisDay.toLocaleString()
      // let Hours = thisDay.getHours()
      // let Minutes = thisDay.getMinutes()
      // let HourComplete = Hours + ':' + Minutes
      // let formatedTime = HourComplete
      // console.log(thisDay)
      // console.log(formatedTime)
      // console.log(thisDate)
      // console.log(thisDay)
      // console.log(today)
        
    };

    fetchData();

  }, [])

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter" to>
          {data.isMoney && 'N'}{data.amount}
        </span>
        <Link to={data.page} className='page'>
        <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon/>
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget