import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Edit, Crown, User, Shield, Info } from "lucide-react";

export default function UserProfilePage() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("id");

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-accent rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-accent rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/users")}
            className="p-2 hover:bg-accent"
            data-testid="button-back-to-users"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Perfil do Usuário</h2>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais com controle total e segurança avançada
            </p>
          </div>
        </div>
        <Button className="btn-primary text-primary-foreground" data-testid="button-edit-profile">
          <Edit className="w-4 h-4 mr-2" />
          Editar Perfil
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-muted-foreground">Secure</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">Private</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">Encrypted</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="metric-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Informações da Conta</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground mb-2">Usuário</Label>
                <Input
                  type="text"
                  className="bg-input border-border text-foreground"
                  value={(user as any)?.username || ""}
                  placeholder="Nome de usuário"
                  data-testid="input-username"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2">Email</Label>
                <Input
                  type="email"
                  className="bg-input border-border text-foreground"
                  value={(user as any)?.email || ""}
                  placeholder="Email do usuário"
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2">Status</Label>
                <Select value={(user as any)?.status || "active"}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="suspended">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground mb-2">Membro desde</Label>
                <Input
                  type="text"
                  className="bg-input border-border text-foreground"
                  value={(user as any)?.memberSince || "Janeiro 2024"}
                  readOnly
                  data-testid="input-member-since"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label className="text-foreground mb-2">Descrição do Status</Label>
              <Textarea
                className="bg-input border-border text-foreground resize-none"
                rows={3}
                value={(user as any)?.statusDescription || "Status desconhecido: undefined"}
                placeholder="Status desconhecido: undefined"
                data-testid="textarea-status-description"
              />
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="metric-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Informações Pessoais</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground mb-2">Nome de Usuário</Label>
                <Input
                  type="text"
                  className="bg-input border-border text-foreground"
                  placeholder="O nome do usuário não pode ser alterado"
                  value={(user as any)?.username || ""}
                  readOnly
                  data-testid="input-display-name"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2">Email</Label>
                <Input
                  type="email"
                  className="bg-input border-border text-foreground"
                  placeholder="Este em contato com o suporte para alterar o email"
                  value={(user as any)?.email || ""}
                  readOnly
                  data-testid="input-user-email"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2">Telefone</Label>
                <Input
                  type="text"
                  className="bg-input border-border text-foreground"
                  placeholder="(11) 99999-9999"
                  value={(user as any)?.phone || ""}
                  data-testid="input-phone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Config Card */}
        <div className="space-y-6">
          <div className="metric-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Configurações de Segurança</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground mb-2">Nova Senha</Label>
                <Input
                  type="password"
                  className="bg-input border-border text-foreground"
                  placeholder="Digite uma Nova Senha para alterar a senha"
                  data-testid="input-new-password"
                />
              </div>
              <div>
                <Label className="text-foreground mb-2">Confirmar Nova Senha</Label>
                <Input
                  type="password"
                  className="bg-input border-border text-foreground"
                  placeholder="Digite uma Senha para alterar a senha"
                  data-testid="input-confirm-password"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <Info className="w-3 h-3 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Dica de Segurança</h4>
                  <p className="text-sm text-muted-foreground">
                    Use uma senha forte com pelo menos 8 caracteres, incluindo letras maiúsculas,
                    minúsculas, números e símbolos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
