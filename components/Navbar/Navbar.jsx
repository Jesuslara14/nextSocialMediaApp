import Link from "next/link";
import styles from "@/styles/navbar.module.css"

export default function Navbar(){
    const links = [
        {link: '/', name: 'Home', key: 0},
        {link: '/chat', name: 'Chat', key: 1},
        {link: '/profile', name: 'Profile', key: 2}
    ];
    
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