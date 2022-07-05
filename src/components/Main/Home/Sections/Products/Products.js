import Button from "components/UI/Button/Button";

import styles from "./Products.module.css";

const Products = (props) => {
    return (
        <section className={`${props.className} ${styles.products}`} id="products">
            <h1>Produkty</h1>
            <p>
                W naszym sklepie oferujemy szeroką gamę produktów do pielęgnacji zarostu. Gwarantujemy twoje zadowolenie z zakupów.
            </p>
            <div className={styles.button}>
                <p>
                    Katalog produktów
                </p>
                <Button className={styles.button}>Przeglądaj</Button>
            </div>
        </section>
    );
};

export default Products;