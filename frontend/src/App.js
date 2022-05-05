import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import EnsureCsrftoken from "./auth/EnsureCsrftoken";
import EnsureAuthentication from "./auth/EnsureAuthentication";
import CheckAuth from "./auth/CheckAuth";

import Auth from "./auth";
import Spaces from "./space/Spaces";
import Space from "./space/Space";

import { Item, Items, ItemCreate } from "./item";

import Dashboard from "./dashboard";
import { MatchToBottomNavigation } from "./base/BottomNavigation";
import { Container } from "@mui/material";

function App() {
  return (
    <EnsureCsrftoken>
      <CheckAuth>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <EnsureAuthentication loginUrl={"/login"}>
                  <Dashboard />
                  <MatchToBottomNavigation>
                    <Container sx={{ p: 0 }} maxWidth="md">
                      <Routes>
                        <Route path="/" element={<Spaces />} />

                        <Route path="space/:spaceUuid/*" element={<Outlet />}>
                          <Route
                            path=""
                            element={
                              <>
                                <Space />
                                <Items />
                              </>
                            }
                          />
                          <Route path="item/:itemUuid" element={<Item />} />
                          <Route path="new-item" element={<ItemCreate />} />
                        </Route>
                      </Routes>
                    </Container>
                  </MatchToBottomNavigation>
                </EnsureAuthentication>
              }
            />

            <Route path="/login" element={<Auth.LoginPage />} />
            <Route path="/logout" element={<Auth.LogoutPage />} />
          </Routes>
        </BrowserRouter>
      </CheckAuth>
    </EnsureCsrftoken>
  );
}

export default App;
