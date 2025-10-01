import { Edit2, Trash2 } from "lucide-react";
interface BookCardProps {
  id: number;
  title: string;
  author: string;
  onEdit: (book: { id: number; title: string; author: string }) => void;
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="text-sm">por</span>
              <span className="font-medium">{author}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit({ id, title, author })}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => onDelete(id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
