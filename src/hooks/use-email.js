import { useState } from "react";
import emailjs from "@emailjs/browser";

const serviceId = "service_mt81aag";
const templateId = "template_j69osgm";
const publicKey = "vSOVWrVLzBl721pXk";

const defaultModalState = {
  show: false,
  error: false,
  title: "",
  message: "",
};

const useEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState(defaultModalState);

  const sendEmail = async (sendInfo) => {
    setIsLoading(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: sendInfo.name,
          from_email: sendInfo.email,
          reply_to: sendInfo.email,
          message: sendInfo.message,
          phone_number: sendInfo.phoneNumber,
        },
        publicKey
      );

      setModalState({
        show: true,
        error: false,
        title: "Wysłano wiadomość",
        message: "Twoja wiadomość została pomyślnie przesłana.",
      });
    } catch (err) {
      setModalState({
        show: true,
        error: true,
        title: `Wystąpił błąd ${err.status}`,
        message:
          "Sprawdź czy wprowadziłeś poprawne dane lub spróbuj ponownie później.",
      });
      console.error(err);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    modalState,
    sendEmail,
  };
};

export default useEmail;
