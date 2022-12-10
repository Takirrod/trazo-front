import StickyNotesDefault from "../../views/sticky_notes_general";

export default function Finished() {
  const trazos = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <StickyNotesDefault stickyNotes={trazos} tittlePage="Trazos Terminados" />
  );
}
