import styles from "../styles/Top.module.css";
import Link from "next/link";
import { client } from '../libs/client';

export default function Top({ blogs }) {
    return (
        <div className={styles.contents}>
            {blogs.map((blog) => (
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
            <h1>Welcome</h1>
            <div>
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