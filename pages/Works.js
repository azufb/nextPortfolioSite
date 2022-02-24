import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Works.module.css';
import { Pagination } from '../components/Pagination';
import Link from 'next/link';
import { formatDate } from '../libs/dateFormat.js';

const Works = ({ data, totalCount }) => {
    return (
        <Layout>
            <h1 className={styles.h1}>#WORKS</h1>
            <p className={styles.pageDescription}>
                各アプリケーションをクリックすると、詳細ページに遷移します。
            </p>
            <div className={styles.cards}>
                {data.map((work) => (
                    <div key={work.id} className={styles.card}>
                        <Link href={`/Works/${work.id}`}>
                            <a>
                                <img src={work.image.url.concat('?fit=fill')} alt="イメージ画像" />
                                <div className={styles.cardContents}>
                                    <p className={styles.appName}>{work.name}</p>
                                    <p className={styles.finishedDate}>{formatDate(work.date)}</p>
                                    <p className={styles.tag}>#{work.tag}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination totalCount={totalCount} />
        </Layout>
    )
}

export default Works;

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: process.env.ENDPOINT_WORKS,
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