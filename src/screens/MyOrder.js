
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// export default function MyOrder() {
//     const [orderData, setOrderData] = useState([]);
//     const [dateTime, setDateTime] = useState("");

//     const fetchMyOrder = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/myorderData", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: localStorage.getItem('userEmail')
//                 })
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Data received:", data);
//                 if (data.orderData && Array.isArray(data.orderData.order_data)) {
//                     // Filter out the order dates and keep only order items
//                     const filteredData = data.orderData.order_data.filter(item => item[0] && !item[0].Order_date);
//                     const dateTime = data.orderData.order_data[data.orderData.order_data.length - 1].Order_date;
//                     setOrderData(filteredData);
//                     setDateTime(dateTime);
//                 } else {
//                     console.error("Invalid data structure:", data);
//                 }
//             } else {
//                 console.error('Failed to fetch orders');
//             }
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMyOrder();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className='container'>
//                 <div className='row'>
//                     {orderData.length === 0 ? (
//                         <p>You do not have any orders yet.</p>
//                     ) : (
//                         <>
//                             {orderData.map((order, index) => {
//                                 // Check if the order contains any items before rendering
//                                 if (order.length > 0) {
//                                     return (
//                                         <div key={index} className="col-12 mt-4">
//                                             <h3>Order {index + 1}</h3>
//                                             <p>Date and Time: {index === orderData.length - 1 ? dateTime : ''}</p>
//                                             <div className='row'>
//                                                 {order.map((item, itemIndex) => (
//                                                     // Render item only if it has quantity, size, and price
//                                                     item.qty && item.size && item.price ? (
//                                                         <div key={itemIndex} className='col-12 col-md-6 col-lg-4 mb-3'>
//                                                             <div className="card">
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{item.name}</h5>
//                                                                     <p className="card-text">Quantity: {item.qty}</p>
//                                                                     <p className="card-text">Size: {item.size}</p>
//                                                                     <p className="card-text">Price: ₹{item.price}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ) : null
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     );
//                                 } else {
//                                     return null; // If order is empty, don't render anything
//                                 }
//                             })}
//                         </>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
// 
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Data received:", data);
                if (data.orderData && Array.isArray(data.orderData.order_data)) {
                    setOrderData(data.orderData.order_data);
                } else {
                    console.error("Invalid data structure:", data);
                }
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length === 0 ? (
                        <p>You do not have any orders yet.</p>
                    ) : (
                        <>
                            {orderData.map((order, index) => (
                                <div key={index} className="col-12 mt-4">
                                    <h3>Order {index + 1}</h3>
                                    <div className='row'>
                                        {order.filter(item => item.qty && item.size && item.price).map((item, itemIndex) => (
                                            <div key={itemIndex} className='col-12 col-md-6 col-lg-4 mb-3'>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <p className="card-text">Quantity: {item.qty}</p>
                                                        <p className="card-text">Size: {item.size}</p>
                                                        <p className="card-text">Price: ₹{item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {order.length > 0 && (
                                        <p>Date and Time: {order[order.length - 1].Order_date}</p>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
