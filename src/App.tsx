import { useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import {
  Authenticated,
  // GitHubBanner,
  Refine,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { App as AntdApp } from 'antd';
('@refinedev/nestjs-query');
// import { createClient } from 'graphql-ws';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import Layout from './components/layout';
import { resources } from './config/resources';
import { CompanyList, ForgotPassword, Home, Login, Register } from './pages';
import Create from './pages/company/Create';
import Edit from './pages/company/Edit';
import CreateTask from './pages/tasks/Create';
import EditTask from './pages/tasks/Edit';
import List from './pages/tasks/List';
import { authProvider, dataProvider, liveProvider } from './providers';

// const API_URL = 'https://api.nestjs-query.refine.dev/graphql';
// const WS_URL = 'wss://api.nestjs-query.refine.dev/graphql';

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider
          // url='https://api.crm.refine.dev/'
          // url='http://devtools.local'
          >
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              // dataProvider={dataProvider(gqlClient)}
              // liveProvider={liveProvider(wsClient)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
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
                    <Route path='edit/:id' element={<Edit />} />
                  </Route>
                  <Route
                    path='/tasks'
                    element={
                      <List>
                        <Outlet />
                      </List>
                    }
                  >
                    <Route path='new' element={<CreateTask />} />
                    <Route path='edit/:id' element={<EditTask />} />
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
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
