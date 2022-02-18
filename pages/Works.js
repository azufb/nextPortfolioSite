import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Works.module.css';

export default function Works({ data }) {
    return (
        <Layout>
            <div className={styles.contents}>
                <h1>Works</h1>
                <div className={styles.cards}>
                    {data.map((work) => (
                        <div key={work.id} className={styles.card}>
                            <img src={work.image.url.concat('?fit=fill')} alt="今日のやること" />
                            <div className={styles.cardContents}>
                                <p className={styles.appName}>{work.name}</p>
                                <p className={styles.finishedDate}>{new Date(work.date).toLocaleDateString()}</p>
                                <p className={styles.tag}>#{work.tag}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "works" });

    return {
        props: {
            data: (data.contents).sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
        }
    }
}