import React from "react";
import LogDetail from "./LogDetail";

const Log = ({ user, results }) => {
  return results.map((result) => (
    <div key={result.id}>
      <LogDetail result={result} />
    </div>
  ));
};

export default Log;
