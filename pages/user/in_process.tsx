import StickyNotesDefault from "../../views/sticky_notes_general";

function InProcess() {
  const trazos = [1, 2, 3, 4, 5, 6, 7, 8];

  return <StickyNotesDefault stickyNotes={trazos} tittlePage="Trazos Acabados" />;
}

export default InProcess;
