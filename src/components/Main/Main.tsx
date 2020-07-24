import React from "react";

import styles from "./Main.module.scss";

export interface MainProps {
    expanded: boolean,
    showTitle: boolean,
    title?: string,
    children: React.ReactNode
}

const Main = (props: MainProps) => {

    if (props.showTitle && (props.title === undefined || props.title === null)) {
        console.error("showTitle is set to true, but no title was supplied to <Main>.");
    }

    return (
        <>
            {props.showTitle &&
                <h1 className={`${styles.pageHeading} ${props.expanded ? styles.expanded : ""}`}>
                    {props.title}
                </h1>
            }

            <div className={`${styles.main} ${props.expanded ? styles.expanded : ""} ${props.showTitle ? styles.showTitle : ""}`}>

                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Main;