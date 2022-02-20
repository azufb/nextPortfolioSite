import styles from "../styles/Top.module.css";

export default function Top() {
    return (
        <div className={styles.contents}>
            <h1>Welcome</h1>
            <div>
                <p>
                    ご来訪頂き、ありがとうございます！<br />
                    こちらは、Azuのポートフォリオサイトです！<br />
                    個人開発で開発したものや私自身の経歴を掲載しております。
                </p>
            </div>
        </div>
    )
}