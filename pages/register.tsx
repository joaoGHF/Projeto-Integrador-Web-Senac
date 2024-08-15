import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} >
      <Head>
        <title>FindMyGame | Cadastro</title>
      </Head>

      <div>
        <h1>FindMyGame — Register</h1>

        <form>

        </form>
      </div>
    </main>
  );
}