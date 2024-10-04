export const riderColumns = [
    
        
        { 
            field: 'photo', headerName: 'photo', width:60,
            renderCell:(params) => {
                return(
                    <div className="cellwithphoto">
                        <img src={params.row.img} alt="avatar" className="cellphoto" />
                        
                    </div>
                )
            }
        },
        { field: 'fullname', headerName: 'Fullname', width: 120 },
        { field: 'email', headerName: 'email', width: 230 },
        { field: 'address', headerName: 'address', width: 170 },
        { field: 'telephone', headerName: 'telephone', width: 150 },
        { field: 'timeStamp', headerName: 'Registered Date', width: 160 },
        // { field: 'status', headerName: 'status', width: 100,
        //     renderCell:(params) => {
        //         return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        //     },
        // },
       
    
]


export const ridesColumns = [
    { field: 'transacton', headerName: 'Order ID', width: 120 },
    // { 
    //     field: 'photo', headerName: 'Photo', width:100,
    //     renderCell:(params) => {
    //         return(
    //             <div className="cellwithphoto">
    //                 <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
    //             </div>
    //         )
    //     }
    // },
    // { field: 'transaction', headerName: 'Ordered Item', width: 150 },
    // { field: 'title', headerName: 'Food Ordered', width: 170 },
    { field: 'fullname', headerName: 'Rider Name', width: 200 },
    { field: 'price', headerName: 'Price (N)', width: 100 },
    { field: 'quantity', headerName: 'quantity', width: 80 },
    { field: 'timeStamp', headerName: 'Ride Date', width: 210,

        // renderCell:(params) => {
        //     return(
        //         <div>{params.row.timeStamp}</div>
        //     )
        // }
    },
    { field: 'status', headerName: 'Status', width: 200,
        renderCell:(params) => {
            return (
                    <>
                        {params.row.status === 'RECEIVED_ORDER' && <div style={{ color:'green', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>ORDER RECEIVED</div>} 
                        {params.row.status === 'PROCESSING_ORDER' && <div  style={{ color:'orange', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>PROCESSING ORDER</div>} 
                        {params.row.status === 'DELIVERING_ORDER' && <div  style={{color:'blue', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>DELIVERYING ORDER</div>} 
                        {params.row.status === 'DELIVERED_ORDER' && <div style={{color:'black', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>ORDER DELIVERED</div>} 
                        {params.row.status === 'ORDER_COMPLETED' && <div style={{ color:'gray', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>COMPLETED ORDER</div>} 
                        {params.row.status === 'ORDER_DECLINED' && <div style={{color:'red', padding:'10px', alignItems:'center', borderRadius:'5px', width:'100%' }}>DECLINED ORDER</div>} 
                    </>
                   )
        },
    },
]



export const rideHistoryColumns = [
    { field: 'id', headerName: 'Order ID', width: 80 },
    // { 
    //     field: 'photo', headerName: 'Photo', width:100,
    //     renderCell:(params) => {
    //         return(
    //             <div className="cellwithphoto">
    //                 <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
    //             </div>
    //         )
    //     }
    // },
    { field: 'transaction', headerName: 'Ordered Item', width: 150 },
    // { field: 'title', headerName: 'Food Ordered', width: 170 },
    { field: 'fullname', headerName: 'Customer Name', width: 150 },
    { field: 'price', headerName: 'Price (N)', width: 100 },
    { field: 'quantity', headerName: 'quantity', width: 80 },
    { field: 'timeStamp', headerName: 'Ordered Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 200,
        renderCell:(params) => {
            return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        },
    },
]

export const driversColumns = [
    { field: 'id', headerName: 'Driver ID', width: 80 },
    { 
        field: 'photo', headerName: 'Photo', width:100,
        renderCell:(params) => {
            return(
                <div className="cellwithphoto">
                    <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
                </div>
            )
        }
    },
    { field: 'firstname', headerName: 'Firstname', width: 100 },
    { field: 'Lastname', headerName: 'Lastname', width: 100 },
    { field: 'telephone', headerName: 'Phone Number', width: 150 },
    { field: 'platenumber', headerName: 'Plate Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 120,
        renderCell:(params) => {
            return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        },
    },
]


export const dispatchColumns = [
    { field: 'id', headerName: 'Driver ID', width: 80 },
    { 
        field: 'photo', headerName: 'Photo', width:100,
        renderCell:(params) => {
            return(
                <div className="cellwithphoto">
                    <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
                </div>
            )
        }
    },
    { field: 'firstname', headerName: 'Firstname', width: 100 },
    { field: 'Lastname', headerName: 'Lastname', width: 100 },
    { field: 'telephone', headerName: 'Phone Number', width: 150 },
    { field: 'platenumber', headerName: 'Plate Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 120,
        renderCell:(params) => {
            return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        },
    },
]


export const deliveryColumns = [
    { field: '@id', headerName: 'ID', width: 80 },
    { 
        field: 'photo', headerName: 'Photo', width:100,
        renderCell:(params) => {
            return(
                <div className="cellwithphoto">
                    <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
                </div>
            )
        }
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 230 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price (N)', width: 80 },
    { field: 'status', headerName: 'Status', width: 100,
        renderCell:(params) => {
            return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        },
    },
]




export const settingsColumns = [
    { field: 'id', headerName: 'Admin ID', width: 80 },
    { 
        field: 'photo', headerName: 'Photo', width:100,
        renderCell:(params) => {
            return(
                <div className="cellwithphoto">
                    <img src={params.row.img} alt="avatar" className="cellphoto"/>
                    
                </div>
            )
        }
    },
    { field: 'fullname', headerName: 'Admin Name', width: 230 },
    { field: 'telephone', headerName: 'Phone Number', width: 150 },
    { field: 'email', headerName: 'Email Address', width: 150 },
    { field: 'status', headerName: 'Status', width: 120,
        renderCell:(params) => {
            return <div className={`cellstatus ${params.row.status}`}>{params.row.status} </div>
        },
    },
]


