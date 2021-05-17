import * as React from 'react';
import { useMemo } from 'react';

type AuthContextType = {
  isVerifyingAuth: boolean;
  verifyAuth: () => Promise<void>;
  saveAuthTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  error?: string;
  user?: any;
  isAuthFailed: boolean;
};

// @ts-ignore
const AuthContext = React.createContext<AuthContextType>();
AuthContext.displayName = 'AuthContext';

type AuthProviderProperties = {
  loading?: React.ReactNode;
  [x: string]: any;
};

type AuthState = {
  isAuthenticated: boolean;
  isVerifyingAuth: boolean;
  isAuthFailed: boolean;
  error?: string;
  user?: any;
};

const initialAuthState = {
  isAuthenticated: false,
  isVerifyingAuth: true,
  isAuthFailed: false,
  error: undefined,
  user: undefined
};

export default function AuthProvider({
  loading,
  failed,
  ...otherProperties
}: AuthProviderProperties): JSX.Element {
  const [state, setState] = React.useState<AuthState>(initialAuthState);

  async function handleApiError(error: any) {
    // if (hasResponseData(error)) {
    //   const { message, errorCode } = getErrorResponseData(error);
    //   if (errorCode === 'missing-auth-token-or-user-info') {
    //     setState({
    //       error: message,
    //       isAuthenticated: false,
    //       isVerifyingAuth: false,
    //       isAuthFailed: true,
    //       user: undefined,
    //     });
    //   }
    // } else {
    setState({ error: 'An unknown error has been occurred', ...state });
    // }
  }

  async function saveAuthTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', accessToken);
    setState({
      isAuthenticated: true,
      isVerifyingAuth: false,
      isAuthFailed: false,
      user: undefined,
      error: undefined
    });
  }

  async function verifyAuthTokens() {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');
    if (!accessToken && !refreshToken) {
      return setState({
        isAuthenticated: false,
        isVerifyingAuth: false,
        isAuthFailed: true,
        user: undefined,
        error: undefined
      });
    }
    setState({
      isAuthenticated: true,
      isVerifyingAuth: false,
      isAuthFailed: false,
      user: undefined,
      error: undefined
    });
  }

  async function verifyAuth() {
    await setState({
      isAuthenticated: false,
      isVerifyingAuth: true,
      isAuthFailed: false,
      error: undefined,
      user: undefined
    });
    return verifyAuthTokens();
  }

  async function logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    await setState({
      isAuthenticated: false,
      isVerifyingAuth: false,
      isAuthFailed: false,
      error: undefined,
      user: undefined
    });
  }

  React.useEffect(() => {
    // verifyAuthTokens();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({ ...state, verifyAuth, logout, saveAuthTokens }),
    [state, verifyAuth, logout, saveAuthTokens]
  );

  return <AuthContext.Provider value={value} {...otherProperties} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
