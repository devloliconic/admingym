import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Space } from "antd";

import { Ticket } from "@/_types/ticket";
import { useDeleteTicket } from "@/api/mutations/deleteTicket";

export const useColumns = (handleEditClick: (id: number) => void) => {
  const { mutate: deleteClient } = useDeleteTicket();
  const queryClient = useQueryClient();

  const handleDeleteTicket = (id: string | number) => {
    deleteClient(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["tickets"]);
        }
      }
    );
  };

  const columns = [
    {
      key: "type",
      title: "Тип",
      dataIndex: "type"
    },
    {
      key: "price",
      title: "Цена",
      dataIndex: "price"
    },
    {
      key: "period",
      title: "Период",
      dataIndex: "period"
    },
    {
      key: "delete",
      title: "",
      width: "6%",
      render: (it: Ticket) => (
        <Space>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteTicket(it.ticket_id)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleEditClick(it.ticket_id)}
          />
        </Space>
      )
    }
  ];

  return { columns };
};
