import { fetcher } from "@/utils/swr/fetcher";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

export const AuthContext = createContext({
  user: null,
  loading: true,
  status: "",
  setUser: (value: any) => {
    user: value;
  },
  represh: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuhtProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session, status }: any = useSession();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users?id=${session?.user?.id}`,
    fetcher
  );

  useEffect(() => {
    if (status === "authenticated" && data?.data !== undefined) {
      setUser(data.data);
      setLoading(false);
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status, data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        status,
        setUser,
        represh: mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
