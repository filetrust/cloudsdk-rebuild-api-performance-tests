import React from "react";

import SplashScreen from "../../components/SplashScreen/SplashScreen";

import styles from "./SplashScreenView.module.scss";

export interface SplashScreenViewProps { changeHandler: Function, submitApiKey: Function }

const SplashScreenView = (props: SplashScreenViewProps) => {

    return (
        <SplashScreen heading="Rebuild API" subHeading="Automated Performance Tests">
            <form>
                <div>
                    <input className={styles.input}
                        type="password"
                        placeholder="Enter API Key"
                        onChange={e => props.changeHandler(e.target.value)} required></input>
                </div>

                <div>
                    <button className={styles.button}
                        type="submit"
                        onClick={e => props.submitApiKey(e)}>Submit</button>
                </div>
            </form>

        </SplashScreen>
    );
};

export default SplashScreenView;