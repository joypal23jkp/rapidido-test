import {NextIntlProvider} from 'next-intl';
import { SessionProvider } from "next-auth/react"
import * from "next-auth/client"
import Layout from '@/components/Layout'
import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from '@/contexts/JWTContext';
import { CartProvider } from '@/contexts/CartContext';
import { DrawerProvider } from '../contexts/DrawerContext';


// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <NextIntlProvider messages={pageProps.messages}>
              <Layout>
                <DrawerProvider>
                  <Component {...pageProps} />
                </DrawerProvider>
              </Layout>
            </NextIntlProvider>
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
      </SessionProvider>
  )

}

export default MyApp
