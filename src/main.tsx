import ReactDOM from "react-dom/client";

import "./styles/global.scss";
import "./api/instanse";

import { useGetMe } from "@/api/queries/me";

import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);

const init = async () => {
  root.render(<div>loading</div>);
  useGetMe.prefetch();
};

init().then(() => {
  root.render(<App />);
});
