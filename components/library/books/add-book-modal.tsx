"use client";

import React, { useState, useEffect } from "react";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, author: string) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = () => {
    if (title.trim() && author.trim()) {
      onSave(title, author);
      setTitle("");
      setAuthor("");
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-center items-center p-4 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Adicionar Novo Livro
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                onFocus={(e) => {
                  e.target.style.borderColor = "rgb(58, 123, 236)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(58, 123, 236, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgb(209, 213, 219)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Digite o nome do autor..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                onFocus={(e) => {
                  e.target.style.borderColor = "rgb(58, 123, 236)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(58, 123, 236, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgb(209, 213, 219)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
              style={{ backgroundColor: "rgb(58, 123, 236)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(48, 108, 206)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(58, 123, 236)")
              }
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
