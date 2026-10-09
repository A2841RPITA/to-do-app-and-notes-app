function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function NoteItem({ note, onEdit, onDelete }) {
  const categoryClass = note.category.toLowerCase();

  return (
    <article className={`note-card category-${categoryClass}`}>
      <div className="note-card-top">
        <span className={`category-badge ${categoryClass}`}>
          {note.category}
        </span>
        <span className="note-symbol">✦</span>
      </div>

      <h3>{note.title}</h3>
      <p className="note-content">{note.content}</p>

      <div className="note-timestamps">
        <p>Created: {formatDate(note.createdAt)}</p>
        <p>Updated: {formatDate(note.updatedAt)}</p>
      </div>

      <div className="note-actions">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteItem;