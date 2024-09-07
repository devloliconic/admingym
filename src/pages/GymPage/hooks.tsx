import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Space } from "antd";

import { Gym } from "@/_types/gym";
import { useDeleteGym } from "@/api/mutations/deleteGym";

export const useColumns = (handleEditClick: (id: number) => void) => {
  const { mutate: deleteGym } = useDeleteGym();
  const queryClient = useQueryClient();

  const handleDeleteGym = (id: string | number) => {
    deleteGym(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["gyms"]);
        }
      }
    );
  };

  const columns = [
    {
      key: "name",
      title: "Название",
      dataIndex: "name"
    },
    {
      key: "сapacity",
      title: "Вместимость",
      dataIndex: "сapacity"
    },
    {
      key: "address",
      title: "Адрес",
      render: (it: Gym) => (
        <div key={it.address.address_id}>{it.address.address}</div>
      )
    },
    {
      key: "phoneNumber",
      title: "Номер телефона",
      render: (it: Gym) => it.contact.phoneNumber
    },
    {
      key: "email",
      title: "Почта",
      render: (it: Gym) => (
        <div key={it.contact.contact_id}>{it.contact.email}</div>
      )
    },
    {
      key: "delete",
      title: "",
      render: (it: Gym) => (
        <Space>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteGym(it.gym_id)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleEditClick(it.gym_id)}
          />
        </Space>
      )
    }
  ];

  return { columns };
};
