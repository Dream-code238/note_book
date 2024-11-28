import React from 'react';
import { Layout } from 'antd';

import LayoutHeader from './components/LayoutHeader';
import LayoutMain from './components/LayoutMain';

import './index.less';

const Layouts: React.FC = () => {

  return (
    <Layout className='layouts-page-container'>
      <LayoutHeader />
      <LayoutMain />
    </Layout>
  );

}


export default Layouts;
