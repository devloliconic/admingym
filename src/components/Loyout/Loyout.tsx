import { Spin } from "antd";
import { Suspense } from "react";

import { Navigation } from "../Navigation";

import styles from "./loyout.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Loyout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Navigation />
      <Suspense fallback={<Spin />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
};
