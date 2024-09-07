import { Button, Space, Table } from "antd";
import { useState } from "react";

import { useWorkouts } from "@/api/queries/workouts";
import { Loyout } from "@/components/Loyout/Loyout";
import { CreateWorkoutModal } from "@/components/modals/CreateWorkoutModal/CreateWorkoutModal";

import { useColumns } from "./hooks";
import styles from "./workoutsPage.module.scss";

const WorkoutsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState<number | undefined>(
    undefined
  );

  const handleEditClick = (id: number) => {
    setIsModalOpen(true);
    setCurrentWorkoutId(id);
  };

  const { columns } = useColumns(handleEditClick);

  const { data: clients } = useWorkouts();

  const handleModalClose = () => {
    setCurrentWorkoutId(undefined);
    setIsModalOpen(false);
  };
  return (
    <>
      <CreateWorkoutModal
        isOpen={isModalOpen}
        onModalClose={handleModalClose}
        workoutId={currentWorkoutId}
      />
      <Loyout>
        <header className={styles.header}>
          <h2 className={styles.title}>🤼 Список тренировок</h2>
          <Space>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Создать тренировку
            </Button>
          </Space>
        </header>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={clients}
            footer={undefined}
            pagination={false}
            rowKey={(record) =>
              record.workout_id + record.coach_id + record.client_id
            }
          />
        </div>
      </Loyout>
    </>
  );
};

export default WorkoutsPage;
