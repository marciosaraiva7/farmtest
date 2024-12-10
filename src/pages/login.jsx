import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Logo from "../assets/images/logo.png";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async () => {
  //   // Simula uma chamada para obter o token
  //   const fakeToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU3NjY0MDB9.7uD3jOseTmtHDGWI-MjSAXlg7XtYJ-DohkZ7F9XuKdg";
  //   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTI5NTI5MDB9.5C4R4y5TFTw3i90XDthmXY9-F84Oz14JQLfT65GFm1s";
  //   login(fakeToken); // Define o token no contexto
  //   navigate("/"); // Redireciona para a rota privada
  // };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://farmlog-api.wr-agro.dev.br:3003/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      login(data);
      navigate("/");
      // Handle success (e.g., save token, redirect, etc.)
    } catch {
      setErrorMessage("Erro no login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute top-[226px] flex w-full flex-col pl-[36px] pr-[56px]">
      <img src={Logo} className="mb-[28px] w-[186px]" />
      <h2 className="mb-[65px] text-[23px] font-bold leading-[30px]">
        Acessar conta
      </h2>
      <p className="mb-[5px] text-[18px] leading-[24px]">Email</p>
      <input
        className="mb-[18px] h-[43px] w-full rounded-[6px] border-[0.5px] border-[#EAC00F] pl-[12px] pt-[9] text-[18px] leading-[24px] placeholder:text-[#A1A0A0] focus:outline-[#EAC00F]"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="mb-[5px] text-[18px] leading-[24px]">Senha</p>
      <input
        className="mb-[5px] h-[43px] w-full rounded-[6px] border-[0.5px] border-[#EAC00F] pl-[12px] pt-[9] text-[18px] leading-[24px] placeholder:text-[#A1A0A0] focus:outline-[#EAC00F]"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a
        className="mb-[94px] w-fit border-b border-black text-black"
        href="/ForgotPassword"
      >
        Esqueci minha senha
      </a>
      <div className="flex w-full justify-center transition-all duration-300 ease-in-out">
        <button
          className="flex w-fit justify-center rounded-full bg-[#181A18] pl-[65px] pr-[65px] text-white transition-all duration-300 ease-in-out"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color={"#ffffff"} loading={loading} size={30} />
          ) : (
            "Entrar"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
