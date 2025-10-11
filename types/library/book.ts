interface Book {
  id: number;
  title: string;
  author: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddBookModalProps extends ModalProps {
  onSave: (title: string, author: string) => void;
}

interface EditBookModalProps extends ModalProps {
  onSave: (title: string, author: string) => void;
  book: Book;
}

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}
