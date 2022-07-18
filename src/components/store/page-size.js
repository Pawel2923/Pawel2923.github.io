import React from "react";

const PageInfoCtx = React.createContext({
    screenWidth: window.innerWidth,
});

export default PageInfoCtx;