import React from "react";

import SplashScreen from "../../components/SplashScreen/SplashScreen";

import styles from "./SplashScreenView.module.scss";

export interface SplashScreenViewProps { changeHandler: Function, submitApiKey: Function }

const SplashScreenView = (props: SplashScreenViewProps) => {

    return (
        <SplashScreen heading="Rebuild API" subHeading="Automated Performance Tests">
            <form onSubmit={e => props.submitApiKey(e)}>
                <div>
                    <input className={styles.input}
                        type="password"
                        required
                        placeholder="Enter API Key"
                        onChange={e => props.changeHandler(e.target.value)}></input>
                </div>

                <div>
                    <button className={styles.button}  type="submit">Submit</button>
                </div>
            </form>

        </SplashScreen>
    );
};

export default SplashScreenView;