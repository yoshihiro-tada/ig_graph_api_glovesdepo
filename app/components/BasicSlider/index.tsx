import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Instagram() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}?access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}&fields=media{like_count,media_url}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
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
      <p>aaaa</p>
      {images?.map((image) => (
        <Image
          src={image['media_url']}
          alt="インスタグラムの投稿画像"
          width="500"
          height="500"
        />
      ))}
    </>
  );
}