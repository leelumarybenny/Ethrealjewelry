import React,{useEffect, useState} from "react";
import {Box,Text,SimpleGrid,Image,Heading,Flex,Select,Spacer,Radio, Divider,Drawer,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Button,useDisclosure, RadioGroup, Stack, DrawerBody} from "@chakra-ui/react";
import Style from "./ProductPage.module.css";
import {useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar"
import axios from "axios";
import {baseUrl} from '../Utils/BaseUrl'
import api from '../Utils/interceptor'

const ProductsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [value, setValue] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [sortValue, setSortValue] = React.useState('-1')
  const [categories,setCategories]= useState([])

  const [data,setData]=useState([])
  const navigate =useNavigate() 

 const jwtToken=localStorage.getItem('eathRealToken')


  useEffect(() => {
    listAllCategories()
  }, []);

  useEffect(() => {
    getProducts();
  }, [category, sortValue]);
  
 
  const handleClick=(el)=>{
     navigate(`/singleProduct/${el._id}`)
  }
  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
  };


const getProducts=()=>{
  console.log("inside getproducts")
  console.log(category,sortValue)
  api.get(`/products?category=${category}&sort=${sortValue}`)
  .then((res)=>{
    console.log(res)
    setData(res.data)
  })
}

const handleSortData = (value) => {

}
 
const listAllCategories = ()=>{
  axios.get(`${baseUrl}/products/categories`,{
    headers:{
      Authorization:`Bearer ${jwtToken}`  
    }
  })
  .then((res)=>{
    console.log(res.data)
    setCategories(res.data)
  })
  .catch((err)=>{
    if(err.response.message==null){
      alert("Something went wrong")
    }else{
      alert(err.response.message)
    }
  })

}

  return (
    <>
    <Navbar/>
  <Box pt='110px' bg='#e7e7e7'>
    <Box gap={10} display="flex" w="90%" m="auto" className={Style.main}>
      <Box bg='white' borderRadius={10} w="30%" box-shadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' padding='25px' className={Style.main1}>
        <Box w='90%'>
      <Heading size="sm" fontSize="30px" color='rgb(79,88,104)'>Filter</Heading>
              <Text mt='20px' mb='15px' fontSize='20px'>Category</Text>
              <RadioGroup onChange={handleCategoryChange} value={category}>
                <Flex mb="10px">
                  <Text>General</Text>
                  <Spacer />
                  <Radio value=""></Radio>
                </Flex>
                {categories.map((cat, index) => (
                  <Flex
                    key={cat._id}
                    onClick={() => handleCategoryChange(cat._id)}
                    mb="10px"
                  >
                    <Text>{cat.category}</Text>
                    <Spacer />
                    <Radio value={cat._id}></Radio>
                  </Flex>
                ))}
              </RadioGroup>
              </Box>
      </Box>
      <Box w="70%" borderRadius='10px' bg='white' box-shadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' padding='10px' className={Style.data_box} >
        <Box h="50px"  mb="30px">
          <Flex mt='15px'>
            <Box>
              <Heading size="sm" fontSize="30px" color='rgb(79,88,104)' className={Style.heading}>
                Products
              </Heading>
            </Box>
            <Spacer/>
            <Box>
              <Flex className={Style.select}>
                <Text fontSize='18px' mr='20px' mt='5px' className={Style.sortBy}>Sort By:</Text>
               
                <Select  w='250px' onClick={(e)=>setSortValue(e.target.value)}>
                  <option value="option1">Relevance</option>
                  <option value="-1">Price high to low</option>
                  <option value="1">Price low to high</option>
                </Select>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box  m='auto' className={Style.sort_filter}>   
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sort</DrawerHeader>
             <Divider/>
             <DrawerBody>
             <RadioGroup onChange={setValue} value={value} w='90%' m='auto'>
      <Stack direction='column'>
        <Flex mt='10px' >
          <Text>Popularity</Text>
          <Spacer/>
          <Radio value='1'></Radio>
        </Flex>
       
        <Flex mb='15px'>
          <Text>Price low to high</Text>
          <Spacer/>
          <Radio value='2'></Radio>
        </Flex>
       
        <Flex mb='15px'>
          <Text>Price high to low</Text>
          <Spacer/>
          <Radio value='3'></Radio>
        </Flex>
       
        <Flex mb='15px'>
          <Text>Discount</Text>
          <Spacer/>
          <Radio value='4'></Radio>
        </Flex>
       
       
      </Stack>
    </RadioGroup>
    </DrawerBody>
          <DrawerFooter>
           
            <Button colorScheme='teal' w='100%'>APPLY</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    
    </Box>
  
        <SimpleGrid columns={[1, 2, 3]} spacing="10px">
        {
           data.map((el)=>(
          <Box
            border="1px"
            borderColor="gray.300"
            padding="8px"
            borderRadius="6px"
            mt="10px"
            key={el._id}
            className={Style.main2}
            onClick={()=>handleClick(el)}
          >
            <Image
              m="auto"
              mt="5px"
              height="200px"
              src={el.imageUrl}
              alt="Vicks"
            />
            <Heading size="sm" fontSize="17px" fontWeight="bold" mt="6px" color='rgb(79,88,104)'>
              {el.productName}
            </Heading>
            <Flex mt="10px">
              <Text color='gray.500' textDecoration="line-through">MRP ₹{el.market_price}</Text>
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
            <Heading size="sm">₹{el.sale_price}</Heading>
          </Box>
               ) )} 
        </SimpleGrid>
      </Box>
    </Box>
</Box>
</>
);
};

export default ProductsPage;