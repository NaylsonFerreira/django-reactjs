import * as React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

const list = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="ip" />
            <DateField source="last_sent_to_remote" showTime />
        </Datagrid>
    </List>
);
export const rtu = { 'list': list }

export default rtu