import { createGame, findGameByName, selectGames } from "../model/game";

export async function createGameController(_name:string, _releaseDate:string, _systemRequirements:string, _description:string, _accessLink:string, _platform:string, _developer:string, _distributor:string, _price:number = 0, _imageURL:string, _videoURL:string) {
    try {
        // Verificações do controller
        if (_name.length == 0) {
            return { status: 400, message: 'Name is empty' };
        }

        if (_releaseDate.length == 0) {
            return { status: 400, message: 'Release Date is empty' };
        }

        if (_systemRequirements.length == 0) {
            return { status: 400, message: 'System Requirements is empty' };
        }

        if (_description.length == 0) {
            return { status: 400, message: 'Description is empty' };
        }

        if (_accessLink.length == 0) {
            return { status: 400, message: 'Access Link is empty' };
        }

        if (_platform.length == 0) {
            return { status: 400, message: 'Platform is empty' };
        }

        if (_price < 0) {
            return { status: 400, message: 'Price is invalid' };
        }

        if (_distributor.length == 0) {
            return { status: 400, message: 'Distributor is empty' };
        }

        if (_imageURL.length == 0) {
            return { status: 400, message: 'Image URL is empty' };
        }

        if (_videoURL.length == 0) {
            return { status: 400, message: 'Video URL is empty' };
        }

        // Verificar atributos únicos
        const gameByName = await findGameByName(_name);
        if (gameByName != undefined) {
            return { status: 400, message: 'Name already registered' };
        }

        // Criar a Model
        const game = await createGame(_name, _releaseDate, _systemRequirements, _description, _accessLink, _platform, _developer, _distributor, _price, _imageURL, _videoURL);
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