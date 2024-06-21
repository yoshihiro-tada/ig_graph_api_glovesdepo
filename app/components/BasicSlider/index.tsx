import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Instagram() {
  const [images, setImages] = useState([]);

  type InstagramImage = {
    media_url: string;
    caption?: string;
  };
  
  useEffect(() => {
    fetch(
      `https://graph.facebook.com/v15.0/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}?access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}&fields=media{like_count,media_url}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data.data))
      .catch((error) =>
        console.error(
          "An error occurred while fetching Instagram images:",
          error
        )
      );
  }, []);

  return (
    <>
      {images.map((image, index) => (
        <Image key={index} src={image.media_url} alt={image.caption} />
      ))}
    </>
  );
}