import * as React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

const list = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="rtu" />
            <DateField source="timestamp" />
            <TextField source="channels" />
        </Datagrid>
    </List>
);
export const binaryFile = { 'list': list }

export default binaryFile