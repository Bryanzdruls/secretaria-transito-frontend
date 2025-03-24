import { Route, Routes } from "react-router"
import SignIn from "../auth/SignIn"
import LogIn from "../auth/LogIn"
import DashboardLayoutBasic from "../layout/BasicLayout"
import { VehiclePage } from "../vehicles/VehiclePage"
import { ReportPage } from "../reports/ReportsPage"
import PrivateRoute from "./PrivateRoute"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<SignIn />} />
      </Route>

      <Route path="dashboard/*" element={<PrivateRoute />}>
        <Route element={<DashboardLayoutBasic />}>
          <Route path="vehicles" element={<VehiclePage />} />
          <Route path="reports" element={<ReportPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
