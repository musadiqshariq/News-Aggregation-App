import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useWindowDimensions } from "../../helpers";

export const Header = () => {
  const navigate = useNavigate();
  const dimensions = useWindowDimensions();
  const pages = [
    { label: "News Feed", path: "/" },
    { label: "The Guardian", path: "/guardian" },
    { label: "The New York Times", path: "/newyork-times" },
  ];
  const items = [
    {
      label: "News Feed",
      key: "0",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: "Guardian",
      key: "1",
      onClick: () => {
        navigate("/guardian");
      },
    },
    {
      label: "The New York Times",
      key: "2",
      onClick: () => {
        navigate("/newyork-times");
      },
    },
  ];
  return (
    <div className="w-full flex h-10 backgroundLinearHeader border-b sticky top-0">
      <div className="px-2 flex items-center border-r">
        <p className="text-2xl text-orange-950">News App</p>
      </div>
      {dimensions.width > 900 ? (
        <div className="flex ml-10 items-center">
          {pages.map((v, i) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#000] h-10 flex items-center mr-10"
                    : "h-10 flex items-center mr-10"
                }
                key={i}
                to={v.path}
              >
                <p>{v.label}</p>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <Dropdown
          className="mx-5"
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Space className="cursor-pointer">
            <MenuOutlined />
          </Space>
        </Dropdown>
      )}
    </div>
  );
};
