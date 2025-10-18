import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { authService } from "@/services/apiAuthService";
import { type User } from "@/models/User";
import { type Tender } from "@/models/Tender";

type UserProviderProps = {
  children: React.ReactNode;
};

type UserProviderState = {
  user: User | null;
  loading: boolean;
  error: Error | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;

  hasRole: (role: "Employee" | "Admin" | "Client") => boolean;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
  isClient: () => boolean;

  canViewTenders: (tender: Tender) => boolean;
  canEditTenders: (tender: Tender) => boolean;
  canDeleteTenders: (tender: Tender) => boolean;

  canManageUsers: () => boolean;
  canManageClients: () => boolean;
  canCreateTender: () => boolean;
};

const initialState: UserProviderState = {
  user: null,
  loading: false,
  error: null,

  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  refreshUser: async () => {},

  hasRole: () => false,
  isAdmin: () => false,
  isEmployee: () => false,
  isClient: () => false,

  canViewTenders: () => false,
  canEditTenders: () => false,
  canDeleteTenders: () => false,

  canManageUsers: () => false,
  canManageClients: () => false,
  canCreateTender: () => false,
};

const UserProviderContext = createContext<UserProviderState>(initialState);

export function UserProvider({ children, ...props }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const loggedInUser = await authService.login(username, password);
      setUser(loggedInUser);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const newUser = await authService.signup(username, email, password);
      setUser(newUser);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      setLoading(true);
      const refreshedUser = await authService.getCurrentUser();
      setUser(refreshedUser);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: "Employee" | "Admin" | "Client"): boolean => {
    return user?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole("Admin");
  };

  const isEmployee = (): boolean => {
    return hasRole("Employee");
  };

  const isClient = (): boolean => {
    return hasRole("Client");
  };

  const canViewTenders = (tender: Tender): boolean => {
    if (!user) return false;
    if (isAdmin()) return true;

    if (isEmployee()) {
      return (
        tender.team_ids.includes(user.id) ||
        tender.responsible_person_id === user.id
      );
    }

    if (isClient()) {
      return tender.client_name === user.name;
    }

    return false;
  };

  const canEditTenders = (tender: Tender): boolean => {
    if (!user) return false;
    if (isAdmin()) return true;

    if (isEmployee()) {
      return tender.responsible_person_id === user.id;
    }

    return false;
  };

  const canDeleteTenders = (tender: Tender): boolean => {
    if (!user) return false;
    if (isAdmin()) return true;

    if (isEmployee()) {
      return tender.responsible_person_id === user.id;
    }

    return false;
  };

  const canManageUsers = (): boolean => {
    if (!user) return false;
    if (isAdmin()) return true;

    return false;
  };

  const canManageClients = (): boolean => {
    if (!user) return false;
    if (isAdmin()) return true;

    return false;
  };

  const canCreateTender = (): boolean => {
    if (!user) return false;
    if (isAdmin() || isEmployee()) return true;

    return false;
  };

  const value = {
    user,
    loading,
    error,

    login,
    logout,
    signup,
    refreshUser,

    hasRole,
    isAdmin,
    isEmployee,
    isClient,
    
    canViewTenders,
    canEditTenders,
    canDeleteTenders,

    canManageUsers,
    canManageClients,
    canCreateTender,
  };

  return createElement(
    UserProviderContext.Provider,
    { value, ...props },
    children
  );
}

export function useUser() {
  const ctx = useContext(UserProviderContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
