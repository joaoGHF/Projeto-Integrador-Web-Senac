import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/home.module.css";
import { deleteCookie, getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Home() {

  const router = useRouter();

  function logout() {
    deleteCookie('authorization');
    router.push(`/user/login`);
  }

  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Home</title>
      </Head>

      {/* Barra superior de navegação */}
      <nav className={styles.topNav}>
      <Link href={`/`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

        <div className={styles.searchContainer}>
          <input type="text" className={styles.searchBar} />
          <button className={styles.send}>Enviar</button>
        </div>

        <Link href={`/game/create`} className={styles.createMovie}>Criar Jogo</Link>

        <button className={styles.logoutBtn} onClick={logout}>Logout</button>

      </nav>

      {/* Container principal, ele vai conter o GRID */}
      <div className={styles.mainContainer}>

        {/* Painel esquerdo */}
        <div className={styles.leftContainer}>

        </div>

        {/* Painel direito */}
        <div className={styles.rightContainer}>

              <div className={styles.card}>
                <img src='' alt="Game Banner" />
                <div className={styles.cardInfos}>
                  <h2 className={styles.movieTitle}></h2>
                  <p></p>
                  <p>Gêneros do Jogo</p>
                  <p></p>
                </div>
              </div>
        

        </div>

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
      props: {}
    }

  }
  catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/login'
      },
      props: {}
    }
  }
}