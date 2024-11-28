import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import './index.less';

const { Content } = Layout;

const PATH_KEYS: Record<string, string> = {
  '/': '我的笔记',
  '/label': '标签管理',
  '/note/:id': '笔记详情'
}

const LayoutMain = () => {

  const { pathname } = useLocation();

  return (
    <Content className='layouts-main-container'>
      <Breadcrumb
        style={{ margin: '16px', color: '#91caff' }}
        items={
          [
            {
              title: PATH_KEYS?.[pathname]
            }
          ]
        }
      >
      </Breadcrumb>
      <Outlet />
    </Content>
  )
}

export default LayoutMain;