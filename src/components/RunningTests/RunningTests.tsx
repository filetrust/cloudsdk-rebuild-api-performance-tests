import React, { useState, useCallback, useEffect } from "react";

import styles from "./RunningTests.module.scss";

export interface RunningTestsProps { apiKey: string };

const useMountEffect = (fun: any) => useEffect(fun, []);

const RunningTests = (props: RunningTestsProps) => {
    const getRunningTestsUrl = "https://cqxec6akld.execute-api.eu-west-1.amazonaws.com/prod/filerebuildperformancetest/getrunningtests";

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTests = useCallback(async (apiKey?: string) => {
        try {
            const response = await fetch(getRunningTestsUrl, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey ?? props.apiKey
                }
            });

            let responseString = await response.json();

            if (response.ok) {
                setTests(JSON.parse(responseString));
            }
            else {
                if (responseString.message === "Forbidden") {
                    console.error(`Error ${response.status}. Invalid API Key`)
                }
                else {
                    console.error(`Error ${response.status}. ${responseString}`);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }, [setTests, props.apiKey, setLoading]);

    useMountEffect(() => {
        getTests();
    });

    return (
        <>
            {loading &&
                <div>Loading ... </div>
            }

            {!loading &&
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Status</th>
                            <th>Task Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.length === 0 && 
                            <tr>
                                <td colSpan={3} style={{textAlign: "center"}}>No Tests Running.</td>
                            </tr>
                        }

                        {tests.map(test => {
                            return (
                                <tr key={test.timestamp}>
                                    <td>{test.timestamp}</td>
                                    <td>{test.status}</td>
                                    <td>{test.group}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </>
    )
};

export default RunningTests;