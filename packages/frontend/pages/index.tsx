import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Lunktwig</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <p>Home Page</p>
            </main>
        </div>
    )
}

export default Home
