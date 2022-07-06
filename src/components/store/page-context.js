import React from 'react';

const PageContext = React.createContext({
    pageName: "home",
    changeHandler: () => {},
});

export default PageContext;