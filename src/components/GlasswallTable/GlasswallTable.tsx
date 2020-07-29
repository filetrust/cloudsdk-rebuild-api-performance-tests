import React from "react";

import styles from "./GlasswallTable.module.scss";

export interface GlasswallTableProps { children: React.ReactNode };

const GlasswallTable = (props: GlasswallTableProps) => {
    return (
        <table className={styles.table}>
            {props.children}
        </table>
    );
};

export default GlasswallTable;