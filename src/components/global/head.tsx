import Head from "next/head";
import React from "react";

export default function Header({
  title = "IremboPay - Merchant Portal",
  description = "Track your invoices and have visibility on all payments made to you.",
  image = "https://res.cloudinary.com/dpnbddror/image/upload/c_crop,g_north_east,h_800,w_1200/a_180/v1689621336/slide.e88b79bbe59d2049a195_multoc.jpg",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1 maximum-scale=1 user-scalable=no"
      />
    </Head>
  );
}
