import '../styles/globals.css'
import DefaultLayout from '../layouts/DefaultLayout'

// Import FCL config
import '../config/fcl'

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}

export default MyApp
