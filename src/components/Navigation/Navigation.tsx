import { CloseOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, MenuProps } from "antd";
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useGetMe } from "@/api/queries/me";

import styles from "./navigation.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

export const Navigation = () => {
  const { data: userInformation } = useGetMe();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  const handleExitClick = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["me"], exact: true });
    queryClient.clear();
    navigate("/login");
  };

  const items: MenuProps["items"] = useMemo(
    () => [
      getMenuItem("🏋️‍♂️Залы", "/"),
      getMenuItem("👨Клиенты", "/clients"),
      getMenuItem("📃Абонементы", "/tickets"),
      getMenuItem("🥋Тренера", "/coaches"),
      getMenuItem("🤼Тренировки", "/workouts")
    ],
    []
  );

  const handleMenuItemClick: MenuProps["onClick"] = (e) => {
    navigate(`${e.key}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>🔥💪🏼Gym Manager</div>
      <Menu
        items={items}
        className={styles.menu}
        onClick={handleMenuItemClick}
        selectedKeys={[pathname]}
      />
      <button className={styles.exit} onClick={handleExitClick}>
        {userInformation?.login} <CloseOutlined />
      </button>
    </div>
  );
};
