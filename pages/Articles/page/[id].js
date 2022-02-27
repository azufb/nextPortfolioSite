import Link from "next/link";
import { Pagination } from "../../../components/ArticlesPagination";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Blog.module.css";
import { client } from "../../../libs/client";
import { formatDate } from "../../../libs/dateFormat";

const ArticlesPageId = ({ articles, totalCount }) => {
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

export default ArticlesPageId;

// 動的なページを作成
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: process.env.ENDPOINT_ARTICLES });

    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
    const paths = range(1, Math.ceil(data.totalCount/process.env.NEXT_PUBLIC_PER_PAGE)).map((article) => `/Articles/page/${article}`)

    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({
        endpoint: process.env.ENDPOINT_ARTICLES,
        queries: {
            offset: (id-1)*6,
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
