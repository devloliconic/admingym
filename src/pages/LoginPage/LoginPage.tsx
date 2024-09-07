import { useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLogin } from "@/api/mutations/login";

import styles from "./loginPage.module.scss";

interface FormValues {
  login: string;
  password: string;
}

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({
    mode: "onChange"
  });

  const { mutate: loginMutate, isLoading } = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { password, login } = data;
    loginMutate(
      { password, login },
      {
        onSuccess: (response) => {
          const { accessToken } = response;
          localStorage.setItem("token", `Bearer ${accessToken}`);
          navigate("/");
          queryClient.invalidateQueries(["me"]);
        },
        onError: () => {
          reset();
        }
      }
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gym</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="login"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input placeholder="login" {...field} />}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input.Password placeholder="password" {...field} />
            )}
          />

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!isValid}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
