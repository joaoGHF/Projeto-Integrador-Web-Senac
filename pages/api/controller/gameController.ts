import { createGame, findGameByName, selectGames } from "../model/game";
import { findGenreByName } from "../model/genre";

export async function createGameController(_name: string, _releaseDate: string, _genres: Array<any>, _systemRequirements: string, _description: string, _accessLink: string, _platform: string, _developer: string, _distributor: string, _price: number = 0, _imageURL: string, _videoURL: string) {
    try {
        
        // Verificar atributos únicos
        const gameByName = await findGameByName(_name);
        if (gameByName != undefined) {
            return { status: 400, message: 'Name already registered' };
        }

        // Verificar os Gêneros
        var verifiedGenres = [];

        for (let i = 0; i < _genres.length; i++) {
            let genreByName = await findGenreByName(_genres[i]);

            if (genreByName == undefined) {
                return { status: 404, message: 'Genre not found' };
            }
            verifiedGenres.push(genreByName.id);
        }

        // Criar a Model
        const game = await createGame(_name, _releaseDate, verifiedGenres, _systemRequirements, _description, _accessLink, _platform, _developer, _distributor, _price, _imageURL, _videoURL);
        return { status: 201, message: 'Game Created', data: game }

    } catch (err) {
        return { status: 500, message: 'Something went wrong: ' + err };
    }
}

export async function selectGamesController() {
    try {
        const games = await selectGames();

        return { status: 200, message: 'Select games', data: games };
    }
    catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}

export async function findGameByNameController(name: string) {
    try {
        const gameByName = await findGameByName(name);

        if (gameByName == undefined) {
            return { status: 404, message: 'Game not found' };
        } else {
            return { status: 200, message: 'Game found ', data: gameByName }
        }

    } catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}