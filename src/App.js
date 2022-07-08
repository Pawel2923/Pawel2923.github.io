import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import BackToTop from "components/UI/BackToTop/BackToTop";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Cookies from "components/UI/Cookies/Cookies";
import PageInfoCtx from "components/store/page-size";

const App = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [scrollPos, setScrollPos] = useState(window.scrollY);

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

  useEffect(() => {
    let scrolling = false;

    window.addEventListener("scroll", () => {
      scrolling = true;
    });

    setInterval(() => {
      if (scrolling) {
        scrolling = false;

        setScrollPos(window.scrollY);
      }
    }, 100);
  }, []);

  return (
    <PageInfoCtx.Provider
      value={{
        screenWidth: screenSize,
        scrollFromTop: scrollPos,
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
