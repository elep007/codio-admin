import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor,
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="metric-card rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground" data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}-title`}>
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground" data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}-value`}>
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${getChangeColor()}`} data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}-change`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${iconColor}/20 rounded-full flex items-center justify-center`}>
          <Icon className={`${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
