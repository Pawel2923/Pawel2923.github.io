import Contact from "components/UI/Contact/Contact";
import "./ContactPage.css";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <Contact showMap={true} />
        </div>
    );
};

export default ContactPage;