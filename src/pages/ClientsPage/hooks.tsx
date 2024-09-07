import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Badge, Space, Table } from "antd";

import { Client } from "@/_types/client";
import { useDeleteClient } from "@/api/mutations/deleteCLient";
import { genders } from "@/config/contsants";
import { Ticket } from "@/_types/ticket";

export const useColumns = (
  handleEditClick: (id: number) => void,
  handleAddTicketClick: (id: number) => void
) => {
  const { mutate: deleteClient } = useDeleteClient();
  const queryClient = useQueryClient();

  const handleDeleteClient = (id: string | number) => {
    deleteClient(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["clients"]);
        }
      }
    );
  };

  const ticketTablecolumns = [
    {
      key: "ticketType",
      title: "Тип",
      render: (it: Ticket) => <p>{it.type}</p>
    }
  ];

  const columns = [
    {
      key: "firstName",
      title: "Имя",
      dataIndex: "firstName"
    },
    {
      key: "email",
      title: "Почта",
      dataIndex: "email"
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
      key: "gender",
      title: "Пол",
      render: (it: Client) => {
        return it.gender && <div key={it.gender}>{genders[it?.gender]}</div>;
      }
    },
    {
      key: "hasTicket",
      title: "Статус Абонимента",
      render: (it: Client) =>
        it?.tickets?.length && (
          <Table
            columns={ticketTablecolumns}
            dataSource={it.tickets}
            footer={undefined}
            pagination={false}
          />
        )
    },
    {
      key: "delete",
      title: "",
      render: (it: Client) => (
        <Space>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteClient(it.user_id)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleEditClick(it.user_id)}
          />
          <PlusSquareOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleAddTicketClick(it.user_id)}
          />
        </Space>
      )
    }
  ];

  return { columns };
};
