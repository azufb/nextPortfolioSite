import Router from "next/router";
import Link from "next/link";
import styles from "../styles/Pagination.module.css";

export const Pagination = ({ totalCount }) => {
    const PER_PAGE = 5;

    const range = (start, end) => 
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <div>
            {range(1, Math.ceil(totalCount/PER_PAGE)).map((number, index) => (
                <span key={index} className={styles.span}>
                    <Link href={`/Works/page/${number}`}>
                        <a>{number}</a>
                    </Link>
                </span>
            ))}
        </div>
    );
};