import React, { useState } from "react";

interface BookFormProps {
  onSave: (title: string, author: string) => void;
  book?: { title: string; author: string };
}

const BookForm: React.FC<BookFormProps> = ({ onSave, book }) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, author); // Passa o título e autor ao clicar em "Salvar"
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-gray-700">
          Autor
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
};

export default BookForm;
