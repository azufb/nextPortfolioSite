import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Blog.module.css';
import { ArticlesPagination } from '../components/ArticlesPagination';
import Link from 'next/link';
import { formatDate } from '../libs/dateFormat';

const Blog = ({ data, totalCount }) => {

    return (
        <Layout>
            <h1 className={styles.h1}>#BLOG</h1>
            {data.length === 0 ? 
                (
                    <p>コンテンツがまだ投稿されていません。</p>
                ) :
                (
                    <div className={styles.cards}>
                        {data.map((blog) => (
                            <div key={blog.id} className={styles.card}>
                                <Link href={`/Articles/${blog.id}`}>
                                    <a>
                                        <div className={styles.cardContents}>
                                            <p className={styles.title}>{blog.title}</p>
                                            <p className={styles.publishedDate}>{formatDate(blog.publishedAt)}</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
                }
            <ArticlesPagination totalCount={totalCount} />
        </Layout>
    )
}

export default Blog;

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: process.env.ENDPOINT_BLOG,
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