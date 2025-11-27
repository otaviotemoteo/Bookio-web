import Image from 'next/image';

interface DashboardCardProps {
  imageSrc: string;
  title: string;
  description: string;
  isCompleted: boolean;
  actionText: string;
  actionUrl: string;
}

export function DashboardCard({
  imageSrc,
  title,
  description,
  isCompleted,
  actionText,
  actionUrl,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      {/* Imagem */}
      <div className="mb-4">
        <Image 
          src={imageSrc} 
          alt={title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Título */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Descrição */}
      <p className="text-sm text-gray-600 mb-6 flex-grow">
        {description}
      </p>

      {/* Botão de ação */}
      {isCompleted ? (
        <button
          disabled
          className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <span>✓</span>
          Concluído
        </button>
      ) : (
        <a
          href={actionUrl}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}