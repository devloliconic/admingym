import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Space, Spin } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDeleteEquipment } from "@/api/mutations/deleteEquipment";
import { useDeleteOthers } from "@/api/mutations/deleteOthers";
import { useGym } from "@/api/queries/gym";
import { Loyout } from "@/components/Loyout/Loyout";
import { AddEquipmentForGymModal } from "@/components/modals/AddEquipmentForGymModal/AddEquipmentForGymModal";
import { AddOthersForGymModal } from "@/components/modals/AddOthersForGymModal/AddOthersForGymModal";
import { CreateGymModal } from "@/components/modals/CreateGymModal/CreateGymModal";

import { EquipmentCard } from "./components/EquipmentCard/EquipmentCard";
import styles from "./gymPage.module.scss";

const GymPage = () => {
  const { id: gymId } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEquipmentModalOpen, setIsAddEquipmentModalOpen] = useState(false);
  const [isAddOthersModalOpen, setIsAddOthersModalOpen] = useState(false);
  const [currentOthersId, setCurrentOthersId] = useState<number | undefined>(
    undefined
  );
  const [currentEquipmentId, setCurrentEquipmentId] = useState<
    number | undefined
  >();

  const { data: gymData, isLoading, isError } = useGym(gymId || "");
  const { mutate: deleteEquipment } = useDeleteEquipment();
  const { mutate: deleteOthers } = useDeleteOthers();
  const queryClient = useQueryClient();

  const handleAddEquipmentModalClose = () => {
    setCurrentEquipmentId(undefined);
    setIsAddEquipmentModalOpen(false);
  };

  const handleEquipmentEditClick = (id: number) => {
    setCurrentEquipmentId(id);
    setIsAddEquipmentModalOpen(true);
  };

  const handleOthersEditClick = (id: number) => {
    setCurrentOthersId(id);
    setIsAddOthersModalOpen(true);
  };

  const handleOthersModalOpen = () => {
    setCurrentOthersId(undefined);
    setIsAddOthersModalOpen(false);
  };

  const handleEquipmentDeleteClick = (id: number) => {
    if (gymId && id) {
      deleteEquipment(
        { gymId: gymId, equipmentId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["gym", gymId]);
          }
        }
      );
    }
  };

  const handleOthersDeleteClick = (id: number) => {
    if (gymId && id) {
      deleteOthers(
        { gymId: gymId, othersId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["gym", gymId]);
          }
        }
      );
    }
  };

  if (isLoading) {
    return (
      <Loyout>
        <Spin />
      </Loyout>
    );
  }

  if (isError) {
    return (
      <Loyout>
        404 <Button onClick={() => navigate("/")}>Вернуться назад</Button>
      </Loyout>
    );
  }

  return (
    <>
      {gymId && (
        <CreateGymModal
          isOpen={isModalOpen}
          gymId={gymId}
          onModalClose={() => setIsModalOpen(false)}
        />
      )}
      {gymId && (
        <AddEquipmentForGymModal
          isOpen={isAddEquipmentModalOpen}
          equipmentId={currentEquipmentId}
          onModalClose={handleAddEquipmentModalClose}
          gymId={gymId}
        />
      )}
      {gymId && (
        <AddOthersForGymModal
          isOpen={isAddOthersModalOpen}
          othersId={currentOthersId}
          onModalClose={handleOthersModalOpen}
          gymId={gymId}
        />
      )}
      <Loyout>
        <div className={styles.container}>
          <Card title={gymData?.name}>
            <Space>
              <Button onClick={() => setIsModalOpen(true)}>
                Редактировать информацию
              </Button>
              <Button onClick={() => setIsAddEquipmentModalOpen(true)}>
                Добавить спортивное оборудование
              </Button>
              <Button onClick={() => setIsAddOthersModalOpen(true)}>
                Добавить расходник
              </Button>
            </Space>
            <div>
              <Space>
                <p className={styles.itemTitle}>🐸Вместимость</p>
                <span className={styles.itemValue}>{gymData?.сapacity}</span>
              </Space>
            </div>
            <div>
              <Space>
                <p className={styles.itemTitle}>📬Адрес</p>
                <span className={styles.itemValue}>
                  {gymData?.address.address}
                </span>
              </Space>
            </div>
            <div>
              <Space>
                <p className={styles.itemTitle}>📧E-mail</p>
                <span className={styles.itemValue}>
                  {gymData?.contact.email}
                </span>
              </Space>
            </div>
            <div>
              <Space>
                <p className={styles.itemTitle}>📞Номер телефона</p>
                <span className={styles.itemValue}>
                  {gymData?.contact.phoneNumber}
                </span>
              </Space>
            </div>
            {gymData?.equipment?.length > 0 && (
              <Card
                className={styles.equipment}
                title="Спортивное оборудование"
              >
                <div className={styles.equipmentBox}>
                  {gymData?.equipment.map((it) => (
                    <EquipmentCard
                      id={it.equipment_id}
                      name={it.name}
                      onEditClick={handleEquipmentEditClick}
                      onDeleteClick={handleEquipmentDeleteClick}
                    />
                  ))}
                </div>
              </Card>
            )}
            {gymData?.others?.length > 0 && (
              <Card className={styles.equipment} title="Расходники">
                <div className={styles.equipmentBox}>
                  {gymData?.others.map((it) => (
                    <EquipmentCard
                      id={it.others_id}
                      name={it.name}
                      onEditClick={handleOthersEditClick}
                      onDeleteClick={handleOthersDeleteClick}
                    />
                  ))}
                </div>
              </Card>
            )}
          </Card>
        </div>
      </Loyout>
    </>
  );
};

export default GymPage;
