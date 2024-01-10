import React, { useState } from "react";
import DashboardLayout from "../../../components/Shared/DashboardLayout";
import SupportTable from "../../../components/Support/SupportTable";
import TopSection from "../../../components/TopSection";
import { ticketFilter } from "../../../utils/const";
import { SupportFilter } from "../../../api-query/useSupportQuery";

function SupportPage() {
    const [filter, setFilter] = useState<SupportFilter>({
        status: "all",
        date: "month",
    });

    return (
        <DashboardLayout>
            <TopSection
                title={"Ticket"}
                statusFilterOptions={ticketFilter}
                statusDefaultValue={ticketFilter[0]}
                statusOnChange={(v: any) =>
                    setFilter((j) => ({ ...j, status: v.value }))
                }
                dateOnChange={(v: any) =>
                    setFilter((j) => ({ ...j, date: v.value }))
                }
            />
            <SupportTable filter={filter} />
        </DashboardLayout>
    );
}

export default SupportPage;
