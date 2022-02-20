import Layout from '../components/Layout';
import { client } from '../libs/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '../node_modules/@fortawesome/free-brands-svg-icons' 
import styles from '../styles/About.module.css';

export default function About({ data }) {
    return (
        <Layout>
            <div className={styles.contents}>
                <h1>About</h1>
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

                <h1>リンク</h1>
                <div>
                    <FontAwesomeIcon icon={faTwitter} size="xl" />
                    <FontAwesomeIcon icon={faGithub} size="xl" />
                </div>

                <h1>Skills</h1>
                <div>
                    
                </div>
                <h1>Certification</h1>
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
            </div>
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