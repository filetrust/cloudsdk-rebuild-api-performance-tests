import React, { useEffect, useState } from "react";
import ApiKeyModal from "../../components/ApiKeyModal/ApiKeyModal";

import styles from "./RunTestsView.module.scss";

export interface RunTestsViewProps { apiKey: string, onLoad: Function, updateApiKey: Function };

const RunTestsView = (props: RunTestsViewProps) => {
    const runTestUrl = "https://cqxec6akld.execute-api.eu-west-1.amazonaws.com/prod/filerebuildperformancetest/starttest";

    const [loading, setLoading] = useState(false);
    const [apiKeyIsInvalid, setApiKeyIsInvalid] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const runNewTest = async () => {
        await setLoading(true);

        try {
            const response = await fetch(runTestUrl, {
                method: "POST",
                headers: {
                    "x-api-key": props.apiKey
                },
                body: "{}"
            });

            let responseString = await response.json();

            if (response.ok) {
                alert("Success!");
                setApiKeyIsInvalid(false);
            }
            else {
                if (responseString.message === "Forbidden") {
                    console.error(`Error ${response.status}. Invalid API Key`)
                }
                else {
                    console.error(`Error ${response.status}. ${responseString}`);
                }

                setApiKeyIsInvalid(true);
            }
        }
        catch (e) {
            console.error(e);
            setApiKeyIsInvalid(true);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        props.onLoad("FileRebuildPerformanceTest | Tests");
    }, [props]);

    const submitNewApiKey = async (newApiKey: string) => {
        setModalIsOpen(false);
        props.updateApiKey(newApiKey);
        //await setLoading(true);
    };

    return (
        <div className={styles.runTestsPageContainer}>
            <ApiKeyModal
                isOpen={modalIsOpen}
                onCloseAction={() => setModalIsOpen(false)}
                submitFunction={submitNewApiKey} />

            {loading &&
                <div>Loading ... </div>
            }

            {!loading &&
                <>

                    {apiKeyIsInvalid &&
                        <div>
                            Your API Key is invalid.
                            Click <button
                                className={styles.buttonLink}
                                type="button"
                                onClick={() => setModalIsOpen(true)}>here</button> to enter a new one.
                        </div>
                    }


                    <h2>
                        File Rebuild Performance Test <span className={styles.newTestContainer}>
                            <svg className={styles.newTest} onClick={() => runNewTest()}></svg>
                        </span>
                    </h2>

                    <div className={styles.runningTests}>
                        <h2>No Tests Running</h2>
                    </div>
                </>
            }
        </div>
    );
};

export default RunTestsView;