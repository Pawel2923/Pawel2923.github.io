import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import BackToTop from "components/UI/BackToTop/BackToTop";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Cookies from "components/UI/Cookies/Cookies";
import PageInfoCtx from "components/store/page-size";

const App = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    let resizing = false;

    window.addEventListener("resize", () => {
      resizing = true;
    });

    setInterval(() => {
      if (resizing) {
        resizing = false;

        setScreenSize(window.innerWidth);
      }
    }, 100);
  }, []);

  return (
    <PageInfoCtx.Provider
      value={{
        screenWidth: screenSize,
      }}
    >
      <Header />
      <BackToTop />
      <Main />
      <Footer />
      <Cookies />
    </PageInfoCtx.Provider>
  );
};

export default App;
