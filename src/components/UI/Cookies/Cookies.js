import CookieConsent from "react-cookie-consent";

import classes from "../Button/Button.module.css";

const Cookies = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuj"
      disableButtonStyles={true}
      buttonClasses={classes.button}
      buttonStyle={{ margin: "15px" }}
    >
      Ta strona wymaga plików cookies do prawidłowego działania.
    </CookieConsent>
  );
};

export default Cookies;
