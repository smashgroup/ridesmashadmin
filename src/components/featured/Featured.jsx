import React, { useEffect, useState } from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { collection, where, query, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const Featured = () => {

    const [todayRevenue, setTodayRevenue] = useState(null);
    const [data, setData] = useState([])
    // const [order, setOrder] = useState(null)
    // const [datas, setDatas ] = useState([])
    // const [total, setTotal] = useState(null)

    useEffect(() => {

        // const today = new Date();

        // const todayRevenueQuery = query(
        //         collection(db, "order"), 
        //         where("timeStamp", "==", today)
        // );

    
        // const unsub = onSnapshot(todayRevenueQuery, (snapShot) => {
        //   let list = [];
        //   // let total = 0
          
        //   snapShot.docs.forEach((doc) => {
        //     list.push({price:doc.data().price})
        //   })
        //   setData(list)

        //   console.log('list:',list)
        //   const revenue = list.reduce((tot, currentValue) => tot = tot + currentValue.price,0);
        //   setTodayRevenue(revenue)
        //   console.log('revenue:', revenue)
        //   }, 
        //     (error) => {
        //       console.log(error)
        //     }
        //   );
        //   console.log('revenue:', todayRevenue)
      
        //   return () => {
        //     unsub();
        //   }
        const fetchData = async() => {
            const today = new Date();
            // const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1))
            // const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2))
            const day = today.getDate()
            console.log(today)
            console.log(day)

            const todayRevenueQuery = query(
                collection(db, "order"), 
                where("timeStamp", "==", today)
            );
            const querySnapshot = await getDocs(todayRevenueQuery);
            let items = []
            querySnapshot.docs.forEach((doc) => {
                items.push({price:doc.data().price})
            // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", 'today:', doc.data());
                
            })
                setTodayRevenue(items)
                console.log('items',items)

           
    };

        fetchData();

    

    }, [])

  return (
    <div className='featured'>
        <div className='top'>
            <h1 className='title'>Total Revenue</h1>
            <MoreVertIcon fontSize="small"/>

        </div>
        <div className='bottom'>
            <div className="featuredChart">
                <CircularProgressbar value={100} text={"30%"} strokeWidth={5}/>
            </div>
            <p className="title">Total sales made today.</p>
            <p className="amount">N{todayRevenue}</p>
            <p className="description">Previous transaction processing, last payment may not be included</p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                        <div className="resultAmount">$2000</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                        <div className="resultAmount">$2000</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                        <div className="resultAmount">$2000</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured