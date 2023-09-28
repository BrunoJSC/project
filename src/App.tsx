import { Route, Routes } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/auth";
import { Admin } from "./pages/Admin";
import { Contact } from "./pages/Contact";
import { Announce } from "./pages/Announce";
import { Financing } from "./pages/Financing";
import { CarsPage } from "./pages/CarsPage";
import PrivateRoute from "./routes/PrivateRoute";
import { Dashboard } from "./admin/Dashboard";
import { CreateCar } from "./pages/CreateCar";
import { NotFound } from "./pages/404";
import { DetailsCar } from "./pages/DetailsCar";
import { Form } from "./pages/Form";
import { BikePage } from "./pages/BikePage";
import { FormCar } from "./components/FormCar";
import { FormBike } from "./components/FormBike";
import { CreateBike } from "./pages/CreateBike";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PublicRoute>
                <Admin />
              </PublicRoute>
            }
          />

          <Route
            path="/anunciar"
            element={
              <PublicRoute>
                <Announce />
              </PublicRoute>
            }
          />

          <Route
            path="/financiamento"
            element={
              <PublicRoute>
                <Financing />
              </PublicRoute>
            }
          />

          <Route
            path="/form"
            element={
              <PublicRoute>
                <Form />
              </PublicRoute>
            }
          />

          <Route
            path="/form/carro"
            element={
              <PublicRoute>
                <FormCar />
              </PublicRoute>
            }
          />

          <Route
            path="/form/moto"
            element={
              <PublicRoute>
                <FormBike />
              </PublicRoute>
            }
          />

          <Route
            path="/carros"
            element={
              <PublicRoute>
                <CarsPage />
              </PublicRoute>
            }
          />

          <Route
            path="carros/detalhes/:id"
            element={
              <PublicRoute>
                <DetailsCar />
              </PublicRoute>
            }
          />

          <Route
            path="/motos"
            element={
              <PublicRoute>
                <BikePage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/criar-carro"
            element={
              <PrivateRoute>
                <CreateCar />
              </PrivateRoute>
            }
          />


          <Route
            path="/criar-moto"
            element={
              <PrivateRoute>
                <CreateBike />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PublicRoute>
                <NotFound />
              </PublicRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}
