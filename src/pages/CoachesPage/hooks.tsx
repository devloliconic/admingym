import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Space } from "antd";

import { Coach } from "@/_types/coach";
import { useDeleteCoach } from "@/api/mutations/deleteCoach";

export const useColumns = (handleEditClick: (id: number) => void) => {
  const { mutate: deleteCoach } = useDeleteCoach();
  const queryClient = useQueryClient();

  const handleDeleteCoach = (id: string | number) => {
    deleteCoach(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["coaches"]);
        }
      }
    );
  };

  const columns = [
    {
      key: "firstName",
      title: "Имя",
      dataIndex: "firstName"
    },
    {
      key: "lastName",
      title: "Фамилия",
      dataIndex: "lastName"
    },
    {
      key: "middleName",
      title: "Отчество",
      dataIndex: "middleName"
    },
    {
      key: "coast",
      title: "Ставка(руб в час)",
      dataIndex: "coast"
    },
    {
      key: "gym",
      title: "Зал",
      render: (record: Coach) => record.gym.name
    },
    {
      key: "delete",
      title: "",
      width: "6%",
      render: (it: Coach) => (
        <Space>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCoach(it.coach_id);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              handleEditClick(it.coach_id);
            }}
          />
        </Space>
      )
    }
  ];

  return { columns };
};
