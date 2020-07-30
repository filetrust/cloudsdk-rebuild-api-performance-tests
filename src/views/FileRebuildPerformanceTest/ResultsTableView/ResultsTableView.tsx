import React, { useState, useCallback } from "react";
import ApiKeyModal from "../../../components/ApiKeyModal/ApiKeyModal";
import ResultsTable from "./ResultsTable/ResultsTable";
import useMountEffect from "../../../components/useMountEffect";

import styles from "./ResultsTableView.module.scss";

export interface ResultsViewProps {
    apiKey: string,
    onLoad: Function,
    updateApiKey: Function
}

const ResultsView = (props: ResultsViewProps) => {
    const getResultsUrl = "https://cqxec6akld.execute-api.eu-west-1.amazonaws.com/prod/filerebuildperformancetest/getresults";

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [apiKeyIsInvalid, setApiKeyIsInvalid] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const getResults = useCallback(async (apiKey?) => {
        try {
            const response = await fetch(getResultsUrl, {
                method: "GET",
                headers: {
                    "x-api-key": apiKey ?? props.apiKey
                }
            });

            let responseString = await response.json();

            if (response.ok) {
                setResults(JSON.parse(responseString));
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
    }, [setResults, props.apiKey, setApiKeyIsInvalid, setLoading]);

    useMountEffect(() => {
        props.onLoad("FileRebuildPerformanceTest | Results Table", "/filerebuilderformancetest/results/table");
        getResults();
    });

    const submitNewApiKey = async (newApiKey: string) => {
        setModalIsOpen(false);
        props.updateApiKey(newApiKey);
        await setLoading(true);
        getResults(newApiKey);
    };

    return (
        <div className={styles.resultsPageContainer}>
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

                    {!apiKeyIsInvalid &&
                        <ResultsTable results={results} />
                    }
                </>
            }
        </div>
    );
};

export default ResultsView;