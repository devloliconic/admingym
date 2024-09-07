import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useAddTicketForClient } from "@/api/mutations/addTicketForClient";
import { useClient } from "@/api/queries/client";
import { useTickets } from "@/api/queries/tickets";

import styles from "./addTicketForClientModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  clientId?: number;
}

interface FormValues {
  ticketId: number;
}

export const AddTicketForClientModal = ({
  isOpen,
  onModalClose,
  clientId
}: Props) => {
  const { data: clientData } = useClient(clientId);
  const { data: ticketsData } = useTickets();
  const { mutate: addTicket } = useAddTicketForClient();

  const ticketsOptions = ticketsData
    ? ticketsData.map((ticket) => ({
        label: ticket.type,
        value: ticket.ticket_id
      }))
    : undefined;

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange" });

  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    const { ticketId } = data;
    if (clientId) {
      addTicket(
        { id: clientId, ticketId: ticketId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["client", clientId]);
            queryClient.invalidateQueries(["clients"]);
            reset();
            onModalClose();
          }
        }
      );
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        reset();
        onModalClose();
      }}
      title={
        clientId ? "Редактировать информацию о клиенте" : "Создать клиента"
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
          name="ticketId"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Абонемент"
              options={ticketsOptions}
              {...field}
            />
          )}
        />
      </form>
    </Modal>
  );
};
