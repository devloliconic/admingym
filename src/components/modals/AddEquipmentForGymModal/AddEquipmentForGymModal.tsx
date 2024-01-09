import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateEquipment } from "@/api/mutations/createEquipment";
import { useUpdateEquipment } from "@/api/mutations/updateEquipment";
import { useEqupment } from "@/api/queries/equipment";

import styles from "./AddEquipmentForGymModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  gymId: number | string;
  equipmentId?: number;
}

interface FormValues {
  name: string;
}

export const AddEquipmentForGymModal = ({
  isOpen,
  onModalClose,
  gymId,
  equipmentId
}: Props) => {
  const { data: equipmentData } = useEqupment(gymId, equipmentId);

  const defaultValues = useMemo(
    () => ({
      name: equipmentData?.name
    }),
    [equipmentData?.name]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues: defaultValues });

  const { mutate: createEquipment } = useCreateEquipment();
  const { mutate: updateEquipment } = useUpdateEquipment();

  const queryClient = useQueryClient();

  const onSubmit = (data: FormValues) => {
    const { name } = data;
    if (equipmentId) {
      updateEquipment(
        { name: name, gymId: gymId, equipmentId: equipmentId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["gym", gymId]);
            reset();
            onModalClose();
          }
        }
      );
      return;
    }
    createEquipment(
      { name: name, gymId: gymId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["gym", gymId]);
          reset();
          onModalClose();
        }
      }
    );
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Modal
      open={isOpen}
      onCancel={onModalClose}
      title={
        equipmentId
          ? "Редактировать информацию спортивном оборудовании"
          : "Добавить спортивное оборудование"
      }
      footer={[
        <Button
          type="primary"
          key="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Отправить
        </Button>,
        <Button key="reset" onClick={onModalClose}>
          Отменить
        </Button>
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Название" {...field} />}
        />
      </form>
    </Modal>
  );
};
