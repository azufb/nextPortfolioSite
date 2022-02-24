import Link from 'next/link';
import styles from '../styles/Header.module.css';
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    return (
        <div className={styles.headerContents}>
            <h1 className={styles.h1}>
                Azu&apos;s Portfolio Site
            </h1>

            <div className={styles.navs}>
                <Link href="/" passHref>
                    <span className={
                        router.asPath === "/" ?
                        styles.spanCurrent :
                        ""
                    }>
                        <a className={styles.navi}>Home</a>
                    </span>
                </Link>
                <span className={styles.separator}>/</span>
                <Link href="/About" passHref>
                    <span className={
                        router.asPath === "/About" ?
                        styles.spanCurrent :
                        ""
                    }>
                        <a className={styles.navi}>About</a>
                    </span>
                </Link>
                <span className={styles.separator}>/</span>
                <Link href="/Works/page/1" passHref>
                    <span className={
                        router.asPath.includes("/Works/") ?
                        styles.spanCurrent :
                        ""
                    }>
                        <a className={styles.navi}>Works</a>
                    </span>
                </Link>
                <span className={styles.separator}>/</span>
                <Link href="/Blog" passHref>
                    <span className={
                        router.asPath.includes("/Blog") ?
                        styles.spanCurrent :
                        ""
                    }>
                        <a className={styles.navi}>Blog</a>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Header;