import React from "react";

import SplashScreen from "../../components/SplashScreen/SplashScreen";

import styles from "./SplashScreenView.module.scss";

export interface SplashScreenViewProps { hideSplashScreen: Function }

const SplashScreenView = (props: SplashScreenViewProps) => {
    return (
        <SplashScreen heading="Glasswall React App" subHeading="Edit src/App.jsx and save to reload.">
            <div>
                <p className={styles.link} onClick={() => props.hideSplashScreen()}>Click here to hide the Splash Screen.</p>
            </div>

            <div>
                <a className={styles.link} href="https://filetrust.github.io/frontend/" target="_blank" rel="noopener noreferrer">Styleguide</a>
            </div>

            <div style={{paddingTop: "1rem"}}>
                <a className={styles.link} href="https://github.com/filetrust/glasswall-react-app" target="_blank" rel="noopener noreferrer">Github</a>
            </div>
        </SplashScreen>
    );
};

export default SplashScreenView;