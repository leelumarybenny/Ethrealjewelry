import {Box,Divider,VStack,Text, Image} from "@chakra-ui/react";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import { baseUrl } from "../../../Utils/BaseUrl";
import styles from "./cartpage.module.css"



const Cartpage = () => {
    const [cartproducts,setCartProducts]=useState([])
    const navigate = useNavigate();
    const jwtToken=localStorage.getItem('eathRealToken')
    const [amount,setAmount]=useState('')


useEffect(() => {
  
  GetCartVal()
}, []);

const GetCartVal = () => {
  axios.get(`${baseUrl}/cart`,{
    headers:{
    Authorization:`Bearer ${jwtToken}`
  }
})
.then((res)=>{
  console.log(res.data)
  setAmount(res.data.cartProducts.totalAmount)
  setCartProducts(res.data.cartProducts.products)
})}

const RemoveProduct = (cart_Id) =>{
  axios.delete(`${baseUrl}/delete-cart?cartId=${cart_Id}`,{
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  })
  .then((res)=>{
    // console.log(res.data)
    window.location.reload(true)
  })
};
  

  
const proceedtopayment = () => {
    alert('Order Placed')
};
  
return (
      <>
      <Navbar/>
        <Box className={styles.mainbox}>
          <Box className={styles.leftbox}>
            <VStack className={styles.cartcount}>
              {cartproducts && cartproducts.length < 1 ? (
                <h1>
                  Your Cart is Empty <span></span>
                </h1>
              ) : (
                <h1>
                  {cartproducts && cartproducts.length} Items in your cart{" "}
                  <span></span>
                </h1>
              )}
            </VStack>
            {cartproducts && cartproducts.map((el)=>(
                <VStack key={el.productId}>
                  <Box className={styles.prodbox}>
                    <Box>
                      <Image src={el.imageUrl} alt={el.productName} />
                    </Box>
                    <Box className={styles.contentdiv}>
                      <Text>{el.productName}</Text>
                      <h3>{el.specification}</h3>
                      <h2>
                        <span>MRP ₹{el.market_price}</span>{" "}
                        <span>₹{el.sale_price}*</span>{" "}
                        <span>
                          {el.discountPercentage}% OFF
                        </span>
                      </h2>
                    </Box>
                    <Box className={styles.buttonbox}>
                      <RiDeleteBin6Line
                        onClick={() => RemoveProduct(el.cartId)}
                      />
                      <p>{el.quantity} Qty</p>
                    </Box>
                  </Box>
                </VStack>
             ))}
          </Box>

          <Box className={styles.rightbox}>
            <Box className={styles.buybtnbox}>
              <VStack className={styles.cartcount}>
                <h1>
                  Cart Total <span> ₹{amount}</span>
                </h1>
              </VStack>
              <VStack>
                <button className={styles.proceedbuy} onClick={proceedtopayment}>
                  Place Order
                </button>
              </VStack>
            </Box>
  
            <Box className={styles.billingbox}>
              <h1>Bill Summary</h1>
              <Box className={styles.cartprice}>
                <p>
                  <span className={styles.subtitle}>Cart Value</span>{" "}
                  <span>₹{amount}</span>
                </p>
                <p>
                  <span className={styles.subtitle}>Delivery charges</span>{" "}
                  {amount > 400 ? <span>FREE</span> : <span>₹40</span>}
                </p>
  
                {amount > 400 ? (
                  ""
                ) : (
                  <p>To get free Delivery Add ₹{400 - amount} </p>
                )}
              </Box>
              <Divider />
  
              <h1 className={styles.amountpaid}>
                <span className={styles.subtitle}>Amount to be paid</span>
                <span> ₹{amount}</span>
              </h1>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  
  export default Cartpage;