import { Button, Space, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCoaches } from "@/api/queries/coaches";
import { Loyout } from "@/components/Loyout/Loyout";
import { CreateCoachModal } from "@/components/modals/CreateCoachModal/CreateCoachModal";

import styles from "./coachesPage.module.scss";
import { useColumns } from "./hooks";

const CoachesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCoachId, setCurrentCoachId] = useState<number | undefined>(
    undefined
  );

  const handleEditClick = (id: number) => {
    setIsModalOpen(true);
    setCurrentCoachId(id);
  };

  const { columns } = useColumns(handleEditClick);
  const navigate = useNavigate();

  const { data: coaches } = useCoaches();

  const handleModalClose = () => {
    setCurrentCoachId(undefined);
    setIsModalOpen(false);
  };
  return (
    <>
      <CreateCoachModal
        isOpen={isModalOpen}
        onModalClose={handleModalClose}
        coachId={currentCoachId}
      />
      <Loyout>
        <header className={styles.header}>
          <h2 className={styles.title}>🥋Список тренеров</h2>
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Создать тренера
            </Button>
          </Space>
        </header>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={coaches}
            footer={undefined}
            pagination={false}
            onRow={(data) => {
              return {
                onClick: (e) => {
                  navigate(`/coach/${data.coach_id}`);
                  e.preventDefault();
                }
              };
            }}
            rowKey={(record) => record.coach_id + record.coach_id}
          />
        </div>
      </Loyout>
    </>
  );
};

export default CoachesPage;
