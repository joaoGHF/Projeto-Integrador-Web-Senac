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

  // Constante para salvar todos os jogos
  const [saveData, setSaveData]: Array<any> = useState(undefined);

  // Constante para salvar o texto da barra de pesquisa
  const [name, setName] = useState('');

  function searchFilter(array: any, text: string) {
    if (text == '') {
      return array;
    } else {
      return array.filter((singleGame: any) => singleGame.name.toLowerCase().includes(text.toLowerCase()));
    }
  }

  function formSubmit(event: any) {
    event.preventDefault();

    try {

      const filteredGames = searchFilter(saveData, name);
      setData(filteredGames);
    } catch (err) {
      console.log(err);
    }
  }


  async function fetchData() {
    try {
      const response = await fetch(`/api/action/game/select`, {
        method: 'GET'
      });

      const responseJson = await response.json();

      setData(responseJson.data);
      setSaveData(responseJson.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function gameClick(gameName: string) {
    router.push(`/game/` + gameName);
  }

  function iconClick() {
    router.push(`./`);
    router.reload();
  }

  function logout() {
    deleteCookie('authorization');
    router.push(`/user/login`);
  }

  function dateFormat(_date: string) {
    const [date, time] = _date.split("T");
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  }

  return (
    <main id={styles.main} className={`flex min-h-screen flex-col`} >
      <Head>
        <title>FindMyGame | Home</title>
      </Head>

      {/* Barra superior de navegação */}
      <nav className={styles.topNav}>
        <Link href={`/`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} onClick={iconClick} /></Link>

        <form className={styles.searchContainer} onSubmit={formSubmit}>
          <input type="text" className={styles.searchBar} onChange={(e) => { setName(e.target.value) }} />
          <button className={styles.send}>Enviar</button>
        </form>

        <Link href={`/game/create`} className={styles.createMovie}>Criar Jogo</Link>
        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
      </nav>

      {/* Container principal */}
      <div className={styles.mainContainer}>

        {/* Painel direito */}
        <div className={styles.cardsContainer}>

          {data != undefined && data instanceof Array ?
            data.map(game => (
              <div className={styles.card}>
                <img src={game.imageURL} alt="Game Banner" />

                <div className={styles.cardInfos} onClick={() => { gameClick(game.name) }}>
                  <h2 className={styles.movieTitle}>{game.name}</h2>
                  <p>Data de Lançamento: {dateFormat(game.releaseDate)}</p>
                  <p>Requerimentos do Sistema: {game.systemRequirements} </p>
                  <p className={styles.movieDataLink}>Disponível em: {game.accessLink}</p>
                  <p>Preço: R${game.price}</p>
                  <p>Descrição: {game.description}</p>
                  <p>Plataformas: {game.platform}</p>
                  <p>Desenvolvedora(s): {game.developer}</p>
                  <p>Distribuidora(s): {game.distributor}</p>
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