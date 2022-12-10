import Link from "next/link";
import React from "react";
import styles from "../styles/view/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href={"/user/home"}>

        <div className={styles.brand_title}>Trazo!</div>

        </Link>
        <div
          className={styles.toggle_button}
          onClick={() => {
            const NavLinks = document.getElementsByClassName("navbar_links")[0];
            NavLinks.classList.toggle("active");
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={styles.navbar_links}>
          <ul>
        
            <li>
              <Link href="/contact">Mis Trazos</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
