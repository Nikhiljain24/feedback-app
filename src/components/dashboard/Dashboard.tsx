import { useState } from "react";
import { Layout, Menu, Button, Space, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BulbOutlined,
  FieldTimeOutlined,
  ApiOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();
  const navigate = useNavigate();
  const feedbackCount = useSelector((state: any) => state.counter.totalFeedback);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    message.info('Logged out');
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/feedback',
      icon: <BulbOutlined />,
      label: <Link to="/feedback">Feedback Feed</Link>,
    },
    {
      key: '/stopwatch',
      icon: <FieldTimeOutlined />,
      label: <Link to="/stopwatch">Stopwatch</Link>,
    },
    {
      key: '/fetchapi',
      icon: <ApiOutlined />,
      label: <Link to="/fetchapi">Fetch API</Link>,
    },
    {
      key: '/counter',
      icon: <ApiOutlined />,
      label: `Counter (${feedbackCount})`,
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          FeedbackApp
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/feedback' : location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          boxShadow: '0 2px 8px #f0f1f2',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%'
        }}>
          <Space>
            {isLoggedIn && (
              <Button icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
            )}
          </Space>
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, borderRadius: 8 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
