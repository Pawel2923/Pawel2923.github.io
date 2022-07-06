import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import PageContext from "components/store/page-context";

const App = () => {
  const [pageName, setPageName] = useState("home");

  const pageNameChangeHandler = (value) => {
    setPageName(value);
  };

  return (
    <PageContext.Provider
      value={{
        pageName: pageName,
        changeHandler: pageNameChangeHandler,
      }}
    >
      <Header />
      <Main />
      <Footer />
    </PageContext.Provider>
  );
};

export default App;
