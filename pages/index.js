import Top from './Top';
import Layout from '../components/Layout';
import { client } from '../libs/client';

const Home = ({ blogs }) => {
  return (
    <div>
      <Layout>
        <Top blogs={blogs} />
      </Layout>
    </div>
  )
}

export default Home;

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