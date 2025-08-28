import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, User, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Verification } from "@shared/schema";

export default function VerificationPage() {
  const { data: verificationsData = [], isLoading } = useQuery({
    queryKey: ["/api/verifications"],
  });
  
  const verifications = Array.isArray(verificationsData) ? verificationsData : [];
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PUT", `/api/verifications/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/verifications"] });
      toast({
        title: "Status atualizado",
        description: "O status da verificação foi atualizado com sucesso",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status",
      });
    },
  });

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, status: "approved" });
  };

  const handleReject = (id: string) => {
    updateStatusMutation.mutate({ id, status: "rejected" });
  };

  const columns = [
    {
      key: "createdAt",
      header: "Data/Hora",
      render: (value: string) => {
        if (!value) return "-";
        return new Date(value).toLocaleString("pt-BR");
      },
    },
    {
      key: "name",
      header: "Nome",
      render: (value: string) => value || "-",
    },
    {
      key: "photo",
      header: "Foto",
      render: (value: string) => (
        <div className="w-12 h-12 bg-accent rounded-lg overflow-hidden">
          {value ? (
            <img src={value} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "document",
      header: "Documento",
      render: (value: string) => (
        <Button
          variant="link"
          className="text-blue-500 hover:text-blue-400 p-0"
          data-testid="button-view-document"
        >
          <FileImage className="w-4 h-4 mr-1" />
          Ver Documento
        </Button>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        let variant: "default" | "secondary" | "destructive" = "secondary";
        let text = "Pendente";
        let className = "bg-yellow-500/10 text-yellow-500";

        if (value === "approved") {
          variant = "default";
          text = "Aprovado";
          className = "bg-green-500/10 text-green-500";
        } else if (value === "rejected") {
          variant = "destructive";
          text = "Rejeitado";
          className = "bg-red-500/10 text-red-500";
        }

        return (
          <Badge className={className}>
            {text}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Ações",
      render: (_: any, verification: Verification) => {
        if (verification.status !== "pending") {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleApprove(verification.id)}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={updateStatusMutation.isPending}
              data-testid={`button-approve-${verification.id}`}
            >
              <Check className="w-4 h-4 mr-1" />
              Aprovar
            </Button>
            <Button
              size="sm"
              onClick={() => handleReject(verification.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={updateStatusMutation.isPending}
              data-testid={`button-reject-${verification.id}`}
            >
              <X className="w-4 h-4 mr-1" />
              Rejeitar
            </Button>
          </div>
        );
      },
    },
  ];

  const pendingCount = verifications.filter((v: Verification) => v.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sistema de Verificação</h2>
          <p className="text-muted-foreground">Aprove ou rejeite verificações de usuários</p>
        </div>
        <div className="flex gap-3">
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={pendingCount === 0}
            data-testid="button-approve-all"
          >
            <Check className="w-4 h-4 mr-2" />
            Aprovar Todos
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white"
            disabled={pendingCount === 0}
            data-testid="button-reject-all"
          >
            <X className="w-4 h-4 mr-2" />
            Rejeitar Todos
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={verifications}
        loading={isLoading}
        emptyMessage="Nenhuma verificação pendente"
      />
    </div>
  );
}
