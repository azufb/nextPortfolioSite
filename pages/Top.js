import styles from "../styles/Top.module.css";
import Link from "next/link";
import { client } from '../libs/client';

export default function Top({ blogs }) {
    return (
        <div className={styles.contents}>
            <h1 className={styles.h1}>#NEWS</h1>
            {blogs.length === 0 ?
                (
                    <p>現在、新着Newsはありません。</p>
                ) :
                (
                    <div className={styles.newsList}>
                        {blogs.map((blog) => (
                            <div key={blog.id} className={styles.news}>
                                <Link href={`/Blog/${blog.id}`}>
                                    <a>
                                        <div className={styles.newsContents}>
                                            <p className={styles.title}>{blog.title}</p>
                                            <p className={styles.publishedDate}>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                        <p className={styles.linkToBlogList}>
                            <Link href={`/Blog/`}>
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
                    こちらは、Azuのポートフォリオサイトです！<br />
                    個人開発で開発したものや私自身の経歴を掲載しております。
                </p>
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: "blog",
        queries: {
            offset: 0,
            limit: 3
        }
    });

    return {
        props: {
            blogs: data.contents
        }
    }
}