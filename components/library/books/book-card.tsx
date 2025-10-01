import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-700">{author}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaEdit className="inline mr-1" /> Editar
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaTrashAlt className="inline mr-1" /> Excluir
        </button>
      </div>
    </div>
  );
};

export default BookCard;
