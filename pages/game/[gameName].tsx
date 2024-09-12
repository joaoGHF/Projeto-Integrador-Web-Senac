import { checkToken } from "@/services/tokenConfig";
import styles from "@/styles/game.name.module.css";
import { deleteCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function game({ gameName }: any) {
    const router = useRouter();

    // Formulário de avaliação
    const [ratingForm, setRatingForm] = useState({
        value: 0,
        comment: ''
    });

    const [data, setData]: any = useState(undefined);

    function handleFormEdit(event: any, field: any) {
        setRatingForm({
            ...ratingForm,
            [field]: event.target.value
        });
    }

    async function formSubmit(e: any) {
        e.preventDefault();
        try {
            const cookieAuth = getCookie('authorization');
            const tokenInfos = checkToken(cookieAuth);

            const response = await fetch('/api/action/rating/create', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    value: Number(ratingForm.value),
                    comment: ratingForm.comment,
                    email: tokenInfos.username,
                    gameName: gameName
                })
            });

            const responseJson = await response.json();
            alert(responseJson.message);
            router.reload();

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/action/game/find?name=` + gameName, {
                method: 'GET'
            });

            const responseJson = await response.json();
            setData(responseJson.data)

        } catch (err) {
            console.log(err);
            alert("Algo deu Errado");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function logout() {
        deleteCookie('authorization');
        router.push(`/user/login`);
    }

    return (
        <main id={styles.main} className="flex min-h-screen flex-col">
            <Head>
                <title>FindMyGame | Create </title>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
            </Head>

            {/* Barra superior de navegação */}
            <nav className={styles.topNav}>
                <Link href={`/`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

                <button className={styles.logoutBtn} onClick={logout}>Logout</button>

                <Link href={`/`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>
            </nav>


            {
                data != undefined ?

                    <section>
                        <Head>
                            <title>Game | {data.name}</title>
                        </Head>
                        <div className={styles.game}>

                            <img src={data.imageURL} alt="Banner Filme" className={styles.gameBanner} />

                            <div className={styles.gameInfos}>
                                <h2 className={styles.gameName}>{data.name}</h2>
                                <p className={styles.gameItem}>Data de Lançamento: {data.releaseDate}</p>
                                <p className={styles.gameItem}>Requerimentos do Sistema: {data.systemRequirements} </p>
                                <p className={styles.gameURL}>Disponível em: {data.accessLink}</p>
                                <p className={styles.gameItem}>Preço: R${data.price}</p>
                                <p className={styles.gameItem}>Descrição: {data.description}</p>
                                <p className={styles.gameItem}>Plataformas: {data.platform}</p>
                                <p className={styles.gameItem}>Desenvolvedora(s): {data.developer}</p>
                                <p className={styles.gameItem}>Distribuidora(s): {data.distributor}</p>
                            </div>
                        </div>
                        <iframe width="1280" height="720" src={data.videoURL} className={styles.gameVideo}></iframe>

                        <form className={styles.formRating} onSubmit={formSubmit}>

                            <h3 className={styles.createRatingsHeading}>Crie ou altere sua avaliação</h3>

                            <div className={styles.topDivformRating}>

                                <div className={styles.topDivformRatingNote}>
                                    <p className={styles.label}>Digite uma nota (0 a 5)</p>
                                    <input className={styles.value} type="number" max={5} min={0} onChange={(e) => { handleFormEdit(e, 'value') }} />
                                </div>

                                <button className={styles.deleteComment}>Deletar minha Avaliação</button>
                            </div>

                            <textarea className={styles.comment} placeholder="Digite o seu comentário" rows={8}
                                onChange={(e) => { handleFormEdit(e, 'comment') }} />

                            <input className={styles.submitBtn} type="submit" />
                        </form>

                        <div className={styles.ratings}>
                            <h2 className={styles.ratingTitle}>Avaliações</h2>
                            {
                                data.ratings.map((rating: any) => (


                                    <div className={styles.ratingCard}>
                                        <div className={styles.ratingTop}>
                                            <span className={styles.ratingUser}>{rating.user.username}</span>
                                            <h2 className={styles.ratingRecommendations}>{rating.value}/5 Recomendação</h2>
                                        </div>
                                        <span className={styles.ratingComment}>{rating.comment}</span>
                                    </div>

                                ))

                            }
                        </div>
                    </section>

                    :

                    <p>Erro 404: Jogo não encontrado</p>
            }
        </main >
    );
}

export function getServerSideProps(context: any) {
    const { gameName } = context.query;

    return {
        props: { gameName }
    }
}