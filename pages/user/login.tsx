import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";

export default function Login() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  function handleFormEdit(event: any, field: any) {
    setFormData({
      ...formData,
      [field]: event.target.value
    });

    console.log(formData);
  }

  async function formSubmit(event: any) {
    event.preventDefault();

    try {
      const response = await fetch(`/api/action/user/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseJson = await response.json();

      if (response.status == 200) {
        setCookie('authorization', responseJson.token)
      }
      alert(`${responseJson.message}`);

      if (response.status == 200) {
        router.push(`/`);
      }


    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Login</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.topNav}>
          <Link href={`/`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

          <Link href={`/`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>
        </nav>

        <form className={styles.form} onSubmit={formSubmit}>
          <h2 className={styles.welcome}>Bem-vindo ao <span className={styles.brand}>FindMyGame</span></h2>

          <h2 className={styles.formTitle}>Login</h2>

          <div className={styles.divFormFields}>
            <p className={styles.formLabel}>Nome de Usuário</p>
            <input type="text" placeholder="Nome de Usuário" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'username') }} /><br />

            <p className={styles.formLabel}>Senha</p>
            <input type="password" placeholder="Senha" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'password') }} /><br />


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
    const token = getCookie('authorization', { req, res });

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