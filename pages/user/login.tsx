import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} >
      <Head>
        <title>FindMyGame | Login</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div>
        <nav>
        <h1>FindMyGame</h1>

        <Image src="/logo.png" alt="Logo" width="100" height="100" />

        </nav>

        <form>
          <h2>Bem-vindo ao <span>FindMyGame</span></h2>

          <h2>Registrar-se</h2>

          <div>
            <p>Nome de Usuário</p>
            <input type="text" placeholder="Nome de Usuário" /><br />

            <p>Senha</p>
            <input type="password" placeholder="Senha" /><br />


            <button type="submit">Login</button>
          </div>

          <Link href={`/user/register`}>Não tenho uma conta</Link>
        </form>
      </div>
    </main>
  );
}