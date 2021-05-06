import { buildClient } from '../api/build-client';
import '../styles/index.scss';

const AppComponent = ({ Component, pageProps, currentUser }): JSX.Element => {
  return (
    <>
      <div className="header">Header</div>
      <Component />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  //   const client = buildClient(appContext.ctx);
  //   const { data } = await client.get('/api/users/currentuser');

  const pageProps = {};
  //   if (appContext.Component.getInitialProps) {
  //     pageProps = await appContext.Component.getInitialProps(
  //       appContext.ctx,
  //       client,
  //       data.currentUser
  //     );
  //   }

  return {
    pageProps
    // ...data,
  };
};

export default AppComponent;
