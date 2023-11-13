import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icon.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/icon.png"
        color="#06091a"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#06091a" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#06091a" />

      <meta title={`Contract Browser`} />
      <meta
        name="description"
        content={`Contract Browser is a search engine for Cadence smart contracts on Flow. Search for contracts by name, address and code.`}
      />
      <meta property="og:image" content="https://contractbrowser.com/social.png" />
    </Head>
  )
}

export default Meta