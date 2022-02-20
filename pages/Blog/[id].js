import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import styles from "../../styles/WorksDetail.module.css";

export default function BlogId({ blog }) {
    return (
        <Layout>
            <h1 className={styles.h1}>#{blog.title}</h1>
            <div className={styles.dateAndTag}>
                <p>リリース：{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <div className={styles.text}>{blog.contents}</div>
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