import React, { useEffect,useRef,useState } from 'react'
import { useDispatchCard,useCart } from '../components/ContextReducer';
export default function Card(props) {

    let dispatch = useDispatchCard();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options ||{};
    let priceOptions = Object.keys(options);
    const [qty,setqty] = useState(1)
    const [size,setsize] = useState("")

    const handleAddToCart = async()=>{
         let food = []
         for (const item of data) {
           if (item.id === props.fooditem._id) {
            food = item;
    
            break;
          }
         }
        // console.log(food)
        // console.log(new Date())
        if (food.length !== 0) {
          if (food.size === size) {
             await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalPrice, qty: qty })
            return
           }
         else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        //     console.log("Size different so simply ADD one more to the list")
           return
         }
          return
        }
    
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size })
         console.log(data);
      }
    
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() =>{
        setsize(priceRef.current.value)
    },[])
    
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px",margin: '10px', padding: '10px', border: '1px solid #454545' }}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"160px",objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditem.name}</h5>

                        <div className="container w-100">
                            <select className="m-2 h-100 rounded" style={{ backgroundColor: "orange" }}  onChange={(e)=> setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100 rounded" ref={priceRef} style={{ backgroundColor: "orange" }} onChange={(e)=> setsize(e.target.value)}>
                              {priceOptions.map((i)=>{
                                return <option key={i} value={i}>{i}</option>
                              })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={"btn btn-success justify-center ms-1"} onClick={handleAddToCart}>Add To cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
