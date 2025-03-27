// components/DeleteButton.jsx
import { useState } from "react";

export default function DeleteButton({ onDelete, song }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${song.name}?`)) {
      setIsDeleting(true);
      try {
        const success = await window.electron?.deleteSong(song.url.replace('file://', ''));
        if (success) {
          onDelete();
        }
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700"
      title="Delete song"
    >
      {isDeleting ? "Deleting..." : "🗑️"}
    </button>
  );
}
