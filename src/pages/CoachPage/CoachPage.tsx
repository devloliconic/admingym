import { Button, Card, Space, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useCoach } from "@/api/queries/coach";
import { Loyout } from "@/components/Loyout/Loyout";

import styles from "./coachPage.module.scss";

export const CoachPage = () => {
  const { id: coachId } = useParams();

  const navigate = useNavigate();
  const { data: coachData, isLoading, isError } = useCoach(coachId || "");

  const userTitle = [
    coachData?.firstName,
    coachData?.lastName,
    coachData?.middleName
  ]
    .filter(Boolean)
    .join(" ");

  if (isLoading) {
    return (
      <Loyout>
        <Spin />
      </Loyout>
    );
  }

  if (isError) {
    return (
      <Loyout>
        404 <Button onClick={() => navigate("/")}>Вернуться назад</Button>
      </Loyout>
    );
  }

  return (
    <Loyout>
      <div className={styles.container}>
        <Card title={userTitle}>
          <div>
            <Space>
              <p className={styles.itemTitle}>📌 Имя:</p>
              <span className={styles.itemValue}>{userTitle}</span>
            </Space>
          </div>
          <div>
            <Space>
              <p className={styles.itemTitle}>💲 Ставка:</p>
              <span className={styles.itemValue}>{coachData.coast}</span>
            </Space>
          </div>
          <div>
            <Space>
              <p className={styles.itemTitle}>🏋 Зал:</p>
              <span className={styles.itemValue}>{coachData.gym.name}</span>
            </Space>
          </div>
          <div>
            <Space>
              <p className={styles.itemTitle}>📍 Адрес:</p>
              <span className={styles.itemValue}>
                {coachData?.gym?.address?.address}
              </span>
            </Space>
          </div>
        </Card>
      </div>
    </Loyout>
  );
};
