import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/WorksDetail.module.css";

export default function WorksId({ work }) {
    return (
        <Layout>
            <h1 className={styles.h1}>{work.name}</h1>
            <img className={styles.image} src={work.image.url} alt="イメージ画像" />
            <div className={styles.text}>{work.description}</div>
            <h2 className={styles.h2}>開発のきっかけ</h2>
            <div className={styles.text}>{work.reason}</div>
            <h2 className={styles.h2}>利用技術</h2>
            <div className={styles.text}>{work.tech}</div>
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