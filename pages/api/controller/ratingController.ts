import { createRatingModel, findRatingByUser, updateRatingModel, deleteRatingModel } from "../model/rating";
import { findUserByUsername } from "../model/user";
import { findGameByName } from "../model/game";

export async function createRatingController(_value: number, _username: string, _gameName: string, _comment = "") {
    try {
        const userByUsername = await findUserByUsername(_username);
        const gameByName = await findGameByName(_gameName);

        if (userByUsername?.username == undefined) {
            return { status: 404, message: 'User not found' };
        }

        if (gameByName == undefined) {
            return { status: 404, message: 'Game not found' };
        }

        // Verificar se o usuário já possui uma avliação nesse jogo
        const ratingByUser = await findRatingByUser(userByUsername.id, gameByName.id);
        if (ratingByUser != undefined) {
            const updateRating = await updateRatingModel(ratingByUser.id, _value, _comment);

            return { status: 200, message: 'Rating updated', data: updateRating };
        }

        const response = await createRatingModel(_value, _comment, userByUsername.id, gameByName.id);

        return { status: 201, message: "Rating created", data: response };

    } catch (err) {
        return { status: 500, message: 'Something went wrong'};
    }
}

export async function deleteRatingController(_username:string, _gameName:string) {
    try {
        const userByUsername = await findUserByUsername(_username);
        if (userByUsername == undefined) {
            return { status: 404, message: 'User not found' };
        }

        const gameByName = await findGameByName(_gameName);
        if (gameByName == undefined) {
            return { status: 404, message: 'Game not found' };
        }

        const ratingByUser = await findRatingByUser(userByUsername.id, gameByName.id);
        if (ratingByUser == undefined) {
            return { status: 404, message: 'Rating not found' };
        }

        const response = await deleteRatingModel(ratingByUser.id);

        return {status: 200, message: "Rating deleted", data: response};

    } catch (err) {
        return { status: 500, message: 'Something went wrong'};
    }
}