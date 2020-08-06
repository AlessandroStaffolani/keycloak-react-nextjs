import Layout from "../components/Layout";
import { Icon, Button, Segment, Header } from "semantic-ui-react";
import Router from 'next/router'

function Error({ statusCode }) {
  let message =
    statusCode === 404 ? "This page could not be found." : "An error occured";
  return (
    <Layout title={`Error ${statusCode}`}>
      <div style={{ paddingTop: '120px' }}>
        <Segment inverted secondary color='red' placeholder padded='very'>
          <Header icon>
            <Icon name='exclamation triangle' />
            Error {statusCode}
          </Header>
          <p className='text-center'>{message}</p>
          <Button secondary onClick={() => Router.back()}>Go to previous page</Button>
        </Segment>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
