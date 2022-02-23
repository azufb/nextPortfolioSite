import Layout from '../components/Layout';
import { client } from '../libs/client';
import styles from '../styles/Blog.module.css';
import { Pagination } from '../components/BlogPagination';
import Link from 'next/link';

export default function Blog({ data, totalCount }) {
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
                                <Link href={`/Blog/${blog.id}`}>
                                    <a>
                                        <div className={styles.cardContents}>
                                            <p className={styles.title}>{blog.title}</p>
                                            <p className={styles.publishedDate}>{new Date(blog.publishedAt).toLocaleDateString()}</p>
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

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: "blog",
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