import Head from "next/head";
import React from "react";

type MetaType = {
    title: string;
    description?: string;
};

function Meta({ title }: MetaType) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
}

export default Meta;
