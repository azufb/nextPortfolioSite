import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <div className={styles.headerContents}>
            <Link href="/" passHref>
                <h1 className={styles.h1}>
                    Azu&apos;s Portfolio Site
                </h1>
            </Link>

            <div>
                <Link href="/About">
                    <a className={styles.navi}>About</a>
                </Link>
                <span className={styles.separator}>|</span>
                <Link href="/Works">
                    <a className={styles.navi}>Works</a>
                </Link>
                <span className={styles.separator}>|</span>
                <Link href="/Blog">
                    <a className={styles.navi}>Blog</a>
                </Link>
            </div>
        </div>
    )
}