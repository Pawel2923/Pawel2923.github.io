import React from "react";

const PageInfoCtx = React.createContext({
    screenWidth: window.innerWidth,
    // scrollFromTop: window.scrollY,
});

export default PageInfoCtx;