import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Select } from "antd";
import { format, parse } from "date-fns";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateClient } from "@/api/mutations/createClient";
import { useUpdateCliet } from "@/api/mutations/updateClient";
import { useClient } from "@/api/queries/client";
import { DatePicker } from "@/components/DatePicker";
import { genderList } from "@/config/contsants";

import styles from "./createClientModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  clientId?: number;
}

interface FormValues {
  email: string;
  password: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: Date | null;
}

export const CreateClientModal = ({
  isOpen,
  onModalClose,
  clientId
}: Props) => {
  const { data: clientData } = useClient(clientId);
  const { mutate: updateClient } = useUpdateCliet();
  const { mutate: createClient } = useCreateClient();

  const defaultValues = useMemo(
    () => ({
      email: clientData?.email,
      password: clientData?.password,
      gender: clientData?.gender,
      firstName: clientData?.firstName,
      lastName: clientData?.lastName,
      middleName: clientData?.middleName,
      birthDate: clientData?.birthDate
        ? parse(clientData?.birthDate, "dd.MM.yyyy", new Date())
        : null
    }),
    [clientData]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    const { birthDate } = data;
    const convertedBirthDate = birthDate
      ? format(birthDate, "dd.MM.yyyy")
      : null;

    if (clientId) {
      updateClient(
        { ...data, id: clientId, birthDate: convertedBirthDate },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["client", clientId]);
            queryClient.invalidateQueries(["clients"]);
            onModalClose();
            reset();
          }
        }
      );
      return;
    }
    createClient(
      { ...data, birthDate: convertedBirthDate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["clients"]);
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
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Почта" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Пароль" {...field} />}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input placeholder="Имя" {...field} />}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input placeholder="Фамилия" {...field} />}
        />
        <Controller
          name="middleName"
          control={control}
          render={({ field }) => <Input placeholder="Отчество" {...field} />}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select placeholder="Пол" options={genderList} {...field} />
          )}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholder="Дата рождения"
              {...field}
              format="dd.MM.y"
            />
          )}
        />
      </form>
    </Modal>
  );
};
