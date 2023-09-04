import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <React.Fragment>
      <div>
        <CircularProgress
          style={{
            display: "block",
            margin: "auto",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Loading;
