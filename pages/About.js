import Layout from '../components/Layout';
import { client } from '../libs/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '../node_modules/@fortawesome/free-brands-svg-icons' 
import styles from '../styles/About.module.css';
import Link from 'next/link';

export default function About({ data }) {
    const languages = ["HTML", "CSS", "Sass", "JavaScript", "TypeScript", "PHP"];
    const frameWorks = ["React", "Vue.js", "Svelte", "Next.js"];

    return (
        <Layout>
            <h1 className={styles.h1}>#About</h1>
            <div className={styles.profileTable}>
                <div>
                    <div>1998.02</div>
                    <div>
                        <p>兵庫県に生まれる。</p>
                    </div>
                </div>
                <div>
                    <div>2016.04</div>
                    <div>
                        <p>関西学院大学入学。</p>
                    </div>
                </div>
                <div>
                    <div>2020.03</div>
                    <div>
                        <p>関西学院大学卒業。</p>
                    </div>
                </div>
                <div>
                    <div>2020.10</div>
                    <div>
                        <p>株式会社J.B.Goode入社。</p>
                    </div>
                </div>
                <div>
                    <div>2021.10</div>
                    <div>
                        <p>株式会社ルートゼロ入社。</p>
                    </div>
                </div>
            </div>

            <h1 className={styles.h1}>#リンク</h1>
            <div className={styles.links}>
                <Link href="https://twitter.com/azunyan_eng">
                    <a target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className={styles.linkIconTwitter} /></a>
                </Link>
                <Link href="https://github.com/azufb">
                    <a target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} /></a>
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
            <h2 className={styles.h2}>##言語</h2>
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