import Link from "next/link";
import styles from "../styles/Pagination.module.css";
import { useRouter } from "next/router";

export const Pagination = ({ totalCount }) => {
    const PER_PAGE = 6;
    const router = useRouter();

    const range = (start, end) => 
        [...Array(end - start + 1)].map((_, i) => start + i)

    return (
        <div className={styles.contents}>
            {range(1, Math.ceil(totalCount/PER_PAGE)).map((number, index) => (
                <Link href={`/Blog/page/${number}`} key={index} passHref>
                    <span className={
                        router.asPath === `/Blog/page/${number}` ?
                        styles.spanCurrent :
                        styles.span
                    }>
                        <a>{number}</a>
                    </span>
                </Link>
            ))}
        </div>
    )
};