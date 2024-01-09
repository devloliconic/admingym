import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Select } from "antd";
import { format, parse } from "date-fns";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { useCreateWorkout } from "@/api/mutations/createWorkout";
import { useUpdateWorkout } from "@/api/mutations/updateWorkout";
import { useClients } from "@/api/queries/clients";
import { useCoaches } from "@/api/queries/coaches";
import { useGyms } from "@/api/queries/gyms";
import { useWorkout } from "@/api/queries/workout";
import { DatePicker } from "@/components/DatePicker";

import styles from "./createWorkoutModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  workoutId?: number;
}

interface FormValues {
  client_id: number;
  coach_id: number;
  gym_id: number;
  date: Date | null;
}

export const CreateWorkoutModal = ({
  isOpen,
  onModalClose,
  workoutId
}: Props) => {
  //const { data: ticketData } = useTicket(ticketId);
  //const { mutate: updateTicket } = useUpdateTicket();
  const { mutate: createWorkout } = useCreateWorkout();
  const { mutate: updateWorkout } = useUpdateWorkout();
  const { data: clientsData } = useClients();
  const { data: gymsData } = useGyms();
  const { data: coachesData } = useCoaches();

  const { data: workoutData } = useWorkout(workoutId || "");

  const getFullName = (
    firstName: string | undefined,
    lastName: string | undefined,
    middleName: string | undefined
  ) => [firstName, lastName, middleName].filter(Boolean).join(" ");

  const defaultValues = useMemo(
    () => ({
      client_id: workoutData?.client_id,
      coach_id: workoutData?.coach_id,
      gym_id: workoutData?.gym_id,
      date: workoutData?.date
        ? parse(workoutData?.date, "dd.MM.yyyy", new Date())
        : null
    }),
    [
      workoutData?.client_id,
      workoutData?.coach_id,
      workoutData?.date,
      workoutData?.gym_id
    ]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const clientsOptions =
    clientsData &&
    clientsData.map((it) => ({
      label: getFullName(it.firstName, it.lastName, it.middleName),
      value: it.user_id,
      key: it.user_id
    }));

  const gymsOptions =
    gymsData &&
    gymsData.map((it) => ({
      label: it.name,
      value: it.gym_id,
      key: it.gym_id
    }));

  const coachesOptions =
    coachesData &&
    coachesData.map((it) => ({
      label: getFullName(it.firstName, it.lastName, it.middleName),
      value: it.coach_id,
      key: it.coach_id
    }));

  console.log(clientsOptions);

  const queryClient = useQueryClient();
  const onSubmit = (data: FormValues) => {
    const { date } = data;
    const convertedDate = date ? format(date, "dd.MM.yyyy") : "";

    if (workoutId) {
      updateWorkout(
        { ...data, workout_id: workoutId, date: convertedDate },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["workout", workoutId]);
            queryClient.invalidateQueries(["workouts"]);
            onModalClose();
            reset();
          }
        }
      );
      return;
    }
    createWorkout(
      { ...data, date: convertedDate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["workouts"]);
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
      title={workoutId ? "Редактировать тренировку" : "Создать тренировку"}
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
          name="client_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select placeholder="Клиент" {...field} options={clientsOptions} />
          )}
        />
        <Controller
          name="coach_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select placeholder="Тренер" {...field} options={coachesOptions} />
          )}
        />
        <Controller
          name="gym_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select placeholder="Зал" {...field} options={gymsOptions} />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholder="Дата тренировки"
              {...field}
              format="dd.MM.y"
            />
          )}
        />
      </form>
    </Modal>
  );
};
