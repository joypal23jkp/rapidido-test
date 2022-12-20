import { debounce as $debounce } from 'lodash';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Search from '../../components/Search';
import TopBar from '../../components/TopBar';
import {useTranslations} from 'next-intl';
import Card, {products as dummyProducts} from '../../components/products/Card';
import Filter from '../../components/products/Filter';
import {fetchRestaurantList} from '../../app/api/restaurant';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { useRouter } from 'next/router';


export default function Result() {
    const router = useRouter();
    const t = useTranslations();
    const [products, setProducts] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState(router.query.q || "");
    const { isLoading, isError, data, error } = useQuery('restaurants', fetchRestaurantList);
    const URI = useRef();
  
    useEffect(() => {
        URI.current = window.location.href;
    }, []);

    useEffect(() => {
      const query = router.query;
      if(query.q) {
        setSearchTerm(query.q);
      }
    }, [router])

    useEffect(() => {
      if(data?.status && data?.payload?.restaurants) {
        setProducts(data.payload.restaurants.filter( product => product.companyName.toLowerCase().match(searchTerm.toLowerCase())));
      }
    }, [isLoading])

    const handleFilter = useCallback($debounce(filterProduct, 400), [products]);

    function filterProduct(event) {
      setSearching(true);
      const value = event.target.value.toLowerCase();

      if(value) {
        setProducts(
          data.payload.restaurants.filter( product => product.companyName.toLowerCase().match(value))
        );
      } else {
        setProducts(
          data.payload.restaurants
        )
      }
      setTimeout(() => {
        setSearching(false);
      }, 200)
    }


  return (
    <>
        <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{t("meta.title")}</title>
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="3 days" />
        <meta name="title" content={t("meta.title")} />
        <meta name="description" content={t("meta.description")} />
        <link rel="icon" href="/favicon.png"  type="image/png" sizes="16x16" />
        <meta name="author" content="Faisal Ahmed" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URI.current} />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:image" content={`https://rapedido.es/meta-image.png`} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content={`https://rapedido.es/meta-image.png`} />
        <meta property="twitter:url" content={URI.current} />
        <meta property="twitter:title" content={t("meta.title")} />
        <meta property="twitter:description" content={t("meta.description")} />
        <meta property="twitter:image" content={`https://rapedido.es/meta-image.png`} />
    </Head>
    <div className="w-full">

        <div className="min-h-[18vh] max-h-29 bg-primary flex flex-col justify-between">
          <TopBar hasBottomBorder={false}/>
          <div className="p-5 pt-0">
           <Search defaultValue={searchTerm} onKeyUp={handleFilter} className="flex items-center h-11 w-full px-4 py-2 rounded-lg bg-white" placeholder={t("hero.search_placeholder")}/>
          </div>

        </div>

        {/** landing content */}
        <div className="w-full bg-[#FAFAFA] pb-12 pt-6 mb-12">

          {/** product section */}
          <div id="product" className="container m-auto">
            <div className="flex justify-between">
              <Filter className="mb-6" label="Location" options={[{name: 'New Work'}]} />
              <Filter className="mb-6" label="Type" options={[{name: 'New Work'}]} />
              <Filter className="mb-6" label="Review" options={[{name: 'New Work'}]} />
              <Filter className="mb-6" label="Pricing" options={[{name: 'New Work'}]} />
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
            {(isLoading || searching) && (
                <LoadingSkeleton />
              )}
              {!isLoading && !searching && products.map((product, key) => {
                return (
                  <Card item={product} key={key} />
                )
              })}
            </div>
          </div>
        </div>
        
    </div>
    </>
  )
}

export async function getStaticProps({locale}) {
  return {
    props: {
      messages: (await import(`../../lang/search-result/${locale}.json`)).default
    }
  };
}
