import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    NavBar,
    Nav,
    NavButton,
    ExpandButton,
    NavSpacer
} from "./components/GlasswallNav/GlasswallNav";
import Main from "./components/Main/Main";
import GlasswallModal from "./components/GlasswallModal/GlasswallModal";
import SplashScreenView from "./views/SplashScreenView/SplashScreenView";
import ArchitectureView from "./views/ArchitectureView/ArchitectureView";
import ResultsView from "./views/ResultsView/ResultsView";
import RunTestsView from "./views/RunTestsView/RunTestsView";

import styles from "./App.module.scss";

const App = () => {
    const [apiKey, setApiKey] = useState("");
    const [apiKeyConfirmed, setApiKeyConfirmed] = useState(false);
    const [mainTitle, setMainTitle] = useState("");
    const [navExpanded, setNavExpanded] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const submitApiKey = async e => {
        e.preventDefault();
        setApiKeyConfirmed(true);
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
                                    <NavButton>
                                        Architecture
                                    </NavButton>
                                </Link>

                                <NavSpacer />

                                <Link to="/results">
                                    <NavButton>
                                        Test Results
                                    </NavButton>
                                </Link>

                                <Link to="/runtest">
                                    <NavButton>
                                        Run a Test
                                    </NavButton>
                                </Link>
                            </Nav>

                            <Nav expanded={navExpanded} bottom>
                                <NavButton clickHandler={() => setApiKeyConfirmed(false)}>
                                    Logout
                                </NavButton>
                            </Nav>

                            <ExpandButton
                                expanded={navExpanded}
                                clickHandler={() => setNavExpanded(!navExpanded)} />
                        </NavBar>

                        <Main expanded={navExpanded} showTitle title={mainTitle}>
                            <Switch>
                                <Route exact path="/">
                                    <ArchitectureView onLoad={setMainTitle}/>
                                </Route>

                                <Route path="/results">
                                    <ResultsView onLoad={setMainTitle} apiKey={apiKey} />
                                </Route>

                                <Route path="/runtest">
                                    <RunTestsView onLoad={setMainTitle} />
                                </Route>

                            </Switch>
                        </Main>

                        <GlasswallModal isOpen={modalIsOpen} onCloseAction={() => setModalIsOpen(false)} />
                    </Router>
                }
            </div>
        </div>
    );
};

export default App;
