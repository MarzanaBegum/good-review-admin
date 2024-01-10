import React from "react";
import DashboardPage from "../../components/DashboardPage";
import DashboardLayout from "../../components/Shared/DashboardLayout";

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <DashboardPage />
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
