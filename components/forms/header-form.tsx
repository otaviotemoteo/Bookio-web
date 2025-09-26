import { BookOpen } from "lucide-react";
import { CardHeader } from "../ui/card";

interface HeaderFormProps {
  title: string;
  subtitle: string;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ title, subtitle }) => {
  return (
    <CardHeader className="text-center space-y-4 pb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Bookio
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </CardHeader>
  );
};
