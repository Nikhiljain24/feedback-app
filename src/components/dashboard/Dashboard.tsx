// src/components/Dashboard.tsx

import { Layout, Menu } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import StopWatch from "../stopWatch/StopWatch";
import FetchData from "../fetchData/FetchData";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/stopwatch">Stopwatch</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/fetchapi">Fetch Data</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/stopwatch">Stopwatch</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/fetchapi">Fetch Data</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
           <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
