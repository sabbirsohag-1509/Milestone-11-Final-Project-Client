import React, { useEffect, useState } from "react";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/reviews.json`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setReviews(data);
      });
  }, []);

  return (
    <div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"5"}
        coverflowEffect={{
          rotate: 30,
          stretch: "0%",
          depth: 200,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Review review={review}></Review>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
