import * as React from "react";

import { Admin, Resource } from 'react-admin';
import dataProvider from './providers/dataProvider';
import authProvider from './providers/authProvider';
import { Login } from "ra-ui-materialui";
import RTU from "./resources/RTU";

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={Login}  >
    <Resource name="RTU" list={RTU.list} />
  </Admin>
);

export default App;