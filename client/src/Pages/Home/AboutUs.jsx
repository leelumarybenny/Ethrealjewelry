import { Box, Flex,Image,Heading,Text } from '@chakra-ui/react'
import React from 'react'

const AboutUs = () => {


return (
    <Flex w='90%' m='auto' pt={20} justifyContent='space-between'> 
   
        <Image w='40%' src='https://m.media-amazon.com/images/I/71pGbJUnCqL._AC_UX466_.jpg'/>
      <Box w='50%'>
        <Heading pb={10}>About Us</Heading>
        <Text>
        <p>What started as a passion project in 2000, soon evolved into a respected business that offers beautiful pieces of jewelry for every occasion. We emphasize sustainability and ethically sourced materials without compromising on the quality of our metals and gemstones. We know jewelry shopping can be intimidating, which is why we provide a friendly, no-pressure atmosphere that makes the purchasing process a pleasure. No matter what special piece you’re looking for, you’ll be able to find it at ETHREAL JEWELERY.</p>


          </Text>
      </Box>
    </Flex>
  )
}

export default AboutUs
