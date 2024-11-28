import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import './index.less';

const { Header } = Layout;

const items = [
  {
    key: '/',
    label: '我的笔记',
  },
  {
    key: '/label',
    label: '标签管理',
  }
]

const LayoutHeader = () => {

  const { pathname} = useLocation();

  const navigate = useNavigate();

  return (
    <Header className="layouts-header-container">
      <Menu
        className='header-menu-container'
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        items={items}
        onClick={e => navigate(e.key)}
      />
    </Header>
  )
}

export default LayoutHeader;