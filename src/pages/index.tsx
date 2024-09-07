import { Navigate, Route, Routes } from "react-router-dom";

import { useGetMe } from "@/api/queries/me";

import { ClientsPage } from "./ClientsPage";
import { CoachPage } from "./CoachPage/CoachPage";
import { CoachesPage } from "./CoachesPage";
import { GymPage } from "./GymPage";
import { GymsPage } from "./GymsPage";
import { LoginPage } from "./LoginPage";
import { TicketsPage } from "./TicketsPage";
import { WorkoutsPage } from "./WorkoutsPage";
import { pageRotes } from "./config";

const Unauthorized = () => {
  return <LoginPage />;
};

const Authorized = () => {
  return (
    <Routes>
      <Route path={pageRotes.main} element={<GymsPage />} />
      <Route path={pageRotes.login} element={<LoginPage />} />
      <Route path={pageRotes.clients} element={<ClientsPage />} />
      <Route path={pageRotes.tickets} element={<TicketsPage />} />
      <Route path={pageRotes.coaches} element={<CoachesPage />} />
      <Route path={pageRotes.gym} element={<GymPage />} />
      <Route path={pageRotes.coach} element={<CoachPage />} />
      <Route path={pageRotes.workouts} element={<WorkoutsPage />} />
      <Route path="*" element={<Navigate to={pageRotes.main} replace />} />
    </Routes>
  );
};

export const Pages = () => {
  const { data: user } = useGetMe();

  return user ? <Authorized /> : <Unauthorized />;
};
