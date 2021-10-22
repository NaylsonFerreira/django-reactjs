import * as React from "react";
import { List, Datagrid, TextField } from 'react-admin';

const list = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>
);
export const rtu = { 'list': list }

export default rtu