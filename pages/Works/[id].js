import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/WorksDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '../../node_modules/@fortawesome/free-brands-svg-icons' 

export default function WorksId({ work }) {
    return (
        <Layout>
            <h1 className={styles.h1}>#{work.name}</h1>
            <div className={styles.dateAndTag}>
                <p>リリース：{new Date(work.date).toLocaleDateString()}</p>
                <p>ジャンル：#{work.tag}</p>
            </div>
            <div className={styles.imgArea}>
                <img className={styles.image} src={work.image.url} alt="イメージ画像" />
            </div>
            <div className={styles.text}>{work.description}</div>
            <h2 className={styles.h2}>##開発のきっかけ</h2>
            <div className={styles.text}>{work.reason}</div>
            <h2 className={styles.h2}>##利用技術</h2>
            <div className={styles.text}>{work.tech}</div>
            <Link href={work.GitHubURL}>
                <a target="_blank" rel="noopener noreferrer"><
                    FontAwesomeIcon icon={faGithub} className={styles.linkIconGitHub} />
                </a>
            </Link>
            <div className={styles.appLink}>
                <Link href={work.appURL}>
                    <a target="_blank" rel="noopener noreferrer">使ってみる！</a>
                </Link>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: 'works' });

    const paths = data.contents.map((work) => `/Works/${work.id}` );
    
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: 'works', contentId: id });

    return {
        props: {
            work: data
        }
    }
}