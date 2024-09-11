import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/home.module.css";
import { deleteCookie, getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// TODO: Colocar os gêneros no filme!
export default function Home() {

  const router = useRouter();
  const [data, setData]: any = useState(undefined);

  async function fetchData() {
    try {
      const response = await fetch(`/api/action/game/select`, {
        method: 'GET'
      });

      const responseJson = await response.json();

      setData(responseJson.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function movieClick(movieName: string) {
    router.push(`/movie/` + movieName);
  }

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

          {data != undefined && data instanceof Array ?
            data.map(game => (
              <div className={styles.card}>
                <img src={game.imageURL} alt="Game Banner" />
                <div className={styles.cardInfos}>
                  <h2 className={styles.movieTitle}>{game.name}</h2>
                  <p>Data de Lançamento: {game.releaseDate}</p>
                  <p>Requerimentos do Sistema: {game.systemRequirements} </p>
                  <p>Disponível em: {game.accessLink}</p>
                  <p>Preço: {game.price}</p>
                  <p>Descrição: {game.description}</p>
                  <p>Plataformas: {game.platform}</p>
                  <p>Desenvolvedora(s): {game.developer}</p>
                  <p>Destribuidora(s): {game.distributor}</p>
                </div>
              </div>
            ))

            :

            <p>No game found</p>
          }


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