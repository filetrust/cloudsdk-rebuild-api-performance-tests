import React from "react";

import styles from "./NavLabel.module.scss";

export interface NavLabelProps {label: string};

const NavLabel = (props: NavLabelProps) => {

    return (
        <li><button className={styles.label}>{props.label}</button></li>
    );
};

export { NavLabel };