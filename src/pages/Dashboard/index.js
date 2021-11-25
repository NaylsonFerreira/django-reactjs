import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import {
    SimpleShowLayout, SimpleForm,
    NumberInput, DateTimeInput, FormDataConsumer
} from 'react-admin';

import Heatmap from './chart';

export const Dashboard = (props = {}) => {

    const dateFormatter = v => {
        if (v instanceof Date) {
            v = v.toJSON().split(".")[0];
            const [date, time] = v.split("T");
            const [yy, me, dd] = date.split("-");
            v = new Date(`${yy}-${me}-${dd} ${time}`).toJSON().split(".")[0]
        }
        return v
    };

    const toDay = new Date();

    const [config, setConfig] = useState({
        min_channel: 0,
        max_channel: 200,
        seconds: 1,
        intensity: 1,
        date_start: dateFormatter(toDay),
    });

    const dateParser = v => {
        return v;
    };

    const handleChange = ({ name, value }) => {
        setConfig({ ...config, [name]: value });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const [date, time] = config.date_start.split("T");
            const [y, m, d] = date.split("-");
            const start = new Date(`${y}-${m}-${d}T${time}`);
            start.setSeconds(start.getSeconds() + 1);
            const next_time = start.toTimeString().split(" ")[0];
            setConfig({...config, date_start: `${date}T${next_time}`})
            console.log(next_time);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [config, config.date_start])

    return (
        <SimpleShowLayout>
            <Card>
                <CardHeader title="Welcome to the administration" />
                <CardContent>
                    <span>{JSON.stringify(config.date_start)}</span>
                    <Heatmap {...config}
                    />
                </CardContent>
            </Card>
            <SimpleForm record={config} save={() => { }}>
                <FormDataConsumer>
                    {({ formData }) => {
                        // console.log(config);
                        return (
                            <DateTimeInput source="date_start"
                                format={dateFormatter} parse={dateParser}
                                defaultValue={config.date_start}
                                onChange={({ target }) => handleChange(target)}
                            />
                        )
                    }}
                </FormDataConsumer>


                <NumberInput source="min_channel"
                    defaultValue={config.min_channel}
                    onChange={({ target }) => handleChange(target)}
                />
                <NumberInput source="max_channel"
                    defaultValue={config.max_channel}
                    onChange={({ target }) => handleChange(target)}
                />
                <NumberInput source="seconds"
                    defaultValue={config.seconds}
                    onChange={({ target }) => handleChange(target)}
                />
                <NumberInput source="intensity"
                    defaultValue={config.intensity}
                    onChange={({ target }) => handleChange(target)}
                />
            </SimpleForm>
        </SimpleShowLayout>
    );
}
export default Dashboard;