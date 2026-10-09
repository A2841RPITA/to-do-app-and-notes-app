import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes-app-data");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes-app-data", JSON.stringify(notes));
  }, [notes]);

  function addNote(noteData) {
    const now = new Date().toISOString();

    const newNote = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    setNotes((previousNotes) => [newNote, ...previousNotes]);
  }

  function updateNote(noteData) {
    const now = new Date().toISOString();

    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === editingNote.id
          ? { ...note, ...noteData, updatedAt: now }
          : note
      )
    );

    setEditingNote(null);
  }

  function deleteNote(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );

    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  }

  const filteredNotes = notes.filter((note) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || note.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-icon">✎</div>

        <p className="eyebrow">YOUR PERSONAL SPACE</p>
        <h1>My Notes App</h1>

        <p className="hero-subtitle">
          Capture your thoughts. Organize your ideas.
        </p>

        <div className="hero-stats">
          <div>
            <strong>{notes.length}</strong>
            <span>Total Notes</span>
          </div>

          <div>
            <strong>{notes.filter((n) => n.category === "Study").length}</strong>
            <span>Study Notes</span>
          </div>

          <div>
            <strong>{notes.filter((n) => n.category === "Work").length}</strong>
            <span>Work Notes</span>
          </div>
        </div>
      </header>

      <div className="workspace">
        <NoteForm
          key={editingNote?.id ?? "new-note"}
          initialNote={editingNote}
          onSave={editingNote ? updateNote : addNote}
          onCancel={() => setEditingNote(null)}
        />

        <section className="notes-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR COLLECTION</p>
              <h2>All Your Notes</h2>
              <p>Search, organize and manage your notes.</p>
            </div>

            <span className="note-count">
              {filteredNotes.length} notes
            </span>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search by title or content..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-filters">
            {["All", "Personal", "Study", "Work", "Other"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-button ${
                    category === item ? "active" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <NoteList
            notes={filteredNotes}
            onEdit={setEditingNote}
            onDelete={deleteNote}
          />
        </section>
      </div>

      <footer className="app-footer">
        Made with React · Keep your ideas organized ✨
      </footer>
    </main>
  );
}

export default App;