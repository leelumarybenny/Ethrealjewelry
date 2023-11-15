import React, { useEffect, useState } from 'react'
import { Box,TableContainer,Table,Thead,Tr,Th,Tbody,Td,Spinner,Image,Flex,Text,Input} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {baseUrl} from "../../Utils/BaseUrl"

const UsersPage = () => {
    const [loading,setLoading]=useState(false)
    const [users,setUsers]=useState([])
    const navigate=useNavigate()
    let r = localStorage.getItem("adminToken")
    console.log(r)
    


useEffect(()=>{
    // setLoading(true)
axios.get(`${baseUrl}/allUsers`,{
  headers:{
    Authorization:`Bearer ${r}`
  }
})
.then((res)=>{
        console.log(res.data)
        setUsers(res.data)
        setLoading(false)   
    })
    .catch((err)=>{
        console.log(err)
        console.log(err.response.data)
        setUsers(err.response.data)
    })
    },[])

const handleChange = (e) => {
    axios.get(`${baseUrl}/user/search/${e.target.value}`)
.then((res)=>{
    console.log(res)
    setUsers(res.data)
    })
    .catch((err)=>{
    console.log(err)
    })
}


const handleNavigate=(ele)=>{
    navigate(`/singleuser/${ele._id}`)
  }

if(loading){
return <Spinner textAlign='center' mt={50} ml={50} thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
}


return (
    <Box>
      <Flex justifyContent="space-between" pb={10}>
        <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Total Users : {users.length}</Text>
        <Input fontSize={["10px","10px","10px","20px"]} onInput={handleChange} w={["30%","30%","30%","60%"]} placeholder="search user"/>
        
      </Flex>
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr textAlign='center'>
                  <Th>Image</Th>
                  <Th>User-name</Th>
                  <Th>Full Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
      {
        users && users.map(ele=>(
                <Tr key={ele._id} cursor="pointer" _hover={{backgroundColor:"#f3f4f6"}}>
                  <Td><Image w={50} src={`https://www.freeiconspng.com/uploads/blank-face-person-icon-7.png`}/></Td>
                  <Td>{ele.username}</Td>
                  <Td>{ele.firstName} {ele.lastName}</Td>
                  <Td>{ele.email}</Td>
                  
                </Tr>
                ))
              }
              </Tbody>
            </Table>
          </TableContainer>
    </Box>
  )
}

export default UsersPage
