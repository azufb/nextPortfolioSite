import Layout from "../../components/Layout";
import { client } from "../../libs/client";

export default function WorksId({ work }) {
    return (
        <Layout>
            <h1>{work.name}</h1>
            <div>{work.description}</div>
            <div>{work.reason}</div>
            <div>{work.tech}</div>
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