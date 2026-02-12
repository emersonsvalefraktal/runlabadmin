import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, User, Key, Settings, FileText, LogOut } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissions } from "@/hooks/usePermissions";
import runlabLogo from "@/assets/runlab-logo-new.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { hasPermission } = usePermissions();
  const isParceirosActive = location.pathname.startsWith("/parceiros");

  const displayName =
    profile?.full_name ||
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    user?.email?.split("@")[0] ||
    "Usuário";
  const initials = displayName
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avatarUrl =
    profile?.avatar_url ||
    (user?.user_metadata?.avatar_url as string) ||
    (user?.user_metadata?.picture as string) ||
    undefined;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-6 py-4 w-full">
      <div className="flex items-center justify-between">
        <img src={runlabLogo} alt="RUNLAB" className="h-10" />
        
        <nav className="flex gap-8">
          {hasPermission("financeiro.view") && (
            <NavLink 
              to="/financeiro" 
              className="text-muted-foreground transition-colors"
              activeClassName="text-primary font-medium border-b-2 border-primary pb-1 hover:text-primary"
            >
              Financeiro
            </NavLink>
          )}
          {hasPermission("usuarios.view") && (
            <>
              <NavLink 
                to="/corredores" 
                className="text-muted-foreground transition-colors"
                activeClassName="text-primary font-medium border-b-2 border-primary pb-1 hover:text-primary"
              >
                Corredores
              </NavLink>
              <Link 
                to="/parceiros" 
                className={cn(
                  "text-muted-foreground transition-colors",
                  isParceirosActive ? "text-primary font-medium border-b-2 border-primary pb-1 hover:text-primary" : "hover:text-foreground"
                )}
              >
                Parceiros
              </Link>
            </>
          )}
          {hasPermission("competicoes.view") && (
            <NavLink 
              to="/gestao-competicoes" 
              className="text-muted-foreground transition-colors"
              activeClassName="text-primary font-medium border-b-2 border-primary pb-1 hover:text-primary"
            >
              Gestão de competições
            </NavLink>
          )}
        </nav>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarUrl} alt={displayName} referrerPolicy="no-referrer" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{displayName}</span>
                <span className="text-xs text-muted-foreground">{user?.email ?? "—"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/minha-conta")}
            >
              <User className="h-4 w-4 mr-2" />
              Minha conta
            </DropdownMenuItem>
            {hasPermission("acessos.view") && (
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => navigate("/minha-conta?tab=acessos")}
              >
                <Key className="h-4 w-4 mr-2" />
                Acessos
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/minha-conta?edit=true")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/minha-conta?tab=sobre")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Termos e política
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => handleLogout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
