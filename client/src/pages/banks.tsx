import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Building, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Bank } from "@shared/schema";

export default function BanksPage() {
  const { data: banksData = [], isLoading } = useQuery({
    queryKey: ["/api/banks"],
  });
  
  const banks = Array.isArray(banksData) ? banksData : [];
  
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteBankMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/banks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banks"] });
      toast({
        title: "Banco excluído",
        description: "O banco foi excluído com sucesso",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o banco",
      });
    },
  });

  const togglePasswordVisibility = (bankId: string, field: "access" | "payment") => {
    const key = `${bankId}-${field}`;
    setVisiblePasswords(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const columns = [
    {
      key: "name",
      header: "Nome do Banco",
      render: (value: string, bank: Bank) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
            <Building className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground">{value}</span>
        </div>
      ),
    },
    {
      key: "accessPassword",
      header: "Senha de Acesso",
      render: (value: string, bank: Bank) => {
        const isVisible = visiblePasswords[`${bank.id}-access`];
        return (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {isVisible ? value || "••••••••" : "••••••••"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePasswordVisibility(bank.id, "access")}
              className="p-1 text-muted-foreground hover:text-foreground"
              data-testid={`button-toggle-access-password-${bank.id}`}
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        );
      },
    },
    {
      key: "paymentPassword",
      header: "Senha de Pagamento",
      render: (value: string, bank: Bank) => {
        const isVisible = visiblePasswords[`${bank.id}-payment`];
        return (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {isVisible ? value || "••••••••" : "••••••••"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePasswordVisibility(bank.id, "payment")}
              className="p-1 text-muted-foreground hover:text-foreground"
              data-testid={`button-toggle-payment-password-${bank.id}`}
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Ações",
      render: (_: any, bank: Bank) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-yellow-500 hover:bg-yellow-500/10"
            data-testid={`button-edit-bank-${bank.id}`}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteBankMutation.mutate(bank.id)}
            className="text-red-500 hover:bg-red-500/10"
            data-testid={`button-delete-bank-${bank.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Informações Bancárias</h2>
          <p className="text-muted-foreground">Gerencie as credenciais bancárias com segurança</p>
        </div>
        <Button className="btn-primary text-primary-foreground" data-testid="button-add-bank">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Banco
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={banks}
        loading={isLoading}
        emptyMessage="Nenhum banco configurado"
      />
    </div>
  );
}
