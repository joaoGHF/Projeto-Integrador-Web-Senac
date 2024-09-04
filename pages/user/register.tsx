import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/register.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Cadastro</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div>
        <nav className={styles.topNav}>
          <Link href={`/user/register`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

          <Link href={`/user/register`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>

        </nav>

        <form className={styles.form}>
          <h2 className={styles.welcome}>Bem-vindo ao <span className={styles.brand}>FindMyGame</span></h2>

          <h2 className={styles.formTitle}>Registrar-se</h2>

          <div className={styles.formFields}>
            <p className={styles.formLabel}>Nome</p>
            <input type="text" placeholder="Nome" className={styles.inputText} /><br />

            <p className={styles.formLabel}>Nome de Usuário</p>
            <input type="text" placeholder="Nome de Usuário" className={styles.inputText} /><br />

            <p className={styles.formLabel}>Email</p>
            <input type="email" placeholder="Nome" className={styles.inputEmail} /><br />

            <p className={styles.formLabel}>CPF</p>
            <input type="text" placeholder="CPF" className={styles.inputText} /><br />

            <p className={styles.formLabel}>Senha</p>
            <input type="password" placeholder="Senha" className={styles.inputPassword} /><br />

            <p className={styles.formLabel}>Confirmação da senha</p>
            <input type="password" placeholder="Confirmação da senha" className={styles.inputPassword} /><br />

            <button type="submit" className={styles.submitBtn}>Cadastrar</button>
          </div>

          <Link href={`/user/login`} className={styles.redirectLink}>Já tenho uma conta</Link>
        </form>
      </div>
    </main>
  );
}