import styles from "../assets/Home.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <section className={styles.hero}>
                <h1>
                    Smart Library <br />
                    <span>Resource Search</span>
                </h1>

                <p>
                    Search books, journals, research papers, PDFs, and videos using
                    keywords with fast and relevant results. Your gateway to knowledge.
                </p>

                <div className={styles.actions}>
                    <button onClick={() => navigate("/user")}>Start Searching →</button>
                    <button className={styles.secondary}>Learn More</button>
                </div>
            </section>
        </>
    );
};

export default Home;
