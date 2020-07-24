import React from "react";

import GlasswallLogo from "../GlasswallLogo/GlasswallLogo";

import styles from "./SplashScreen.module.scss";

export interface SplashScreenProps { heading: string; subHeading?: string; children?: React.ReactNode; }

const SplashScreen = (props: SplashScreenProps) => {
    return (
        <div className={styles.splashContainer} data-testid="splashContainerDiv">
            <div className={styles.logoContainer} data-testid="logoContainerDiv">
                <GlasswallLogo className={styles.logo} />
            </div>

            <div className={styles.headingContainer} data-testid="headingContainerDiv">
                <h1 className={styles.heading}>{props.heading}</h1>
                {props.subHeading &&
                    <h2 className={styles.subHeading}>{props.subHeading}</h2>
                }
                <div className={styles.childContainer} data-testid="childContainerDiv">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
