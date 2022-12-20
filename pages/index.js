import { debounce as $debounce } from 'lodash';
import {useState, useEffect, useCallback, useRef} from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Search from '../components/Search';
import TopBar from '../components/TopBar';
import {useTranslations} from 'next-intl';
import {fetchRestaurantList} from '../app/api/restaurant';
import Card from '../components/products/Card';
import LoadingSkeleton from '../components/LoadingSkeleton';


export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const [products, setProducts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFocused, changeFocus] = useState(false);
  const { isLoading, isError, data, error } = useQuery('restaurants', fetchRestaurantList);
  const URI = useRef();

  useEffect(() => {
    URI.current = window.location.href;
  }, []);

  useEffect(() => {
    if(data?.status && data?.payload?.restaurants) {
      setProducts(data.payload.restaurants.filter( product => product.companyName.toLowerCase().match(searchKeyword.toLowerCase())));
    }
      console.log(data)
  }, [isLoading])

  const handleFilter = useCallback($debounce(filterProduct, 400), [products]);


  function onSubmitHandler(event) {
    const UrlObject = {pathname: '/search/result'};

    if(searchKeyword.trim()) {
      UrlObject.query = {q:searchKeyword};
    }

    if (event.key === 'Enter') {
      router.push(UrlObject);
    }

  }

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
  function handleFocusChanged(value) {
      changeFocus(value);
  }

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
      <TopBar />

      <div className="w-full">
        {/* hero section */}
        <section className="max-h-[434px] bg-green-600 flex flex-col items-center py-12">

            {
                (!isFocused) &&
                <>
                    <div className="mb-5">
                        <p className="text-white text-center text-[17px] cursor-pointer" onClick={() => router.push('/partner')}>
                            <span className="underline decoration-1">{t("hero.partner_text")}</span>
                            <span className="ml-1 text-yellow-400"> &gt;&gt; </span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center mb-12 h-14">
                        <div className="font-semibold text-xl">
                            <img src='/logo-lg.png' alt='Rapedido Logo' />
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-center text-white mb-4 px-4">
                        {t("hero.title")}
                    </h1>
                </>
            }
          <div className="flex justify-center w-full">
              <Search
                  className="flex items-center h-11 w-[90%] px-4 py-2 rounded-[6px] bg-white"
                  onKeyDown={onSubmitHandler} onKeyUp={(event) => {
                      setSearchKeyword(event.target.value);
                      handleFilter(event);
                  }}
                  onFocusChanged={handleFocusChanged}
                  placeholder={t("hero.search_placeholder")}
              />
          </div>
        </section>

        {/** landing content */}
        <div className="w-full bg-[#FAFAFA] pb-12 pt-6 mb-12">
          {/** product section */}
          <div id="product" className="container">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {(isLoading || searching) && (
                <LoadingSkeleton />
              )}
              {!isLoading && !searching && data?.status && products.map((product, key) => {
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
      messages: (await import(`../lang/home/${locale}.json`)).default
    }
  };
}

