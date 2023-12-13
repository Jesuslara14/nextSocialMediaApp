import Link from "next/link";
import styles from "@/styles/navbar.module.css"
import { useSession } from "next-auth";

export default function Navbar({ links }){
    return(
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <div className={styles.navTitleWrapper}>

                </div>
            </div>
            <div className={styles.navLinks}>
                {links.map(link => {
                    return(
                        <div className={styles.link} key={link.key}>
                            <Link href={link.link}>{link.name}</Link>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}