import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function CustomHead() {
  const t = useTranslations();
  const URI = useRef();

  useEffect(() => {
    URI.current = window.location.href;
  }, []);

  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{t("meta.title")}</title>
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="3 days" />
        <meta name="title" content={t("meta.title")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <meta name="description" content={t("meta.description")} />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="16x16" />
        <meta name="author" content="Faisal Ahmed" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URI.current} />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta
          property="og:image"
          content={`https://rapedido.es/meta-image.png`}
        />

        {/* <!-- Twitter --> */}
        <meta
          property="twitter:card"
          content={`https://rapedido.es/meta-image.png`}
        />
        <meta property="twitter:url" content={URI.current} />
        <meta property="twitter:title" content={t("meta.title")} />
        <meta property="twitter:description" content={t("meta.description")} />
        <meta
          property="twitter:image"
          content={`https://rapedido.es/meta-image.png`}
        />
      </Head>
    </>
  );
}
