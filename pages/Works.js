import Layout from '../components/Layout';
//import { client } from '../libs/client';
import styles from '../styles/Works.module.css';
import { Pagination } from '../components/Pagination';

export default function Works({ data, totalCount }) {
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
                <Pagination totalCount={totalCount} />
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    //const data = await client.get({ endpoint: "works" });
    const key = {
        headers: {'X-MICROCMS-API-KEY': process.env.API_KEY},
      };
      const data = await fetch('https://azusa-no-portfolio.microcms.io/api/v1/works?offset=0&limit=5', key)
        .then(res => res.json())
        .catch(() => null);

    return {
        props: {
            data: (data.contents).sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            }),
            totalCount: data.totalCount
        }
    }
}