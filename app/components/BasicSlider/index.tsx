import Image from "next/image";

// オプションをインポートする
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";

// publicフォルダの画像
const images = [
  "/basicSlider/majo001.jpg",
  "/basicSlider/majo002.jpg",
  "/basicSlider/majo005.jpg",
  "/basicSlider/majo006.jpg",
  "/basicSlider/majo010.jpg",
  "/basicSlider/majo014.jpg",
  "/basicSlider/majo018.jpg",
  "/basicSlider/majo050.jpg",
];

export default function BasicSlider() {
   // ブレイクポイントに基づいて1つのスライドに表示するスライドの数を指定
  const slideSettings = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };

  return (
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
      {images.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            width={1920}
            height={1038}
            alt="Slider Image"
            sizes="(min-width: 1024px) 100vw, 60vw"
            className={styles.slideImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}