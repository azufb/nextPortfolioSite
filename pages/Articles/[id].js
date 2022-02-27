import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/BlogDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { formatDate } from "../../libs/dateFormat";

const articleId = ({ article }) => {
    return (
        <Layout>
            <h1 className={styles.h1}>#{article.title}</h1>
            <div className={styles.dateAndTag}>
                <p>リリース：{formatDate(article.publishedAt)}</p>
            </div>
            <div className={styles.contents}>{article.contents}</div>
            <div>
                {(article.GitHubURL) ? 
                    <Link href={article.GitHubURL}>
                        <a target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} />
                        </a>
                    </Link> :
                    
                        (article.ZennURL) ? 
                            <div className={styles.zennLink}>
                                <Link href={article.ZennURL}>
                                    <a target="_blank" rel="noopener noreferrer">Zennで記事を読んでみる</a>
                                </Link>
                            </div> :
                            
                                (article.QiitaURL) ?
                                <div className={styles.qiitaLink}>
                                    <Link href={article.QiitaURL}>
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

export default articleId;

export const getStaticPaths = async () => {
    const articles = await client.get({ endpoint: process.env.ENDPOINT_ARTICLES });

    const paths = articles.contents.map((article) => `/Articles/${article.id}` );
    
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: process.env.ENDPOINT_ARTICLES, contentId: id });

    return {
        props: {
            article: data
        }
    }
}