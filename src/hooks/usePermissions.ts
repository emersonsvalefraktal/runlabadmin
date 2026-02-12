import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { PermissionKey } from "@/lib/permissions";

export function usePermissions() {
  const { user, profile } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = profile?.tipo_user === "Administrador";

  useEffect(() => {
    if (!user?.id || !isAdmin) {
      setPermissions([]);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    supabase
      .from("admin_permissions")
      .select("permission_key")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) {
          setPermissions(data.map((r) => r.permission_key));
        } else {
          setPermissions([]);
        }
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isAdmin]);

  const hasPermission = useCallback(
    (key: string): boolean => permissions.includes(key),
    [permissions]
  );

  return {
    permissions,
    hasPermission,
    isLoading,
    isAdmin: !!isAdmin,
  };
}
