import styles from "./construction-tools.module.css";

const ToolCard = ({ title, description, children }) => {
    return (
        <section className={styles.toolCard}>
            <h3>{title}</h3>
            {description ? <p className={styles.mutedText}>{description}</p> : null}
            {children}
        </section>
    );
};

export default ToolCard;

