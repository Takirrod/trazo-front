import styles from "../styles/user/Home.module.css";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";
import Layout from "../components/layout/layout";
import SearchBar from "../components/input/searchbar";
import StickyCard from "../components/card/stickyCard";
import IconButton from "../components/button/iconButton";
import IconPlus from "../components/icons/plus";
import Navbar from "./navbar";
import NavbarAdmin from "./navbarAdmin";
import ReactModal from "react-modal";
import Input from "../components/input/input";
import ModalBase from "../components/modal/modal";
import ProgressBar from "../components/bar/progerssBar";
import { useRouter } from "next/router";
import { TrazoGuardado, TrazoHome } from "../types/Trazos";

// ReactModal.setAppElement("#main");

// const trazos = [1, 2, 3, 4, 5, 6, 7, 8];
const customStyles = {};

interface LayoutProps {
  isButton?: boolean;
  tittlePage?: string;
  modalAddButton?: React.ReactNode;
  onClickAddButton?: () => void;
  stickyNotes: TrazoGuardado[] | TrazoHome[]; // TODO: cambiar por el tipo de dato correcto
  onClickSitickyCard?: (trazo: TrazoGuardado | TrazoHome) => void;
}

function StickyNotesDefault({
  isButton = false,
  tittlePage = "Trazos",
  modalAddButton = <></>,
  onClickAddButton = () => { },
  stickyNotes = [],
  onClickSitickyCard = () => { },
}: LayoutProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 6;
  const router = useRouter();

  let roles = "";

  if (typeof window !== "undefined") {
    roles = localStorage.getItem("id_rol") || "";
  }

  const [rolesNumber, setRolesNumber] = useState<number[]>([]);

  useEffect(() => {
    if (roles) {
      setRolesNumber(JSON.parse(roles));
    }
  }, [roles]);

  return (
    <div className={styles.container}>
      <Layout
        navbar={rolesNumber.includes(1) ? <NavbarAdmin /> : <Navbar />}
        childrenheader={
          isButton ? (
            <IconButtonHeader
              modalAddButton={modalAddButton}
              onClickAddButton={onClickAddButton}
            />
          ) : (
            <></>
          )
        }
      >
        <div className={styles.container_header_home}>
          <h1>{tittlePage}</h1>
          <SearchBar />
        </div>

        <div className={styles.container_sticky_card}>
          {stickyNotes
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((trazo) => (
              <StickyCard
                OnClick={() => onClickSitickyCard(trazo)}
                background_color={randomColor({
                  luminosity: "light",
                  hue: "random",
                })}
                key={trazo.id}
                childHeader={<>{trazo.nombre}</>} //For Sticky Note
                childBody={<>{trazo.descripcion}</>}
                childFooter={<ProgressBar stepsNumber={trazo} />}
                align_items={"center"}
                justify_content={"center"}
              />
            ))}
        </div>
        <div className={styles.container_footer_home}>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={pagePostsLimit}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            totalItems={stickyNotes.length}
            pageNeighbours={2}
          />
        </div>
      </Layout>
    </div>
  );
}

function IconButtonHeader({
  onClickAddButton,
  modalAddButton,
}: {
  onClickAddButton: () => void;
  modalAddButton: React.ReactNode;
}) {
  return (
    <div id="main" className={styles.iconbtn_container}>
      <IconButton
        icon={
          <IconPlus
            width={"100%"}
            height={"100%"}
            className={styles.iconPlus}
          />
        }
        onClick={onClickAddButton}
      />
      {modalAddButton}
    </div>
  );
}

export default StickyNotesDefault;
