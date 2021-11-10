import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Heatmap from './chart';

export const Dashboard = () => {
    return (
        <Card>
            <CardHeader title="Welcome to the administration" />
            <CardContent>
                <Heatmap />
            </CardContent>
        </Card>);
}
export default Dashboard;