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
                    userName: tokenInfos.username,
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

            console.log(responseJson.data);
            if (!String(responseJson.data.videoURL).includes("https://")) {
                responseJson.data.videoURL = "https://www.youtube.com/embed/ZWcRmoLqhkc?si=_x97gPDtDmoD728q";
            }

            if (!String(responseJson.data.imageURL).includes("https://")) {
                responseJson.data.imageURL = "https://static.vecteezy.com/ti/vetor-gratis/p1/3416081-erro-404-com-o-fantasma-mascote-fofo-gratis-vetor.jpg";
            }

            setData(responseJson.data);

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

    function dateFormat(_date: string) {
        const [date, time] = _date.split("T");
        const [year, month, day] = date.split("-");

        return `${day}/${month}/${year}`;
    }

    async function deleteComment(event: any) {
        event.preventDefault();
        try {
            const cookieAuth = getCookie('authorization');
            const tokenInfos = checkToken(cookieAuth);

            const response = await fetch('/api/action/rating/delete', {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    userName: tokenInfos.username,
                    gameName: gameName
                })
            });

            const responseJson = await response.json();
            alert(responseJson.message);
            router.reload();

        } catch (err) {
            console.log(err);

        }
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

                            <img src={data.imageURL} alt="Banner Jogo" className={styles.gameBanner} />

                            <div className={styles.gameInfos}>
                                <h2 className={styles.gameName}>{data.name}</h2>
                                <p className={styles.gameItem}>Data de Lançamento: {dateFormat(data.releaseDate)}</p>
                                <p className={styles.gameItem}>Requerimentos do Sistema: {data.systemRequirements} </p>
                                <p className={styles.gameItem}>Gêneros: </p>

                                <ul className={styles.gameGenresList}>
                                    {
                                        data.genres != undefined ?
                                            data.genres.map((genre: any) => (
                                                <li className={styles.gameGenreItem}>{genre.name}</li>
                                            ))
                                            :
                                            <span>Sem Gêneros</span>
                                    }

                                </ul>

                                <p className={styles.gameURL}>Disponível em: <Link href={data.accessLink} target="_blank" className={styles.gameUrlLink}>{data.accessLink}</Link></p>
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
                                    <div className={styles.starRating}>
                                        <input className={styles.radioHide} type="radio" id="star_5" name="stars" value="5" onChange={(e) => { handleFormEdit(e, 'value') }} />
                                        <label className={styles.radioStar} htmlFor="star_5"></label>

                                        <input className={styles.radioHide} type="radio" id="star_4" name="stars" value="4" onChange={(e) => { handleFormEdit(e, 'value') }} />
                                        <label className={styles.radioStar} htmlFor="star_4"></label>

                                        <input className={styles.radioHide} type="radio" id="star_3" name="stars" value="3" onChange={(e) => { handleFormEdit(e, 'value') }} />
                                        <label className={styles.radioStar} htmlFor="star_3"></label>

                                        <input className={styles.radioHide} type="radio" id="star_2" name="stars" value="2" onChange={(e) => { handleFormEdit(e, 'value') }} />
                                        <label className={styles.radioStar} htmlFor="star_2"></label>

                                        <input className={styles.radioHide} type="radio" id="star_1" name="stars" value="1" onChange={(e) => { handleFormEdit(e, 'value') }} />
                                        <label className={styles.radioStar} htmlFor="star_1"></label>
                                    </div>
                                </div>

                                <button className={styles.deleteComment} onClick={deleteComment}>Deletar minha Avaliação</button>
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