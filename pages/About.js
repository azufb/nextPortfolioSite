import Layout from '../components/Layout';
import { client } from '../libs/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMedal } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '../node_modules/@fortawesome/free-brands-svg-icons' 
import styles from '../styles/About.module.css';
import Link from 'next/link';

export default function About({ data }) {
    const languages = ["HTML", "CSS", "Sass", "JavaScript", "TypeScript", "PHP"];
    const frameWorks = ["React", "Vue.js", "Svelte", "Next.js"];

    return (
        <Layout>
            <h1 className={styles.h1}>#About</h1>
            <table className={styles.profileTable}>
                <tbody>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>1998/2/10</td>
                        <td>兵庫県で生まれる。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2016/4/1</td>
                        <td>関西学院大学商学部入学。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2020/3/31</td>
                        <td>関西学院大学商学部卒業。</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2020/10/12</td>
                        <td>J.B.Goode株式会社入社。(フルタイムアルバイト)</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2021/9/30</td>
                        <td>J.B.Goode株式会社退職。(フルタイムアルバイト)</td>
                    </tr>
                    <tr className={styles.tRow}>
                        <td className={styles.date}>2021/10/1</td>
                        <td>株式会社ルートゼロ入社。<FontAwesomeIcon icon={faLocationDot} className={styles.locationDot} /></td>
                    </tr>
                </tbody>
            </table>

            <h1 className={styles.h1}>#リンク</h1>
            <div className={styles.links}>
                <Link href="https://twitter.com/azunyan_eng">
                    <a target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className={styles.linkIconTwitter} />
                    </a>
                </Link>
                <Link href="https://github.com/azufb">
                    <a target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} />
                    </a>
                </Link>
                <div className={styles.boxLinkZenn}>
                    <Link href="https://zenn.dev/azunasu">
                        <a target="_blank" rel="noopener noreferrer">Zenn</a>
                    </Link>
                </div>
                <div className={styles.boxLinkQiita}>
                    <Link href="https://qiita.com/azu_nyan">
                        <a target="_blank" rel="noopener noreferrer">Qiita</a>
                    </Link>
                </div>
                <div className={styles.boxLinkWantedly}>
                    <Link href="https://www.wantedly.com/id/azusa_okamoto">
                        <a target="_blank" rel="noopener noreferrer">Wantedly</a>
                    </Link>
                </div>
            </div>
            <p className={styles.linkContent}>
                実務や学習中、個人開発中の学びについて、ZennやQiitaで技術記事を投稿しています！
            </p>

            <h1 className={styles.h1}>#Skills</h1>
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
            
            <h1 className={styles.h1}>#Certification</h1>
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
                            <td>{new Date(certification.date).toLocaleDateString()}</td>
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