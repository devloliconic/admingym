import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateGym } from "@/api/mutations/createGym";
import { useGym } from "@/api/queries/gym";

import styles from "./createGymModal.module.scss";
import { useUpdateGym } from "@/api/mutations/updateGym";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  gymId?: number | string;
}

interface FormValues {
  name: string;
  сapacity: number;
  phoneNumber: string;
  email: string;
  address: string;
  index: number;
}

export const CreateGymModal = ({ isOpen, onModalClose, gymId }: Props) => {
  const { data: gymData } = useGym(gymId);
  const { mutate: updateGym } = useUpdateGym();

  const defaultValues = useMemo(
    () => ({
      name: gymData?.name as string,
      сapacity: gymData?.сapacity as number,
      phoneNumber: gymData?.contact?.phoneNumber || "",
      email: gymData?.contact?.email,
      address: gymData?.address.address || "",
      index: gymData?.address.index
    }),
    [
      gymData?.address.address,
      gymData?.address.index,
      gymData?.contact?.email,
      gymData?.contact?.phoneNumber,
      gymData?.name,
      gymData?.сapacity
    ]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const { mutate: createGym } = useCreateGym();
  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    if (gymId) {
      updateGym(
        { ...data, id: gymId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["gyms"]);
            queryClient.invalidateQueries(["gym", gymId]);
            onModalClose();
            reset();
          }
        }
      );
      return;
    }
    createGym(
      { ...data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["gyms"]);
          onModalClose();
          reset();
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
      title={gymId ? "Редактировать информацию о зале" : "Создать зал"}
      footer={[
        <Button
          type="primary"
          key="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Отправить
        </Button>,
        <Button key="reset">Отменить</Button>
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Имя" {...field} />}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder="Номер телефона" {...field} />
          )}
        />
        <Controller
          name="сapacity"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Вместимость" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Адрес" {...field} />}
        />
        <Controller
          name="index"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder="Почтовый индекс" {...field} />
          )}
        />
      </form>
    </Modal>
  );
};
