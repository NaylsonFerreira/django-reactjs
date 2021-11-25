import * as React from "react";

import { Admin, Resource } from 'react-admin';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';
import { Login } from "ra-ui-materialui";
import Dashboard from "./pages/Dashboard";
import binaryFile from "./resources/binaryFiles";
import rtu from "./resources/rtu";

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={Login}
    dashboard={Dashboard} >

    <Resource name="binaryFiles" list={binaryFile.list} />
    <Resource name="rtu" list={rtu.list} />

  </Admin>
);

export default App;