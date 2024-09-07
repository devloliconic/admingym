import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Select } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateCoach } from "@/api/mutations/createCoach";
import { useUpdateCaoch } from "@/api/mutations/updateCoach";
import { useCoach } from "@/api/queries/coach";
import { useGyms } from "@/api/queries/gyms";

import styles from "./createTicketModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  coachId?: number;
}

interface FormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  coast: number;
  gym_id: number;
}

export const CreateCoachModal = ({ isOpen, onModalClose, coachId }: Props) => {
  const { data: coachData } = useCoach(coachId);
  const { mutate: updateCoach } = useUpdateCaoch();
  const { mutate: createCoach } = useCreateCoach();

  const { data: gymsData } = useGyms();

  const gymsOptions = gymsData
    ? gymsData.map((it) => ({ label: it.name, value: it.gym_id }))
    : undefined;

  const defaultValues = useMemo(
    () => ({
      firstName: coachData?.firstName,
      lastName: coachData?.lastName,
      middleName: coachData?.middleName,
      coast: coachData?.coast,
      gym_id: coachData?.gym_id
    }),
    [coachData]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    if (coachId) {
      updateCoach(
        { ...data, id: coachId },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["coach", coachId]);
            await queryClient.invalidateQueries(["coaches"]);
            onModalClose();
            reset();
          }
        }
      );
      return;
    }
    createCoach(
      { ...data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["coaches"]);
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
      title={coachId ? "Редактировать информацию о тренере" : "Создать тренера"}
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
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Имя" {...field} />}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Фамилия" {...field} />}
        />
        <Controller
          name="middleName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Отчество" {...field} />}
        />
        <Controller
          name="coast"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder="Ставка в час" {...field} />
          )}
        />
        <Controller
          name="gym_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select placeholder="Зад" options={gymsOptions} {...field} />
          )}
        />
      </form>
    </Modal>
  );
};
