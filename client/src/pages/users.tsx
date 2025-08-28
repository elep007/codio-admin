import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Download, Plus, Eye, Edit, Trash2, User as UserIcon } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { EditUserModal } from "@/components/modals/edit-user-modal";
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal";
import type { User } from "@shared/schema";

export default function UsersPage() {
  const { t } = useTranslation();
  const { data: usersData = [], isLoading } = useQuery({
    queryKey: ["/api/users"],
  });
  
  const users = Array.isArray(usersData) ? usersData : [];
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: t("users.userDeleted"),
        description: t("users.userDeletedSuccess"),
      });
      setDeletingUser(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("common.error"),
        description: t("users.deleteError"),
      });
    },
  });

  const columns = [
    {
      key: "createdAt",
      header: t("common.date"),
      render: (value: string) => {
        if (!value) return "-";
        return new Date(value).toLocaleString("pt-BR");
      },
    },
    {
      key: "photo",
      header: t("users.photo"),
      render: (value: string) => (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-accent">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "username",
      header: t("users.username"),
      render: (value: string) => value || "-",
    },
    {
      key: "birthday",
      header: "Aniversário",
      render: (value: string) => value || "-",
    },
    {
      key: "phone",
      header: "Telefone",
      render: (value: string) => value || "-",
    },
    {
      key: "bankId",
      header: "Banco",
      render: (value: string) => {
        if (!value) return "-";
        return (
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <UserIcon className="w-3 h-3 text-white" />
          </div>
        );
      },
    },
    {
      key: "ipAddress",
      header: "IP",
      render: (value: string) => value || "-",
    },
    {
      key: "device",
      header: "Dispositivo",
      render: (value: string) => value || "-",
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => {
        const variant = value === "active" ? "default" : "secondary";
        const text = value === "active" ? "Ativo" : "Inativo";
        return (
          <Badge 
            variant={variant}
            className={value === "active" ? "status-active" : "status-inactive"}
          >
            {text}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Ações",
      render: (_: any, user: User) => (
        <div className="flex gap-2">
          <Link href={`/user-profile?id=${user.id}`}>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-500 hover:bg-blue-500/10"
              data-testid={`button-view-user-${user.id}`}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingUser(user)}
            className="text-yellow-500 hover:bg-yellow-500/10"
            data-testid={`button-edit-user-${user.id}`}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingUser(user)}
            className="text-red-500 hover:bg-red-500/10"
            data-testid={`button-delete-user-${user.id}`}
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
          <h2 className="text-2xl font-bold text-foreground">Gerenciamento de Usuários</h2>
          <p className="text-muted-foreground">Visualize e gerencie todos os usuários do sistema</p>
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
          <Button className="btn-primary text-primary-foreground" data-testid="button-new-user">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={isLoading}
        emptyMessage="Nenhum usuário encontrado"
      />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          title="Confirmar Exclusão"
          description="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
          open={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={() => deleteUserMutation.mutate(deletingUser.id)}
          isLoading={deleteUserMutation.isPending}
        />
      )}
    </div>
  );
}
