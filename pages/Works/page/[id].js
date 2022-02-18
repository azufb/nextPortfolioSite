import Link from "next/link";
import { Pagination } from "../../../components/Pagination";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Works.module.css";
import { client } from "../../../libs/client";

const PER_PAGE = 5;
export default function WorksPageId({ data, totalCount }) {
    return (
        <Layout>
            <div className={styles.contents}>
                <h1>Works</h1>
                <div className={styles.cards}>
                    {data.map((work) => (
                        <div key={work.id} className={styles.card}>
                            <Link href={`/Works/${work.id}`}>
                                <a>
                                    <img src={work.image.url.concat('?fit=fill')} alt="今日のやること" />
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

// 動的なページを作成
export const getStaticPaths = async () => {
    const key = {
        headers: {'X-MICROCMS-API-KEY': process.env.API_KEY},
    };

    const res = await fetch('https://azusa-no-portfolio.microcms.io/api/v1/works', key);
    const repos = await res.json();
    const pageNumbers = [];

    const range = (start, end) => 
        [...Array(end - start + 1)].map((_, i) => start + i)
    const paths = range(1, Math.ceil(repos.totalCount/PER_PAGE)).map((repo) => `/Works/page/${repo}`)

    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({
        endpoint: "works",
        queries: {
            offset: (id-1)*5,
            limit: 5
        }
    });

    return {
        props: {
            data: data.contents,
            totalCount: data.totalCount
        }
    }
}
