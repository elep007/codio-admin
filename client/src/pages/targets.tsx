import { useQuery } from "@tanstack/react-query";
import { MetricCard } from "@/components/ui/metric-card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Crosshair, Smartphone, Monitor, TrendingUp, Download, Filter, RefreshCw } from "lucide-react";

export default function TargetsPage() {
  const { data: targets = [], isLoading } = useQuery({
    queryKey: ["/api/targets"],
  });

  // Calculate metrics from targets data
  const targetList = Array.isArray(targets) ? targets : [];
  const totalTargets = targetList.length;
  const mobileTargets = targetList.filter((t: any) => t.device === "mobile").length;
  const desktopTargets = targetList.filter((t: any) => t.device === "desktop").length;
  const bankDataTargets = targetList.filter((t: any) => t.bankDetails).length;

  const columns = [
    {
      key: "createdAt",
      header: "Data",
      render: (value: string) => {
        if (!value) return "-";
        return new Date(value).toLocaleDateString("pt-BR");
      },
    },
    {
      key: "name",
      header: "Nome",
      render: (value: string) => value || "-",
    },
    {
      key: "cpf",
      header: "CPF",
      render: (value: string) => value || "-",
    },
    {
      key: "bankId",
      header: "Banco",
      render: (value: string) => {
        if (!value) return "-";
        return (
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white text-xs">B</span>
          </div>
        );
      },
    },
    {
      key: "bankDetails",
      header: "Detalhes Bancários",
      render: (value: string) => value || "-",
    },
    {
      key: "phone",
      header: "Telefone",
      render: (value: string) => value || "-",
    },
    {
      key: "device",
      header: "Dispositivo",
      render: (value: string) => value || "-",
    },
    {
      key: "actions",
      header: "Ações",
      render: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
            Ver
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10">
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Central de Targets</h2>
          <p className="text-muted-foreground">
            Gerencie e monitore seus targets com <span className="text-primary">máxima eficiência</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="bg-accent hover:bg-accent/80"
            data-testid="button-export-csv"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            data-testid="button-advanced-filters"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>
          <Button 
            variant="outline" 
            className="bg-accent hover:bg-accent/80"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Targets"
          value={totalTargets}
          change="+75%"
          changeType="positive"
          icon={Crosshair}
          iconColor="text-blue-500"
        />
        
        <MetricCard
          title="Dispositivos Móveis"
          value={mobileTargets}
          change="+12%"
          changeType="positive"
          icon={Smartphone}
          iconColor="text-green-500"
        />
        
        <MetricCard
          title="Desktops"
          value={desktopTargets}
          change="-4%"
          changeType="negative"
          icon={Monitor}
          iconColor="text-purple-500"
        />
        
        <MetricCard
          title="Com Dados Bancários"
          value={bankDataTargets}
          change="+50%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-green-500"
        />
      </div>

      <DataTable
        columns={columns}
        data={targetList}
        loading={isLoading}
        emptyMessage="Nenhum target encontrado. Aguarde novos targets serem capturados"
      />
    </div>
  );
}
