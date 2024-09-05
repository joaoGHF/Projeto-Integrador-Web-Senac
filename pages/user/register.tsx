import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/register.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState(
    {
      name: "",
      username: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: ""
    });

  function handleFormEdit(event: any, field: string) {
    setFormData({
      ...formData,
      [field]: event.target.value
    });

    console.log(formData);
  }

  async function formSubmit(event: any) {
    event.preventDefault();

    try {
      const response = await fetch(`/api/action/user/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseJson = await response.json();
      alert(`Response: ${responseJson}`);

      if (response.status == 201) {
        router.push(`/user/login/`);
      }

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Cadastro</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div className={styles.container}>
        <nav className={styles.topNav}>
          <Link href={`/user/register`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

          <Link href={`/user/register`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>

        </nav>

        <form className={styles.form} onSubmit={formSubmit}>
          <h2 className={styles.welcome}>Bem-vindo ao <span className={styles.brand}>FindMyGame</span></h2>

          <h2 className={styles.formTitle}>Registrar-se</h2>

          <div className={styles.divFormFields}>
            <p className={styles.formLabel}>Nome</p>
            <input type="text" placeholder="Nome" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'name') }} /><br />

            <p className={styles.formLabel}>Nome de Usuário</p>
            <input type="text" placeholder="Nome de Usuário" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'username') }} /><br />

            <p className={styles.formLabel}>Email</p>
            <input type="email" placeholder="Nome" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'email') }}/><br />

            <p className={styles.formLabel}>CPF</p>
            <input type="text" placeholder="CPF" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'cpf') }}/><br />

            <p className={styles.formLabel}>Senha</p>
            <input type="password" placeholder="Senha" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'password') }}/><br />

            <p className={styles.formLabel}>Confirmação da senha</p>
            <input type="password" placeholder="Confirmação da senha" className={styles.inputText} onChange={(event) => { handleFormEdit(event, 'confirmPassword') }}/><br />

            <button type="submit" className={styles.submitBtn}>Cadastrar</button>
          </div>

          <Link href={`/user/login`} className={styles.redirectLink}>Já tenho uma conta</Link>
        </form>
      </div>
    </main>
  );
}

export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie('authorization', { req, res });

    if (!token) {
      throw new Error('Invalid Token');
    }
    else {
      checkToken(token);
    }

    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {}
    }

  }
  catch (err) {
    return {
      props: {}
    }
  }
}