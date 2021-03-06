import styles from "./Score.module.css";
export default function Score(props){
    return(
        <div className={styles.scoreDiv}>
            <label className={styles.leftCounter}>{props.scoreLeft}</label>
            <label className={styles.seperator}>:</label>
            <label className={styles.rightCounter}>{props.scoreRight}</label>
        </div>
    );
}