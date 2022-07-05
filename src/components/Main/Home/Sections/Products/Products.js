import Button from "components/UI/Button/Button";

const Prodcuts = (props) => {
    return (
        <section className={props.className}>
            <h1>Produkty</h1>
            <p>
                W naszym sklepie oferujemy szeroką gamę produktów do pielęgnacji zarostu. Gwarantujemy twoje zadowolenie z zakupów.
            </p>
            <div className="button">
                <span>
                    Katalog produktów
                </span>
                <Button>Przeglądaj</Button>
            </div>
        </section>
    );
};

export default Prodcuts;