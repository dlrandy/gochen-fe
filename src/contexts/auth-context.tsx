import React, { useContext } from 'react';

type AuthContextProps = {
  user?: string;
  login?: () => void;
  logout?: () => void;
  register?: () => void;
};
const defaultContext = {};
const AuthContext = React.createContext<AuthContextProps>(defaultContext);
AuthContext.displayName = 'AuthContext';

function AuthProvider(props: unknown) {
  const user = Math.random() > 0.5 ? 'asfew3v232ser' : '';

  const value = React.useMemo(() => ({ user }), [user]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === defaultContext) {
    throw new Error('useAuth 必须在 AuthProvider中使用');
  }
  return context;
}

export { AuthProvider, useAuth };
