import Head from "next/head";
import styles from "@/styles/game.create.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import { checkToken } from "@/services/tokenConfig";
import { useRouter } from "next/router";

export default function createGame() {
    // Armazena os gêneros de filmess do banco de dados
    const [genres, setGenres]: any = useState(undefined);

    //Armazena os genros selecionados
    var selectedGenres: Array<Number> = [];

    const router = useRouter();

    function handleCheckBoxEdit(event: any, id: number) {
        if (event.target.checked) {
            selectedGenres.push(Number(id));
        } else {
            const index = selectedGenres.indexOf(Number(id));

            if (index != undefined) {
                selectedGenres.splice(index, 1)
            }
        }
    }

    async function fetchData() {
        try {
            const responses = await fetch(`/api/action/genre/select`, {
                method: 'GET'
            });

            const responseJson = await responses.json();

            setGenres(responseJson.data);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function logout() {
        deleteCookie('authorization');
        router.push(`/user/login`);
    }

    const [formData, setFormData] = useState({
        name: '',
        releaseDate: '',
        systemRequirements: '',
        description: '',
        accessLink: '',
        platform: '',
        developer: '',
        distributor: '',
        price: '',
        imageURL: '',
        videoURL: ''
    });

    function handleFormEdit(event: any, field: string) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/action/game/create`,
                {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        releaseDate: formData.releaseDate,
                        systemRequirements: formData.systemRequirements,
                        description: formData.description,
                        accessLink: formData.accessLink,
                        platform: formData.platform,
                        developer: formData.developer,
                        distributor: formData.distributor,
                        price: Number(formData.price),
                        imageURL: formData.imageURL,
                        videoURL: formData.videoURL
                    })
                }
            );

            const responseJson = await response.json();
            console.log(responseJson);

            alert(`${responseJson.message}`);

            router.reload();

        }
        catch (err: any) {
            console.log(err);
        }
    }

    return (
        <main id={styles.mainCointainer} className="flex min-h-screen flex-col">

            <Head>
                <title>FindMyGame | Create </title>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
            </Head>

            <nav className={styles.topNav}>
                <Link href={`/`}><Image src="/logo.png" alt="Logo" width="100" height="100" className={styles.logoImg} /></Link>

                <button className={styles.logoutBtn} onClick={logout}>Logout</button>

                <Link href={`/`}><h1 className={styles.title}><span className={styles.brand} >FindMyGame</span></h1></Link>
            </nav>

            <div className={styles.gridContainer}>
                <div className={styles.leftContainer}>
                    <form className={styles.formContainer} onSubmit={formSubmit}>
                        <h2 className={styles.formHeading}>Cadastro de Jogos <span className={styles.brand}>FindMyGame</span></h2>


                        <p className={styles.inputLabel} >Nome</p>
                        <input className={styles.input} type="text" placeholder="Nome" onChange={(event) => { handleFormEdit(event, 'name') }} /><br />

                        <p className={styles.inputLabel} >Data de lançamento</p>
                        <input className={styles.inputDate} type="date" onChange={(event) => { handleFormEdit(event, 'releaseDate') }} /><br />

                        <p className={styles.inputLabel} >Requerimentos do Sistema</p>
                        <div className={styles.inputTextDiv}>
                            <textarea className={styles.inputText} placeholder="Requerimentos do Sistema" onChange={(event) => { handleFormEdit(event, 'systemRequirements') }} /><br />
                        </div>

                        <p className={styles.inputLabel}>Link de Acesso do Jogo</p>
                        <input className={styles.input} type="text" placeholder="Link para o Jogo" onChange={(event) => { handleFormEdit(event, 'accessLink') }} />

                        <p className={styles.inputLabel}>Plataformas</p>
                        <input className={styles.input} type="text" placeholder="Plataformas" onChange={(event) => { handleFormEdit(event, 'platform') }} />

                        <p className={styles.inputLabel}>Desenvolvedora(s)</p>
                        <input className={styles.input} type="text" placeholder="Desenvolvedora(s)" onChange={(event) => { handleFormEdit(event, 'developer') }} />

                        <p className={styles.inputLabel}>Distribuidora(s)</p>
                        <input className={styles.input} type="text" placeholder="Distribuidora(s)" onChange={(event) => { handleFormEdit(event, 'distributor') }} />

                        <p className={styles.inputLabel}>Preço(s)</p>
                        <input className={styles.input} type="number" min="0" step="any" placeholder="Preço" onChange={(event) => { handleFormEdit(event, 'price') }} />

                        <p className={styles.inputLabel}>Imagem do Jogo</p>
                        <input className={styles.input} type="text" placeholder="Link para o banner do Jogo" onChange={(event) => { handleFormEdit(event, 'imageURL') }} />

                        <p className={styles.inputLabel}>Trailer do jogo</p>
                        <input className={styles.input} type="text" placeholder="Link para o trailer do Jogo (Lik Incorporável do Youtube)" onChange={(event) => { handleFormEdit(event, 'videoURL') }} />

                        <p className={styles.inputLabel} >Descrição</p>
                        <div className={styles.inputTextDiv}>
                            <textarea className={styles.inputText} placeholder="Descrição" onChange={(event) => { handleFormEdit(event, 'description') }} /><br />
                        </div>


                        <h3 className={styles.genresHeading}>Gêneros do Filme</h3>
                        <div className={styles.genresDiv}>
                            {
                                genres != undefined && genres instanceof Array ?

                                    genres.map(genre => (
                                        <div className={styles.genreBox}>
                                            <input type="checkbox" onChange={(e) => handleCheckBoxEdit(e, genre.id)} />
                                            <label>{genre.name}</label>
                                        </div>
                                    ))
                                    :

                                    <p> No genres</p>
                            }
                        </div>


                        <input className={styles.submitBtn} type="submit" value="Enviar" /><br /><br />
                    </form>
                </div>

                <div className={styles.gameAnimation}>
                </div>

            </div>
        </main>
    )
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