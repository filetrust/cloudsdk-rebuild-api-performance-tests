import React, { useState } from "react";

import styles from "./ApiKeyModal.module.scss";

export interface BodyProps { submitFunction: Function };

function Body(props: BodyProps) {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className={styles.body}>
      <h2>Enter a new API Key</h2>

      <form onSubmit={e => {
        e.preventDefault(); props.submitFunction(apiKey)
      }}>
        <input type="text"
          placeholder="API Key"
          onChange={e => setApiKey(e.target.value)}></input>

        <button type="submit">Submit</button>
      </form>
    </div >
  );
}

export default Body;