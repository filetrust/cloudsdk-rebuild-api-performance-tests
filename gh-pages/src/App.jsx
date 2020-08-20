import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    NavBar,
    Nav,
    NavButton,
    ExpandButton,
    NavSpacer,
    NavLabel
} from "./components/GlasswallNav/GlasswallNav";
import Main from "./components/Main/Main";
import SplashScreenView from "./views/SplashScreenView/SplashScreenView";
import ArchitectureView from "./views/ArchitectureView/ArchitectureView";
import ResultsTableView from "./views/FileRebuildPerformanceTest/ResultsTableView/ResultsTableView";
import RunTestsView from "./views/FileRebuildPerformanceTest/RunTestsView/RunTestsView";
import ResultsGraphView from "./views/FileRebuildPerformanceTest/ResultsGraphView/ResultsGraphView";

import styles from "./App.module.scss";

import "./animate.css";

const App = () => {
    const [apiKey, setApiKey] = useState("");
    const [apiKeyConfirmed, setApiKeyConfirmed] = useState(false);
    const [mainTitle, setMainTitle] = useState("");
    const [navExpanded, setNavExpanded] = useState(true);
    const [selectedNavButton, setSelectedNavButton] = useState("");

    const submitApiKey = async e => {
        e.preventDefault();
        setApiKeyConfirmed(true);
    };

    const onLoad = (title, selectedButton) => {
        setMainTitle(title);
        setSelectedNavButton(selectedButton);
    };

    useEffect(() => {
        if (!apiKeyConfirmed) {
            setApiKey("");
        }
    }, [apiKeyConfirmed, setApiKey]);

    return (
        <div className={styles.app}>
            <div className={styles.mainContainer}>
                {!apiKeyConfirmed &&
                    <SplashScreenView changeHandler={setApiKey} submitApiKey={submitApiKey} />
                }

                {apiKeyConfirmed &&
                    <Router>
                        <NavBar expanded={navExpanded} logo>
                            <Nav expanded={navExpanded}>
                                <Link to="/">
                                    <NavButton selected={selectedNavButton === "Architecture"}>
                                        Architecture
                                    </NavButton>
                                </Link>

                                <NavSpacer />

                                <NavLabel label="FileRebuildPerformanceTest" />
                                <Link to="/filerebuilderformancetest/runtest">
                                    <NavButton selected={selectedNavButton === "/filerebuilderformancetest/runtest"}>
                                        Run
                                    </NavButton>
                                </Link>
                                <Link to="/filerebuilderformancetest/results/table">
                                    <NavButton selected={selectedNavButton === "/filerebuilderformancetest/results/table"}>
                                        Results Table
                                    </NavButton>
                                </Link>
                                <Link to="/filerebuilderformancetest/results/graph">
                                    <NavButton selected={selectedNavButton === "/filerebuilderformancetest/results/graph"}>
                                        Results Graph
                                    </NavButton>
                                </Link>
                            </Nav>

                            <Nav expanded={navExpanded} bottom>
                                <Link to="/">
                                    <NavButton clickHandler={() => setApiKeyConfirmed(false)}>
                                        Logout
                                    </NavButton>
                                </Link>
                            </Nav>

                            <ExpandButton
                                expanded={navExpanded}
                                clickHandler={() => setNavExpanded(!navExpanded)} />
                        </NavBar>

                        <Main expanded={navExpanded} showTitle title={mainTitle}>
                            <Switch>
                                <Route exact path="/">
                                    <ArchitectureView onLoad={onLoad} />
                                </Route>

                                <Route path="/filerebuilderformancetest/runtest">
                                    <RunTestsView
                                        onLoad={onLoad}
                                        apiKey={apiKey}
                                        updateApiKey={setApiKey} />
                                </Route>

                                <Route path="/filerebuilderformancetest/results/table">
                                    <ResultsTableView
                                        onLoad={onLoad}
                                        apiKey={apiKey}
                                        updateApiKey={setApiKey} />
                                </Route>

                                <Route path="/filerebuilderformancetest/results/graph">
                                    <ResultsGraphView
                                        onLoad={onLoad}
                                        apiKey={apiKey}
                                        updateApiKey={setApiKey} />
                                </Route>
                            </Switch>
                        </Main>
                    </Router>
                }
            </div>
        </div>
    );
};

export default App;
