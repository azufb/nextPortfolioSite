import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Blog.module.css';
import { Pagination } from '../components/ArticlesPagination';
import Link from 'next/link';
import { formatDate } from '../libs/dateFormat';

const Articles = ({ articles, totalCount }) => {

    return (
        <Layout>
            <h1 className={styles.h1}>#ARTICLES</h1>
            {articles.length === 0 ? 
                (
                    <p>コンテンツがまだ投稿されていません。</p>
                ) :
                (
                    <div className={styles.cards}>
                        {articles.map((article) => (
                            <div key={article.id} className={styles.card}>
                                <Link href={`/Articles/${article.id}`}>
                                    <a>
                                        <div className={styles.cardContents}>
                                            <p className={styles.title}>{article.title}</p>
                                            <p className={styles.publishedDate}>{formatDate(article.publishedAt)}</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
                }
            <Pagination totalCount={totalCount} />
        </Layout>
    )
}

export default Articles;

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: process.env.ENDPOINT_ARTICLES,
        queries: {
            offset: 0,
            limit: 6
        }
    });

    return {
        props: {
            articles: data.contents,
            totalCount: data.totalCount
        }
    }
}