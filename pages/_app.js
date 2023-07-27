import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </ErrorBoundary>)
}

export default MyApp
