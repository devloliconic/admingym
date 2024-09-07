import { Button, Space, Table } from "antd";
import { useState } from "react";

import { useClients } from "@/api/queries/clients";
import { Loyout } from "@/components/Loyout/Loyout";
import { CreateClientModal } from "@/components/modals/CreateClientModal/CreateClientModal";

import styles from "./clientsPage.module.scss";
import { useColumns } from "./hooks";
import { AddTicketForClientModal } from "@/components/modals/AddTicketForClientModal/AddTicketForClientModal";

const ClientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const [currentClientId, setCurrentClientId] = useState<number | undefined>(
    undefined
  );
  const { data: clients } = useClients();

  const handleEditClick = (id: number) => {
    setIsModalOpen(true);
    setCurrentClientId(id);
  };

  const handleAddTicketClick = (id: number) => {
    setIsAddTicketModalOpen(true);
    setCurrentClientId(id);
  };

  const { columns } = useColumns(handleEditClick, handleAddTicketClick);

  const handleModalClose = () => {
    setCurrentClientId(undefined);
    setIsModalOpen(false);
  };

  const handleAddTicketModalOpen = () => {
    setCurrentClientId(undefined);
    setIsAddTicketModalOpen(false);
  };

  return (
    <>
      <CreateClientModal
        isOpen={isModalOpen}
        onModalClose={handleModalClose}
        clientId={currentClientId}
      />
      <AddTicketForClientModal
        isOpen={isAddTicketModalOpen}
        onModalClose={handleAddTicketModalOpen}
        clientId={currentClientId}
      />
      <Loyout>
        <header className={styles.header}>
          <h2 className={styles.title}>👨Список клиентов</h2>
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Создать клиента
            </Button>
          </Space>
        </header>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={clients}
            footer={undefined}
            pagination={false}
            rowKey={(record) => record.user_id + record.email}
          />
        </div>
      </Loyout>
    </>
  );
};

export default ClientsPage;
