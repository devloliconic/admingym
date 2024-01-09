import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";

import styles from "./EquipmentCard.module.scss";

interface Props {
  id: number;
  name: string;
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number) => void;
}

export const EquipmentCard = ({
  id,
  name,
  onDeleteClick,
  onEditClick
}: Props) => {
  return (
    <div className={styles.card}>
      <Space>
        <p>{name}</p>
        <EditOutlined
          style={{ cursor: "pointer" }}
          onClick={() => onEditClick(id)}
        />
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => onDeleteClick(id)}
        />
      </Space>
    </div>
  );
};
