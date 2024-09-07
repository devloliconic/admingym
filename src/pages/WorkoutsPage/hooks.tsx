import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Space } from "antd";

import { Ticket } from "@/_types/ticket";
import { Workout } from "@/_types/workout";
import { useDeleteWorkout } from "@/api/mutations/deleteWorkout";

export const useColumns = (handleEditClick: (id: number) => void) => {
  const { mutate: deleteWorkout } = useDeleteWorkout();
  const queryClient = useQueryClient();

  const handleDeleteWorkout = (id: string | number) => {
    deleteWorkout(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["workouts"]);
        }
      }
    );
  };

  const getClientFullName = (
    firstName?: string,
    lastName?: string,
    middleName?: string
  ) => {
    return [firstName, lastName, middleName].filter(Boolean).join(" ");
  };

  const columns = [
    {
      key: "client",
      title: "Клиент",
      width: "20%",
      render: (it: Workout) =>
        getClientFullName(
          it.user.firstName,
          it.user.lastName,
          it.user.middleName
        )
    },
    {
      key: "coach",
      title: "Тренер",
      width: "20%",
      render: (it: Workout) =>
        getClientFullName(
          it.coach.firstName,
          it.coach.lastName,
          it.coach.middleName
        )
    },
    {
      key: "gym",
      title: "Зал",
      width: "20%",

      render: (it: Workout) => it.gym.name
    },
    {
      key: "date",
      title: "Дата",
      render: (it: Workout) => it.date
    },
    {
      key: "delete",
      title: "",
      width: "6%",
      render: (it: Workout) => (
        <Space>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteWorkout(it.workout_id)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleEditClick(it.workout_id)}
          />
        </Space>
      )
    }
  ];

  return { columns };
};
