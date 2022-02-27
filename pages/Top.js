import styles from "../styles/Top.module.css";
import Link from "next/link";
import { client } from '../libs/client';
import { formatDate } from '../libs/dateFormat';

const Top = ({ articles }) => {
    return (
        <div className={styles.contents}>
            <h1 className={styles.h1}>#NEWS</h1>
            {articles.length === 0 ?
                (
                    <p>現在、新着Newsはありません。</p>
                ) :
                (
                    <div className={styles.newsList}>
                        {articles.map((article) => (
                            <div key={article.id} className={styles.news}>
                                <Link href={`/Articles/${article.id}`}>
                                    <a>
                                        <div className={styles.newsContents}>
                                            <p className={styles.title}>{article.title}</p>
                                            <p className={styles.publishedDate}>{formatDate(article.publishedAt)}</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                        <p className={styles.linkToBlogList}>
                            <Link href={`/Articles/`}>
                                <a>全てのニュースを確認する＞</a>
                            </Link>
                        </p>
                    </div>
                )
            }

            <h1 className={styles.h1}>#WELCOME</h1>
            <div className={styles.messages}>
                <p>
                    ご来訪頂き、ありがとうございます！<br />
                    こちらは、Azuのポートフォリオサイトです。<br />
                    個人開発で開発したものや私自身の経歴を掲載しております。<br />
                    <br />
                    まだまだ未熟ですが、個人開発やお仕事を通して成長していきます！
                </p>
            </div>
        </div>
    )
}

export default Top;

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: process.env.ENDPOINT_ARTICLES,
        queries: {
            offset: 0,
            limit: 3
        }
    });

    return {
        props: {
            articles: data.contents
        }
    }
}