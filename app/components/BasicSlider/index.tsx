import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        console.log(data.media.data.media_url);
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
      {images?.map((image) => (
        <Link href={image['permalink']} target="_top">
          <Image
            key={image['id']}
            src={image['media_url']}
            alt="インスタグラムの投稿画像"
            width="300"
            height="300"
          />
        </Link>
      ))}
    </>
  );
}