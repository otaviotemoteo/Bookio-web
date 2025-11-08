import { Edit2, Trash2, BookOpen, Calendar, Package } from "lucide-react";
import { Book, BookGender } from "../../../types/index";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const GENDER_LABELS: Record<BookGender, string> = {
  Fiction: "Ficção",
  NonFiction: "Não-ficção",
  Fantasy: "Fantasia",
  ScienceFiction: "Ficção Científica",
  Mystery: "Mistério",
  Romance: "Romance",
  Thriller: "Thriller",
  Horror: "Terror",
  Biography: "Biografia",
  History: "História",
  Poetry: "Poesia",
  SelfHelp: "Autoajuda",
};

const GENDER_COLORS: Record<BookGender, string> = {
  Fiction: "bg-purple-100 text-purple-700",
  NonFiction: "bg-gray-100 text-gray-700",
  Fantasy: "bg-pink-100 text-pink-700",
  ScienceFiction: "bg-blue-100 text-blue-700",
  Mystery: "bg-indigo-100 text-indigo-700",
  Romance: "bg-red-100 text-red-700",
  Thriller: "bg-orange-100 text-orange-700",
  Horror: "bg-slate-100 text-slate-700",
  Biography: "bg-green-100 text-green-700",
  History: "bg-amber-100 text-amber-700",
  Poetry: "bg-cyan-100 text-cyan-700",
  SelfHelp: "bg-teal-100 text-teal-700",
};

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Imagem da Capa */}
      {book.imageUrl ? (
        <div className="h-64 overflow-hidden bg-gray-100">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <BookOpen className="w-20 h-20 text-gray-400" />
        </div>
      )}

      <div className="p-6">
        {/* Badge de Gênero */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              GENDER_COLORS[book.gender]
            }`}
          >
            {GENDER_LABELS[book.gender]}
          </span>
        </div>

        {/* Título e Autor */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-sm">por</span>
            <span className="font-medium">{book.author}</span>
          </p>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(book.year)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4" />
            <span
              className={`font-medium ${
                book.available > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.available > 0
                ? `${book.available} ${
                    book.available === 1
                      ? "unidade disponível"
                      : "unidades disponíveis"
                  }`
                : "Indisponível"}
            </span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => onDelete(book.id)}
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
