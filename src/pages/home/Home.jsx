import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import SalesTable from '../../components/table/SalesTable'
// import React, { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'

const Home = ({user}) => {

  // const { currentUser } =useContext(AuthContext)
  // console.log(user)

  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget type="customers"/>
            <Widget type="order"/>
            <Widget type="earning"/>
            <Widget type="balance"/>
          </div>
          <div className="charts">
            <Featured/>
            <Chart 
              aspect = {2 / 1}
              title = "Last 6 Months Revenue "
            />
          </div>
          <div className='listContainer'>
              <div className='listTitle'>Lastest Transaction</div>
              <SalesTable/>
          </div>
        </div>
    </div>
  )
}

export default Home