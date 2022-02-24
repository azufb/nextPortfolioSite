import Layout from '../components/Layout';
import { client } from '../libs/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMedal } from '@fortawesome/free-solid-svg-icons'; 
import styles from '../styles/About.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../libs/dateFormat';

export default function About({ data }) {
    const languages = ["HTML", "CSS", "Sass", "JavaScript", "TypeScript", "PHP"];
    const frameWorks = ["React", "Vue.js", "Svelte", "Next.js"];

    return (
        <Layout>
            <h1 className={styles.h1}>#ABOUT</h1>
            <table className={styles.profileTable}>
                <tbody>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>1998/02/10</td>
                        <td>兵庫県で生まれる。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2016/04/01</td>
                        <td>関西学院大学商学部入学。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2020/03/31</td>
                        <td>関西学院大学商学部卒業。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2020/10/12</td>
                        <td>J.B.Goode株式会社入社。(フルタイムアルバイト)</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2021/09/30</td>
                        <td>J.B.Goode株式会社退職。(フルタイムアルバイト)</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2021/10/01</td>
                        <td>株式会社ルートゼロ入社。<FontAwesomeIcon icon={faLocationDot} className={styles.locationDot} /></td>
                    </tr>
                </tbody>
            </table>

            <h1 className={styles.h1}>#LINKS</h1>
            <div className={styles.links}>
                <Link href={process.env.NEXT_PUBLIC_TWITTER_URL}>
                    <a target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                        <Image src="/images/twitterLogo.svg" alt='Twitter' width={50} height={50} />
                    </a>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_GITHUB_URL}>
                    <a target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                        <Image src="/images/gitHubLogo.png" alt='GitHub' width={50} height={50} />
                    </a>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_QIITA_URL}>
                    <a target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                        <Image src="/images/qiitaLogo.png" alt='Qiita' width={50} height={50} />
                    </a>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_ZENN_URL} className={styles.linkIcon}>
                    <a target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
                        <Image src="/images/zennLogo.svg" alt='Zenn' width={50} height={50} />
                    </a>
                </Link>
                <div className={styles.boxLinkWantedly}>
                    <Link href={process.env.NEXT_PUBLIC_WANTEDLY_URL}>
                        <a target="_blank" rel="noopener noreferrer">
                            <Image src="/images/wantedlyVisit.svg" alt='Wantedly' layout='fill' objectFit='contain' />
                        </a>
                    </Link>
                </div>
            </div>
            <p className={styles.linkContent}>
                実務や学習中、個人開発中の学びについて、ZennやQiitaで技術記事を投稿しています！
            </p>

            <h1 className={styles.h1}>#SKILLS</h1>
            <h2 className={styles.h2}>##言語(マークアップ・プログラミング)</h2>
            <div className={styles.skills}>
            {languages.map((language, index) => (
                <div className={styles.card} key={index}>
                    <FontAwesomeIcon icon={faMedal} size="xl" className={styles.skillIcon} />
                    <span>{language}</span>
                </div>
            ))}
            </div>
            <p className={styles.skillContent}>
                HTML・CSS・Sass・JavaScript・TypeScriptは実務での使用経験があります。<br />
                PHPはまだ勉強中です！
            </p>

            <h2 className={styles.h2}>##ライブラリ・フレームワーク</h2>
            <div className={styles.skills}>
            {frameWorks.map((frameWork, index) => (
                <div className={styles.card} key={index}>
                    <FontAwesomeIcon icon={faMedal} size="xl" className={styles.skillIcon} />
                    <span>{frameWork}</span>
                </div>
            ))}
            </div>
            <p className={styles.skillContent}>
                Vue.jsは実務での使用経験があります。<br />
                Reactは実務での使用経験はありますが、保守対応でした。<br />
            </p>
            
            <h1 className={styles.h1}>#CERTIFICATION</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Tag</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((certification) => (
                        <tr key={certification.id} className={styles.tableRow}>
                            <td>{formatDate(certification.date)}</td>
                            <td><span className={styles.span}>{certification.title}</span></td>
                            <td>#{certification.tag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "certification" });

    return {
        props: {
            data: data.contents || null || []
        }
    }
}