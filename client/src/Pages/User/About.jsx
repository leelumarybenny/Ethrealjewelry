import { Tabs,Tab,TabPanels,TabList,TabPanel,FormControl,Input,Button,Textarea,Heading,FormLabel} from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Text
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Link } from 'react-router-dom'

const About = () => {
  const [username,setUsername]=useState('')
  const [msg,setMsg]=useState('')


const handlePost=()=>{
  const payload={
    username,
    msg
  }
  alert(`Thanks,${username} your valuable feedback is saved.`)
}


return (
  <>
  <Navbar/>
  <Box pt={20}>
  <Tabs p={5} w="70%" m="auto" mt={10} boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'>
<TabList>
  <Tab>About us</Tab>
  <Tab>Contact Us</Tab>
</TabList>

<TabPanels>
  <TabPanel p={10}>
  <p><strong>About Us</strong></p>

<p>At EarthReal Jewellery, we believe that jewelry is more than just an accessory; it&rsquo;s a reflection of your unique style and personality. Established with a passion for artistry and a commitment to quality, EarthReal Jewellery is your destination for exquisite, handcrafted jewelry pieces that celebrate the natural beauty of our planet.</p>

<p><strong>Our Story</strong></p>

<p>Inspired by the enchanting elements of nature, EarthReal Jewellery was founded by a team of skilled artisans and jewelry enthusiasts. Our journey began with a simple yet profound idea: to create jewelry that not only captures the essence of Earth&#39;s wonders but also tells a story of craftsmanship and creativity. Guided by this vision, we embarked on a mission to curate a stunning collection of jewelry that harmonizes elegance with the spirit of nature.</p>

<p><strong>Craftsmanship and Quality</strong></p>

<p>Every piece at EarthReal Jewellery is meticulously crafted by our skilled artisans, who infuse passion and dedication into their work. We take pride in using ethically sourced gemstones and precious metals, ensuring the highest quality and authenticity in each creation. Our commitment to quality craftsmanship is reflected in every detail, making our jewelry as enduring as the natural elements that inspire them.</p>

<p><strong>Our Collections</strong></p>

<p>Explore our diverse range of collections, each designed to capture the essence of Earth&#39;s beauty. From vibrant gemstone earrings reminiscent of blooming flowers to intricately designed necklaces inspired by the patterns of tree branches, our jewelry pieces are unique works of art that bring nature&#39;s charm to life.</p>

<p><strong>Customer Experience</strong></p>

<p>At EarthReal Jewellery, we prioritize your satisfaction and strive to provide an exceptional shopping experience. Our knowledgeable and friendly team is here to assist you, whether you&#39;re seeking a meaningful gift, a statement piece for a special occasion, or a personal indulgence. We offer personalized consultations, ensuring that you find the perfect piece that resonates with your style and story.</p>

<p><strong>Join Us on the Journey</strong></p>

<p>Join us in celebrating the beauty of Earth and the artistry of jewelry. Explore our collections, and let our creations inspire your imagination. At EarthReal Jewellery, we invite you to wear a piece of nature, crafted with love and creativity, and make a statement that is as authentic and beautiful as you are.</p>

<p>Welcome to EarthReal Jewellery, where nature meets elegance.</p>
  </TabPanel>
  <TabPanel>
  <Box width={["90%","90%","90%"]} m="auto">
      <Box p={10} m={[0,0,0]}>
    <Text pb={10} textAlign='center'>Please Enter your query and suggestion here.</Text>
          <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Email'/>
                  <FormLabel>Message</FormLabel>
                  <Textarea value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='Enter Your Message Here' />
                  <Button mt={4} width="100%" onClick={handlePost}>POST</Button>
          </FormControl>
      </Box>
</Box>
  </TabPanel>
</TabPanels>
</Tabs>
</Box>
<Heading pt={100} textAlign="center">Here are some frequently asked questions.</Heading>
    <Box pt={20} w="80%" m='auto' pb={20}>
    <Accordion allowToggle p={10} boxShadow= "rgba(0, 0, 0, 0.35) 0px 5px 15px">
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" fontSize={["15px","10px","25px"]} textAlign='center' flex='1'>
          What types of jewelry do you offer?
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      Eathreal Jewellery offers a wide range of jewelry items, including earrings, necklaces, rings, and bracelets, crafted from high-quality materials such as gold, silver, and precious gemstones. Our jewelry pieces are intricately designed and can be customized to suit your preferences
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' fontSize={["15px","10px","25px"]} textAlign='center'>
          How can I place an order?
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      To place an order, simply browse our online catalog, select the desired items, and proceed to checkout. We offer fast and reliable shipping services with various delivery options. For international customers, we provide international shipping to deliver our products worldwide 
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' fontSize={["15px","10px","25px"]} textAlign='center'>
          What is your return policy?
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      We have a hassle-free return policy. If you're not satisfied with your purchase, you can initiate a return or exchange within a specified period after receiving the item. Please refer to our Returns & Exchanges policy on our website for detailed instructions on how to proceed.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' fontSize={["15px","10px","25px"]} textAlign='center'>
          What payment methods do you accept?
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      We accept various payment methods, including credit/debit cards and online payment gateways, ensuring a secure and smooth transaction process. Our prices are displayed in the local currency and are competitive, offering excellent value for the quality and craftsmanship of our jewelry pieces
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' fontSize={["15px","10px","25px"]} textAlign='center'>
          How can I contact your customer service?
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
      Our dedicated customer service team is readily available to assist you. You can contact us via email, phone, or through the contact form on our website. We prioritize customer satisfaction and aim to respond to all inquiries promptly. For in-person consultations, we welcome you to visit our physical store location where our knowledgeable staff can assist you personally.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
  </Box>
</>
)
}

export default About