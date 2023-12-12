import Link from "next/link";
import styles from "@/styles/navbar.module.css"
import { useSession } from "next-auth";

export default function Navbar({ links }){
    return(
        <>
            <nav className={styles.nav}>
                <div className={styles.navContent}>
                    
                </div>
                <div className={styles.navLinks}>
                    <div className={styles.rightNavLink}>
                        {links.map(link => {
                            return(
                                <div className={styles.link} key={link.key}>
                                    <Link href={link.link}>{link.name}</Link>
                                </div>
                            );
                        })}
                    </div>  
                    <div className={styles.leftNavLink}>
                        <div className={styles.link}>
                            <Link href={'/login'}>Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}