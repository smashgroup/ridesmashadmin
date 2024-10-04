// import React, {useState, useEffect} from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {db} from '../../firebase';
// import {getDoc, doc, collection, onSnapshot } from 'firebase/firestore'

// const [revenurData, setRevenueData ] = useState([])


// useEffect(() => {
//   const queryRev = db.collection

// }, [])
const data = [
    {
      name: 'January',
      total: 2000,
    },
    {
      name: 'February',
      total: 4200,
    },
    {
      name: 'March',
      total: 2000,
    },
    {
      name: 'April',
      total: 6080,
    },
    {
      name: 'May',
      total: 5000,
    },
    {
      name: 'June',
      total: 2390,
    },
  ];
  

const Chart = ({aspect, title}) => {
  return (
    <div className='chart'>
        <div className='title'>{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
             
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" className='chartGrid' stroke='1'/>
            <Tooltip />
            
            <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#total)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart

