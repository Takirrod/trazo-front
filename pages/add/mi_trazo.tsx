import StickyNotesDefault from "../../views/sticky_notes_general";

export default function MiTrazo() {
  const trazos = [1, 2, 3, 4, 5];

  return (
    <StickyNotesDefault stickyNotes={trazos} tittlePage="Trazos Terminados" />
  );
}
