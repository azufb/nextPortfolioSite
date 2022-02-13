// タイトルとNavigation
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header() {
    return (
        <div className={styles.headerContents}>
            <h1 className={styles.h1}>
                Azu's Portfolio Site
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