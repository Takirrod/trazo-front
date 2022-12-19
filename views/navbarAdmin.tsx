import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/view/Navbar.module.css";

const NavbarAdmin = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Link className={styles.brand_title} href={"/user/home"}>
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
              <Link href="/user/in_process">En proceso</Link>
            </li>
            <li>
              <Link href="/user/finished">Terminados</Link>
            </li>
            <li>
              <Link href="/user/add">Trazos</Link>
            </li>
            <li>
              <Link href="/admin/users">Administracion</Link>
            </li>
            <li>
              <Link href="/user/home"> Mis Trazos</Link>
            </li>
            <li onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token")
              signOut({ callbackUrl: "/" })

            }}>
              <Link href="/auth/login">Cerrar Sesion</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
