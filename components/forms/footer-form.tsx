import React from "react";
import { Checkbox } from "../ui/checkbox"; // Ajuste o caminho conforme sua estrutura
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export interface FooterFormProps {
  text: string;
  linkText: string;
  onLinkClick?: () => void;
  showTerms?: boolean;
  termsAccepted?: boolean;
  onTermsChange?: (checked: boolean) => void;
}

export const FooterForm: React.FC<FooterFormProps> = ({
  text,
  linkText,
  onLinkClick,
  showTerms = false,
  termsAccepted = false,
  onTermsChange = () => {},
}) => {
  return (
    <div className="space-y-4">
      {showTerms && (
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked: boolean) => onTermsChange(checked)}
            className="mt-0.5"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-relaxed"
          >
            Concordo com os{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-blue-500 hover:text-blue-600"
            >
              Termos de Serviço
            </Button>{" "}
            e{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-blue-500 hover:text-blue-600"
            >
              Política de Privacidade
            </Button>
          </Label>
        </div>
      )}

      <Separator />

      <div className="text-center">
        <span className="text-gray-600 text-sm">{text} </span>
        <Button
          variant="link"
          onClick={onLinkClick}
          className="p-0 h-auto text-blue-500 hover:text-blue-600 font-semibold"
        >
          {linkText}
        </Button>
      </div>
    </div>
  );
};
