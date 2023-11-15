import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";


const ReviewsData = [
  {
      name:"Praveena Arul",
      date:"August 22, 2023",
      review:"I recently purchased a stunning diamond necklace from this website, and I couldn't be happier! The quality is exceptional, and it sparkles beautifully. The customer service was excellent too; they helped me choose the perfect piece. I highly recommend this store!"
  },
  {
      name:"Alwyn Roy",
      date:"May 23, 2023",
      review:"I'm a repeat customer because I've always had fantastic experiences. The earrings I purchased are exquisite, and they arrived in a beautiful box. The website is easy to navigate, and the payment process is secure. Will definitely shop here again!"
  },
  {
      name:"Prabil Jayaprakash",
      date:"April 15, 2023",
      review:"I bought a custom-made bracelet for my wife's birthday. The team was patient and worked closely with me to design the piece exactly as I wanted. It turned out even better than expected. The only downside was the slightly longer production time, but it was worth the wait."
  },
  {
      name:"Abhijith P",
      date:"July 23, 2022",
      review:"This website is a gem (pun intended)! The collection is diverse, catering to various tastes. I ordered a birthstone necklace, and it arrived beautifully packaged with a certificate of authenticity. The quality exceeded my expectations. I'm a happy customer!"
  },
  {
      name:"Sangeeth Pramod",
      date:"March 18, 2022",
      review:"Outstanding service! I had an issue with the clasp on my bracelet, and they promptly replaced it without any hassle. The after-sales support is commendable. I appreciate their commitment to customer satisfaction. I'll be back for more jewelry soon"
  },
  {
      name:"Brijesh P",
      date:"September 21, 2022",
      review:"I adore my new ring; it's elegant and unique. The website's photos accurately represent the products. The sizing guide was helpful, ensuring a perfect fit. The only suggestion I have is to offer more detailed product descriptions."
  }
]

const Reviews = () => {
  const isBigScreen = useMediaQuery({ query: "(max-width: 100%)" });
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

return (
<Box p={5}>
      <Heading
        p={5}
        textAlign={"start"}
        size="lg"
        color={"#30363C"}
        fontFamily={"sans-serif"}
      >
     What Our Customers have to Say
      </Heading>

     

      <Flex justifyContent={"space-between"} p={5} w={"100%"}>
        <Swiper
          slidesPerView={isBigScreen ? 4 : isTablet ? 2 : isMobile ? 2 : 4}
          spaceBetween={0}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {ReviewsData.map((el, i) => (
            <SwiperSlide key={i} style={{ gap: "10px", color: "black" }}>
            <Box key={i} width="344px" textAlign="left">
              <Heading fontSize="16px" fontWeight="600">
                {el.name}
              </Heading>
              <Heading fontSize="14px" fontWeight="400" marginTop="5px">
                {el.date}
              </Heading>
              <Box
                width="344px"
                border="1px solid #e2fff2"
                borderRadius="7px"
                padding="24px"
                marginTop="20px"
                bg="#f0f0f0"
                height="302px"
              >
                <Heading color="#bfeddd">"</Heading>
                <Heading fontSize="16px" color="#4f4d4a" fontWeight="500">
                  {el.review}
                </Heading>
              </Box>
            </Box>
            </SwiperSlide>
          ))}
          </Swiper>
      </Flex>
    </Box>
  );
};

export default Reviews;