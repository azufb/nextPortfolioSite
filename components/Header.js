import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <div className={styles.headerContents}>
            <h1 className={styles.h1}>
                Azu&apos;s Portfolio Site
            </h1>

            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/About">
                    <a>About</a>
                </Link>
                <Link href="/Works">
                    <a>Works</a>
                </Link>
            </div>
        </div>
    )
}