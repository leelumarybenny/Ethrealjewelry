import React,{useEffect,useState} from "react";
import axios from 'axios'
import Style from './SingleProduct.module.css'
import {Box,Text,Flex,Image,Heading,Spacer,Button,Select,UnorderedList,ListItem,Divider} from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import { baseUrl } from "../../../Utils/BaseUrl";


const SingleProduct = () => {
  const property = {
    reviewCount: 242,
    rating: 3,
  };

  const [item,setItem]=useState([])
  const [qty,setQty]=useState()
  const {id}=useParams() 
  const navigate=useNavigate()
  const jwtToken=localStorage.getItem('eathRealToken')



const handlePrevPage=()=>{
  navigate('/products')
}

//  ............ Get Single Product data............

useEffect(() => {
axios.get(`${baseUrl}/searchById?productId=${id}`,{
  headers:{
    Authorization:`Bearer ${jwtToken}`
  }
})
  .then((res) => {
    console.log([res.data.data])
    setItem([res.data.data]);
  })
  .catch((err) => {
    console.log("err", err);
  });
}, []);


// //  .............Add To Cart method ...............

  const viewcart=()=>{
    navigate("/cart")
  }
 

const addCart=(ids)=>{
  fetch(`${baseUrl}/add-cart?productId=${ids}&quantity=${qty}`,
  {
    method:'POST',
    headers:{
      Authorization : `Bearer ${jwtToken}`
    }
  }).then(res=>{
    return res.json()
  }).then(res=>{
    console.log(res)
    alert("Product added to cart.")
  })
}


  return (
    <>
    <Navbar/>
    {
      item && item.map(el=>(      
      <Box  w="90%" key={el._id} m="auto" pt='100px' className={Style.containter}>
        <Text className={Style.heading}>
        {el.productName || "heyy"} 
          </Text>
        <Box mt="30px" display='flex' className={Style.main_box}>
          <Box  w="70%" className={Style.main_box1}>
            <Box display='flex' className={Style.img_desc_box}>
              <Box w="30%" h="280px"  className={Style.img_box}>
                <Image className={Style.imgg}
                border="1px solid gray" 
                borderRadius='8px'
                p="10px"
                  h="100%"
                  src={el.imageUrl}
                  alt="Dan Abramov"
                />
              </Box>
              <Box  w="70%" p="20px" ml='10px' className={Style.desc}>
                <Heading
                  size="sm"
                  fontSize="20px"
                  fontWeight="bold"
                  mt="6px"
                  color="rgb(79,88,104)"
                >
                       {el.productName} 
                </Heading>
                <Text mt="10px" mb="10px" color="teal" cursor='pointer' onClick={handlePrevPage}>
                  Visit {item?.type} store{" "}
                </Text>

            
                <Box display='flex'  className={Style.rating_price}>
                  <Box >

                    <Flex mt="10px">
                      <Heading size="sm" fontWeight="bold" fontSize="20px">
                      ₹{el.sale_price}
                      </Heading>
                      <Text color="gray.500" ml="10px">
                        MRP{el.sale_price}
                      </Text>
                      <Text
                        ml="10px"
                        bg="rgb(249,140,142)"
                        pl="5px"
                        pr="5px"
                        color="white"
                      >
                        {el.discountPercentage}%
                      </Text>
                    </Flex>
                    <Text fontSize="13px" color="gray.500">
                      Inclusive of all taxes
                    </Text>
                    <Text fontSize="15px"> Delivery will be made within 4 to 7 days after the order is placed</Text>
                  </Box>
                  <Spacer />
                  <Box display="flex" className={Style.buttons}>
                    <Box mt='25px' className={Style.view_cart}>
                   <Button colorScheme='teal'  fontSize='20px' w='100%' >View Cart    </Button> 
                   </Box>
                  <Box mt="25px" mr="100px"  className={Style.select_option}>
                   
                    <Select placeholder="Qty 1" w="100%"  onChange={(e)=>setQty(e.target.value)}>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                  </Select>
                    <Button colorScheme='teal'mt='15px'  fontSize='20px' onClick={()=>addCart(el._id)} className={Style.addCartBtn1}>Add To Cart</Button>
                  </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider mt='50px'/>
            <Box  p="20px" mt='50px'>
              <Heading
                size="sm"
                fontSize="18px"
                fontWeight="bold"
                mt="6px"
                mb='20px'
                color="rgb(79,88,104)"
              >
                Description
              </Heading>
              <Text>
                {el.specification}
              </Text>
             
            </Box>
          </Box>
          <Box  w="30%" p="20px" className={Style.view_cart2}>
            <Heading
              size="sm"
              fontSize="20px"
              fontWeight="bold"
              mt="6px"
              color="rgb(79,88,104)"
            >
           See Items in Cart
            </Heading>
            <Button onClick={viewcart} colorScheme="teal" w="100%" fontSize="20px" mt="20px" >
              View Cart{" "}
            </Button>
          </Box>
        </Box>
      </Box>
      ))}
    </>
  );
};

export default SingleProduct;