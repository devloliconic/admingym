import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateOthers } from "@/api/mutations/createOthers";
import { useUpdateOthers } from "@/api/mutations/updateOthers";
import { useGetOthers } from "@/api/queries/others";

import styles from "./addOthersForGymModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  gymId: number | string;
  othersId?: number;
}

interface FormValues {
  name: string;
}

export const AddOthersForGymModal = ({
  isOpen,
  onModalClose,
  gymId,
  othersId
}: Props) => {
  const { data: equipmentData } = useGetOthers(gymId, othersId);

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

  const { mutate: createOthers } = useCreateOthers();
  const { mutate: updateOthers } = useUpdateOthers();

  const queryClient = useQueryClient();

  const onSubmit = (data: FormValues) => {
    const { name } = data;
    if (othersId) {
      updateOthers(
        { name: name, gymId: gymId, equipmentId: othersId },
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
    createOthers(
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
        othersId ? "Редактировать информацию расходнике" : "Добавить расходик"
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
