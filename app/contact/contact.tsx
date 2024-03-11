import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1>Contact</h1>
      <p>
        Plac Tadeusza Kościuszki 45, <br />
        22-460 Szczebrzeszyn
      </p>
      <p>exclusive@gmail.com</p>
      <p>+688 987 654 321</p>
    </div>
  );
}
