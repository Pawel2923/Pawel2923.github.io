import Button from "components/UI/Button/Button";
import styles from "./Aside.module.css";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <ul>
        <li><Button>Sortuj</Button></li>
        <li><Button>Filtruj</Button></li>
      </ul>
    </aside>
  );
};

export default Aside;
