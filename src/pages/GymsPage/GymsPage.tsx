import { Button, Space, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGyms } from "@/api/queries/gyms";
import { Loyout } from "@/components/Loyout/Loyout";
import { CreateGymModal } from "@/components/modals/CreateGymModal/CreateGymModal";

import styles from "./gymsPage.module.scss";
import { useColumns } from "./hooks";

const GymsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGymId, setCurrentGymId] = useState<number | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const handleEditClick = (id: number) => {
    setIsModalOpen(true);
    setCurrentGymId(id);
  };

  const { columns } = useColumns(handleEditClick);

  const { data: gyms } = useGyms();

  const handleModalClose = () => {
    setCurrentGymId(undefined);
    setIsModalOpen(false);
  };
  return (
    <>
      <CreateGymModal
        isOpen={isModalOpen}
        onModalClose={handleModalClose}
        gymId={currentGymId}
      />
      <Loyout>
        <header className={styles.header}>
          <h2 className={styles.title}>🏋️‍♂️Список залов</h2>
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Создать зал
            </Button>
          </Space>
        </header>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={gyms}
            footer={undefined}
            pagination={false}
            onRow={(data) => {
              return {
                onClick: () => {
                  navigate(`/gym/${data.gym_id}`);
                }
              };
            }}
            rowKey={(record) => record.gym_id + record.address_id}
          />
        </div>
      </Loyout>
    </>
  );
};

export default GymsPage;
