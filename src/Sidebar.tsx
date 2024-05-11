import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeFilled, ContactsOutlined } from "@ant-design/icons";
import './styles/Dashboard.css'
const Sidebar: React.FC = () => {
  const [activeKey, setActiveKey] = useState("");
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    setActiveKey(pathSegments[pathSegments.length - 1]);
  }, [location.pathname]);

  return (
    <div style={{ marginTop: '110px' }}>
      <Menu id="side" mode="inline" selectedKeys={[activeKey]}>
        <Menu.Item
          id="menu"
          key="jobdetails"
          icon={<HomeFilled />}
          className={activeKey === 'jobdetails' || activeKey === 'applyjobs' ? "active" : ""}
        >
          <Link to="/jobdetails">Job Details</Link>
        </Menu.Item>
        <Menu.Item
          id="menu"
          key="applicationdetails"
          icon={<ContactsOutlined />}
          className={activeKey === "applicationdetails" ? "active" : ""}
        >
          <Link to="/applicationdetails">Application Details</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
