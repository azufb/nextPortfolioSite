import Link from "next/link";
import { Pagination } from "../../../components/BlogPagination";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Blog.module.css";
import { client } from "../../../libs/client";

const PER_PAGE = 6;

export default function BlogPageId({ data, totalCount }) {
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

// 動的なページを作成
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
    const paths = range(1, Math.ceil(data.totalCount/PER_PAGE)).map((blog) => `/Blog/page/${blog}`)

    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({
        endpoint: "blog",
        queries: {
            offset: (id-1)*6,
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
