import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateTicket } from "@/api/mutations/createTicket";
import { useUpdateTicket } from "@/api/mutations/updateTicket";
import { useTicket } from "@/api/queries/ticket";

import styles from "./createTicketModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  ticketId?: number;
}

interface FormValues {
  type: string;
  period: number;
  price: number;
}

export const CreateTicketModal = ({
  isOpen,
  onModalClose,
  ticketId
}: Props) => {
  const { data: ticketData } = useTicket(ticketId);
  const { mutate: updateTicket } = useUpdateTicket();
  const { mutate: createTicket } = useCreateTicket();

  const defaultValues = useMemo(
    () => ({
      type: ticketData?.type,
      price: ticketData?.price,
      period: ticketData?.period
    }),
    [ticketData]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    if (ticketId) {
      updateTicket(
        { ...data, id: ticketId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["ticket", ticketId]);
            queryClient.invalidateQueries(["tickets"]);
            onModalClose();
            reset();
          }
        }
      );
      return;
    }
    createTicket(
      { ...data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["tickets"]);
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
      title={
        ticketId ? "Редактировать информацию о абонементе" : "Создать абонемент"
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
        <Button key="reset">Отменить</Button>
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Тип" {...field} />}
        />
        <Controller
          name="period"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Период" {...field} />}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Цена" {...field} />}
        />
      </form>
    </Modal>
  );
};
