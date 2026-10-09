import { useState } from "react";

function NoteForm({ initialNote, onSave, onCancel }) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [category, setCategory] = useState(
    initialNote?.category ?? "Personal"
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
    });

    if (!initialNote) {
      setTitle("");
      setContent("");
      setCategory("Personal");
    }
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <div>
          <p className="eyebrow">WRITE SOMETHING</p>
          <h2>{initialNote ? "Edit Note" : "Create a Note"}</h2>
        </div>
        <span className="form-icon">✦</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="note-title">Note Title</label>
        <input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          maxLength={100}
          required
        />

        <label htmlFor="note-content">Note Content</label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={5}
          maxLength={5000}
          required
        />

        <label htmlFor="note-category">Category</label>
        <select
          id="note-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {initialNote ? "Save Changes" : "+ Add Note"}
          </button>

          {initialNote && (
            <button
              className="secondary-button"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default NoteForm;