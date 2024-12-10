/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Importando corretamente o jwt-decode

// Criação do contexto
const AuthContext = createContext();

// Função para validar o token (exemplo com JWT)
const validateToken = (token) => {
  try {
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Em segundos
    // Verifica se o token tem a chave exp e se a data de expiração é maior que a hora atual
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true;
    } else {
      console.error("Token expirado");
      return false;
    }
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return false;
  }
};

// Provider para encapsular a lógica de autenticação
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("authToken");

    // Valida o token ao carregar a aplicação
    return validateToken(storedToken) ? storedToken : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token); // Salva o token válido
    } else {
      localStorage.removeItem("authToken"); // Remove token inválido
    }
  }, [token]);

  // Função de login
  const login = (newToken) => {
    if (validateToken(newToken)) {
      setToken(newToken);
    } else {
      console.error("Token recebido no login é inválido.");
    }
  };

  // Função de logout
  const logout = () => {
    setToken(null);
  };

  // Estado de autenticação
  const isLoggedIn = !!token;

  const user = token ? jwtDecode(token) : null;

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
