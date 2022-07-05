import styles from "./Footer.module.css";

const Footer = (props) => {
    return (
        <footer className={styles.footer} style={props.style}>
            <p>Wszelkie prawa zastrzeżone &copy; 2022</p>
        </footer>
    );
};

export default Footer;