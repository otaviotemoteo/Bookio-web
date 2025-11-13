"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Loader2 } from "lucide-react";
import { useBook } from "../../../hooks/use-book";
import { Book, BookGender } from "../../../types/index";

const bookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").optional(),
  author: z.string().min(1, "Autor é obrigatório").optional(),
  gender: z
    .enum([
      "Fiction",
      "NonFiction",
      "Fantasy",
      "ScienceFiction",
      "Mystery",
      "Romance",
      "Thriller",
      "Horror",
      "Biography",
      "History",
      "Poetry",
      "SelfHelp",
    ])
    .optional(),
  year: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (formato: AAAA-MM-DD)")
    .optional(),
  available: z.number().min(0, "Quantidade deve ser no mínimo 0").optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book: Book;
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

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  book,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    book.imageUrl || null
  );
  const { updateBook, isLoading, error } = useBook();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      gender: book.gender,
      year: book.year,
      available: book.available,
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      reset({
        title: book.title,
        author: book.author,
        gender: book.gender,
        year: book.year,
        available: book.available,
      });
      setImagePreview(book.imageUrl || null);
      setImageFile(null);
    }
  }, [isOpen, book, reset]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      reset();
      setImageFile(null);
      setImagePreview(null);
      onClose();
    }, 200);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: BookFormData) => {
    // Remove campos undefined
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const result = await updateBook(
      book.id.toString(),
      updateData,
      imageFile || undefined
    );

    if (result.success) {
      handleClose();
      onSuccess();
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
        className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Editar Livro
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Upload de Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem da Capa
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Autor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                {...register("author")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Gênero e Ano */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gênero
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(GENDER_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano de Publicação
                </label>
                <input
                  type="date"
                  {...register("year")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.year.message}
                  </p>
                )}
              </div>
            </div>

            {/* Quantidade Disponível */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade Disponível
              </label>
              <input
                type="number"
                {...register("available", { valueAsNumber: true })}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.available && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.available.message}
                </p>
              )}
            </div>

            {/* Erro geral */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
