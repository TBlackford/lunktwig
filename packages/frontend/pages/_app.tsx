import React from 'react'
import Head from 'next/head'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Lunktwig</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
