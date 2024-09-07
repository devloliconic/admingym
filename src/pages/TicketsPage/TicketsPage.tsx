import { Button, Space, Table } from "antd";
import { useState } from "react";

import { useTickets } from "@/api/queries/tickets";
import { Loyout } from "@/components/Loyout/Loyout";
import { CreateTicketModal } from "@/components/modals/CreateTicketModal/CreateTicketModal";

import { useColumns } from "./hooks";
import styles from "./ticketsPage.module.scss";

const TicketsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState<number | undefined>(
    undefined
  );

  const handleEditClick = (id: number) => {
    setIsModalOpen(true);
    setCurrentTicketId(id);
  };

  const { columns } = useColumns(handleEditClick);

  const { data: clients } = useTickets();

  const handleModalClose = () => {
    setCurrentTicketId(undefined);
    setIsModalOpen(false);
  };
  return (
    <>
      <CreateTicketModal
        isOpen={isModalOpen}
        onModalClose={handleModalClose}
        ticketId={currentTicketId}
      />
      <Loyout>
        <header className={styles.header}>
          <h2 className={styles.title}>📃Список абонементов</h2>
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Создать абонемент
            </Button>
          </Space>
        </header>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={clients}
            footer={undefined}
            pagination={false}
            rowKey={(record) => record.ticket_id + record.type}
          />
        </div>
      </Loyout>
    </>
  );
};

export default TicketsPage;
