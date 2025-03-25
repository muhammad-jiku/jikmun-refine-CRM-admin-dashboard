import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { Authenticated, GitHubBanner, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {} from // dataProvider,
'@refinedev/nestjs-query';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { App as AntdApp } from 'antd';
// import { createClient } from 'graphql-ws';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
// import { authProvider } from './authProvider';
import Layout from './components/layout';
import { ColorModeContextProvider } from './contexts/color-mode';
import { CompanyList, ForgotPassword, Home, Login, Register } from './pages';
import Create from './pages/company/Create';
import EditPage from './pages/company/Edit';
import TasksCreatePage from './pages/tasks/Create';
import TasksEditPage from './pages/tasks/Edit';
import List from './pages/tasks/List';
import { authProvider, dataProvider, liveProvider } from './providers';

// const API_URL = 'https://api.nestjs-query.refine.dev/graphql';
// const WS_URL = 'wss://api.nestjs-query.refine.dev/graphql';

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                // dataProvider={dataProvider(gqlClient)}
                // liveProvider={liveProvider(wsClient)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: '4FnUQn-0C9jMR-ulN8gI',
                  liveMode: 'auto',
                }}
              >
                <Routes>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                  <Route
                    element={
                      <Authenticated
                        key='authenticated-layout'
                        fallback={<CatchAllNavigate to='/login' />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                    <Route path='/companies'>
                      <Route index element={<CompanyList />} />
                      <Route path='new' element={<Create />} />
                      <Route path='edit/:id' element={<EditPage />} />
                    </Route>
                    <Route
                      path='/tasks'
                      element={
                        <List>
                          <Outlet />
                        </List>
                      }
                    >
                      <Route path='new' element={<TasksCreatePage />} />
                      <Route path='edit/:id' element={<TasksEditPage />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
