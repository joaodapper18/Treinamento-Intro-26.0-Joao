'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import LoginOptionals from "@/components/auth/LoginOptionals";
import RequiredTag from "@/components/base/input/RequiredTag";

const GoogleAuthButton = dynamic(() => import('@/components/auth/GoogleLoginButton'));
const CredentialsButton = dynamic(() => import('@/components/auth/CredentialsButton'));
const ValidatedInput = dynamic(() => import('@/components/base/input/ValidatedInput'));

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/", 
      }, {
        onSuccess: () => {
          toast.success("Login realizado com sucesso!");
          router.push("/");
          router.refresh(); 
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "E-mail ou senha incorretos.");
          setLoading(false);
        }
      });
    } catch (error) {
      toast.error('Erro inesperado: ' + String(error));
      setLoading(false);
    }
  };

  return ( 
    <div className="lg:w-[90%] xl:w-[80%]">
      <h2 className="font-bold text-[40px] text-center leading-12 text-slate-900">Continue seu aprendizado</h2>
      
      <form className="mt-6" onSubmit={handleSubmit}>
        <ValidatedInput 
          title="E-mail"
          placeholder="exemplo@noctiluz.com.br"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          labelClassName='auth-label'
          inputClassName='auth-input'
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag/>
        </ValidatedInput>
        
        <ValidatedInput 
          title="Senha"
          placeholder="Insira sua senha"
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          overrideValidate={(val) => val.length >= 6}
          containerClassName="mt-4"
          labelClassName="auth-label"
          inputClassName="auth-input"
          iconContainerClassName="auth-icon"
          required
        >
          <RequiredTag/>
        </ValidatedInput>

        <LoginOptionals />

        <CredentialsButton className="mt-6" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </CredentialsButton>
      </form>
      
      <div className="flex items-center gap-4 py-5">
        <div className="flex-grow h-0.5 bg-gray-200" />
        <p className="text-gray-400 text-lg">ou</p>
        <div className="flex-grow h-0.5 bg-gray-200" />
      </div>

      <GoogleAuthButton disabled={loading} text="Entrar com Google" />

      <Link href='/cadastro' className="block w-fit mt-8 text-sm group text-slate-600">
        Ainda não tem uma conta? <span className="text-pink-500 border-b border-transparent group-hover:border-pink-500 transition-colors">Cadastre-se</span>
      </Link>
    </div>
  );
}

export default LoginForm;