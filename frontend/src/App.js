import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import EnsureCsrftoken from "./auth/EnsureCsrftoken";
import EnsureAuthentication from "./auth/EnsureAuthentication";
import CheckAuth from "./auth/CheckAuth";

import Auth from "./auth";

import {
  Wrapers as SpaceWrapers,
  PlaceCreate,
  SpaceDetail,
  Spaces,
  Space,
} from "./space";
import { Wrapers } from "./item";

import { Item, Items, ItemCreate, ItemDetail, ItemEdit } from "./item";
import Settings from "./settings";

import Dashboard from "./dashboard";
import { MatchToBottomNavigation } from "./base/BottomNavigation";
import { Container, CssBaseline } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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

                          <Route
                            path="space/:spaceUuid/*"
                            element={
                              <>
                                <SpaceWrapers.FetchSpace>
                                  <SpaceWrapers.FetchSpacePlaces />
                                  <Wrapers.FetchSpaceItems />
                                  <Outlet />
                                </SpaceWrapers.FetchSpace>
                              </>
                            }
                          >
                            <Route
                              path=""
                              element={
                                <>
                                  <Space />
                                  <Items />
                                </>
                              }
                            />
                            <Route path="detail" element={<SpaceDetail />} />
                            <Route
                              path="item/:itemUuid"
                              element={
                                <Wrapers.SetSelectedItem>
                                  <Outlet />
                                </Wrapers.SetSelectedItem>
                              }
                            >
                              <Route path="" element={<Item />} />
                              <Route path="detail" element={<ItemDetail />} />
                              <Route path="edit" element={<ItemEdit />} />
                            </Route>
                            <Route path="new-item" element={<ItemCreate />} />
                            <Route path="new-place" element={<PlaceCreate />} />
                          </Route>
                          <Route path="/settings/*" element={<Settings />} />
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
    </ThemeProvider>
  );
}

export default App;
