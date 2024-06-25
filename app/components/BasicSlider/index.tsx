import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* swiper.js */
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";

const slideSettings = {
  0: {
    slidesPerView: 1,
  },
  /*
  1024: {
    slidesPerView: 3,
  },
  */
};

export default function Instagram() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}?access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}&fields=media{like_count,media_url,thumbnail_url,media_type,permalink}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.media.data);
        setImages(data.media.data);
      })
      .catch((error) =>
        console.error(
          "An error occurred while fetching Instagram images:",
          error
        )
      );
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={slideSettings} // slidesPerViewを指定
        slidesPerView={"auto"} // ハイドレーションエラー対策
        centeredSlides={true} // スライドを中央に配置
        loop={true} // スライドをループさせる
        speed={1000} // スライドが切り替わる時の速度
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} // スライド表示時間
        navigation // ナビゲーション（左右の矢印）
        pagination={{
          clickable: true,
        }} // ページネーション, クリックで対象のスライドに切り替わる
        className={styles.slideWrapper}
      >
        <SwiperSlide
          className={styles['swiper-slide']}
        >
        {images?.slice(0, 9).map((image) => (
            <Link href={image['permalink']} target="_top">
              <Image
                key={image['id']}
                src={
                  image['media_type'] === 'VIDEO'
                    ? image['thumbnail_url']
                    : image['media_url']
                }
                alt="インスタグラムの投稿画像"
                width="341"
                height="341"
              />
            </Link>
          ))}
        </SwiperSlide>
      </Swiper>
    </>
  );
}