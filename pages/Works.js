import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Works.module.css';
import { Pagination } from '../components/Pagination';
import Link from 'next/link';

export default function Works({ data, totalCount }) {
    return (
        <Layout>
            <div className={styles.contents}>
                <h1>Works</h1>
                <div className={styles.cards}>
                    {data.map((work) => (
                        <div key={work.id} className={styles.card}>
                            <Link href={`/Works/${work.id}`}>
                                <a>
                                    <img src={work.image.url.concat('?fit=fill')} alt="イメージ画像" />
                                    <div className={styles.cardContents}>
                                        <p className={styles.appName}>{work.name}</p>
                                        <p className={styles.finishedDate}>{new Date(work.date).toLocaleDateString()}</p>
                                        <p className={styles.tag}>#{work.tag}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                <Pagination totalCount={totalCount} />
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: "works",
        queries: {
            offset: 0,
            limit: 6
        }
    });

    return {
        props: {
            data: data.contents,
            totalCount: data.totalCount
        }
    }
}