import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
    return (
        <>
        <Head>
            <title>Azu's Portfolio Site</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.contents}>
            <Header />
            <div className={styles.child}>{ children }</div>
            <Footer />
        </div>
        </>
    )
}