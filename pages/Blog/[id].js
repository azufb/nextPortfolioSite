import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/WorksDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '../../node_modules/@fortawesome/free-brands-svg-icons' 

export default function BlogId({ blog }) {
    return (
        <Layout>
            <h1 className={styles.h1}>#{blog.title}</h1>
            <div className={styles.dateAndTag}>
                <p>リリース：{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <div className={styles.text}>{blog.contents}</div>
            <div>
                {(blog.GitHubURL) ? 
                    <Link href={blog.GitHubURL}>
                        <a target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} />
                        </a>
                    </Link> :
                    
                        (blog.ZennURL) ? 
                            <div className={styles.appLink}>
                                <Link href={blog.ZennURL}>
                                    <a target="_blank" rel="noopener noreferrer">使ってみる！</a>
                                </Link>
                            </div> :
                            
                                (blog.url) ?
                                    <Link href={blog.url}>
                                        <a target="_blank" rel="noopener noreferrer">
                                            遷移する。
                                        </a>
                                    </Link>
                            : 
                            (
                                <></>
                            )
                    
                }
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'blog' });

    const paths = data.contents.map((blog) => `/Blog/${blog.id}` );
    
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: 'blog', contentId: id });

    return {
        props: {
            blog: data
        }
    }
}