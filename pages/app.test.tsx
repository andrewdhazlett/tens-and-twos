import {NextComponentType, NextPageContext} from 'next';
import App from './_app';
import React from 'react';
import {Router} from 'next/dist/client/router';
import {mount} from 'enzyme';

describe('App', () => {
  it('should render without throwing an error', () => {
    const component: NextComponentType<NextPageContext, {}, {}> = () => (
      <div></div>
    );
    const pageProps = {};
    const router: Partial<Router> = {};

    const wrap = mount(
      <App
        Component={component}
        pageProps={pageProps}
        router={router as Router}
      />
    );
    console.dir({wrap});
  });
});
