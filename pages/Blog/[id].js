import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/BlogDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '../../node_modules/@fortawesome/free-brands-svg-icons';
import { formatDate } from "../../libs/dateFormat";

const BlogId = ({ blog }) => {
    return (
        <Layout>
            <h1 className={styles.h1}>#{blog.title}</h1>
            <div className={styles.dateAndTag}>
                <p>リリース：{formatDate(blog.publishedAt)}</p>
            </div>
            <div className={styles.contents}>{blog.contents}</div>
            <div>
                {(blog.GitHubURL) ? 
                    <Link href={blog.GitHubURL}>
                        <a target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} />
                        </a>
                    </Link> :
                    
                        (blog.ZennURL) ? 
                            <div className={styles.zennLink}>
                                <Link href={blog.ZennURL}>
                                    <a target="_blank" rel="noopener noreferrer">Zennで記事を読んでみる</a>
                                </Link>
                            </div> :
                            
                                (blog.QiitaURL) ?
                                <div className={styles.qiitaLink}>
                                    <Link href={blog.QiitaURL}>
                                        <a target="_blank" rel="noopener noreferrer">
                                        Qiitaで記事を読んでみる
                                        </a>
                                    </Link>
                                </div> : 
                                
                                (<></>)
                    
                }
            </div>
        </Layout>
    )
}

export default BlogId;

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