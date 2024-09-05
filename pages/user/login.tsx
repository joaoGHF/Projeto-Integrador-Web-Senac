import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";

export default function Login() {
  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Login</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.topNav}>
          <Link href={`/user/login`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

          <Link href={`/user/login`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>
        </nav>

        <form className={styles.form}>
          <h2 className={styles.welcome}>Bem-vindo ao <span className={styles.brand}>FindMyGame</span></h2>

          <h2 className={styles.formTitle}>Login</h2>

          <div className={styles.divFormFields}>
            <p className={styles.formLabel}>Nome de Usuário</p>
            <input type="text" placeholder="Nome de Usuário" className={styles.inputText} /><br />

            <p className={styles.formLabel}>Senha</p>
            <input type="password" placeholder="Senha" className={styles.inputText} /><br />


            <button type="submit" className={styles.submitBtn}>Login</button>
          </div>

          <Link href={`/user/register`} className={styles.redirectLink}>Não tenho uma conta</Link>
        </form>
      </div>
    </main>
  );
}

export function getServerSideProps({ req, res }: any) {
  try {
      const token = getCookie('authorization', {req, res});

      if (!token) {
          throw new Error('Invalid Token!')
      } else {
          checkToken(token);
      }

      return {
          redirect: {
              permanent: false,
              destination: '/'
          }
      };

  } catch (err) {
      return {
          props: {}
      }
  }
}