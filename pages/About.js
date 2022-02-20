import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/About.module.css';

export default function About({ data }) {
    return (
        <Layout>
            <div className={styles.contents}>
                <h1>About</h1>
                <p>
                    <span>
                        1998.02<br />
                        兵庫県に生まれる。
                    </span>
                </p>

                <p>
                    <span>
                        2016.03<br />
                        高校卒業。
                    </span>
                </p>

                <p>
                    <span>
                        2016.04<br />
                        大学入学。
                    </span>
                </p>

                <p>
                    <span>
                        2020.03<br />
                        大学卒業。
                    </span>
                </p>

                <p>
                    <span>
                        2020.10<br />
                        J.B.Goode株式会社に入社。(アルバイト)
                    </span>
                </p>

                <p>
                    <span>
                        2021.10<br />
                        株式会社ルートゼロに入社。
                    </span>
                </p>

                <h1>Skills</h1>
                <div></div>
                <h1>Certification</h1>
                <div>
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