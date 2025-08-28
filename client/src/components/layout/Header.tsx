import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface HeaderProps {
  titleKey: string;
  descriptionKey: string;
}

export default function Header({ titleKey, descriptionKey }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground" data-testid="text-page-title">
            {t(titleKey)}
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-page-description">
            {t(descriptionKey)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Sistema Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
