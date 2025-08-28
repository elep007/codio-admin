import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { MetricCard } from "@/components/ui/metric-card";
import { Target, Users, Key, TrendingUp, Link, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { data: metrics = {}, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="metric-card rounded-lg p-6 animate-pulse">
              <div className="h-20 bg-accent rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={t("dashboard.targetsCapture")}
          value={(metrics as any)?.totalTargets || 0}
          change={t("dashboard.thisMonth")}
          changeType="positive"
          icon={Target}
          iconColor="text-red-500"
        />
        
        <MetricCard
          title={t("dashboard.uniqueVisitors")}
          value={(metrics as any)?.uniqueVisitors || 0}
          change={t("dashboard.last24h")}
          changeType="neutral"
          icon={Users}
          iconColor="text-blue-500"
        />
        
        <MetricCard
          title={t("dashboard.activeLicenses")}
          value={(metrics as any)?.activeLicenses || 0}
          change={t("dashboard.checkers")}
          changeType="neutral"
          icon={Key}
          iconColor="text-purple-500"
        />
        
        <MetricCard
          title={t("dashboard.conversionRate")}
          value={`${(metrics as any)?.conversionRate || 0}%`}
          change={t("dashboard.performance")}
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Page Card */}
        <div className="metric-card rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Link className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t("dashboard.activePage")}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground mb-2">URL Atual:</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  className="flex-1 bg-input border-border text-foreground"
                  value=""
                  placeholder="Nenhuma página ativa"
                  readOnly
                  data-testid="input-current-url"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-accent hover:bg-accent/80"
                  data-testid="button-copy-url"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-foreground">Status da Página</span>
              <span className="text-sm text-green-500 ml-auto" data-testid="text-page-status">Online</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Para solicitar alterações no link, entre em contato com o suporte.
            </p>
          </div>
        </div>
        
        {/* Available Banks Card */}
        <div className="metric-card rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t("dashboard.availableBanks")}</h3>
          </div>
          
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-2">{t("dashboard.totalBanks")}</p>
            <p className="text-3xl font-bold text-foreground" data-testid="text-total-banks">
              {(metrics as any)?.totalBanks || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
