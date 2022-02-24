import Top from './Top';
import Layout from '../components/Layout';
import { client } from '../libs/client';

const Home = ({ articles }) => {
  return (
    <div>
      <Layout>
        <Top articles={articles} />
      </Layout>
    </div>
  )
}

export default Home;

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