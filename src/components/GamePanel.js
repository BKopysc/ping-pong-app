import Canvas from "./Canvas";
import Counter from "./Counter";
import styles from "./GamePanel.module.css"

export default function GamePanel(props) {

    return (
        <div>
            <Canvas />
            <div className={styles.divNav}>
                <button className={styles.pauseButton}>Pause</button>
                <div className={styles.divCounter}>
                    <Counter className={styles.counter1}/>
                    <label className={styles.seperator}>:</label>
                    <Counter className={styles.counter2}/>
                </div>
                <button className={styles.restartButton}>Restart</button>
            </div>
        </div>
    );
}