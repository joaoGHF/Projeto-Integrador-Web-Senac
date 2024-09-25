import { checkMinMaxLength, isNumber } from "./check";

export function createGameRequest(_name: any, _releaseDate: any, _systemRequirements: any, _description: any, _accessLink: any, _platform: any, _developer: any, _distributor: any, _price: any, _imageURL: any, _videoURL: any) {

    if (!checkMinMaxLength(_name, 4, 32)) {
        return { response: false, message: 'Nome inválido, deve conter entre 4 e 32 caracteres.' };
    }

    //  Formato aceito: 2024-09-19
    if (!checkMinMaxLength(_releaseDate, 10, 10)) {
        return { response: false, message: 'Data inválida, deve conter 10.' };
    }

    if (!checkMinMaxLength(_systemRequirements, 0, 1000)) {
        return { response: false, message: 'Requerimentos inválidos, deve conter entre 0 e 1000 caracteres' };
    }

    if (!checkMinMaxLength(_description, 0, 1000)) {
        return { response: false, message: 'Descrição Inválida, deve conter entre 0 e 1000 caracteres' };
    }

    if (!checkMinMaxLength(_accessLink, 10, 70)) {
        return { response: false, message: 'Link do jogo inválido, deve conter entre 10 e 70 caracteres.' };
    }

    if (!checkMinMaxLength(_platform, 2, 40)) {
        return { response: false, message: 'Plataforma(s) inválida(s), deve conter entre 2 e 40 caracteres.' };
    }

    if (!checkMinMaxLength(_developer, 4, 32)) {
        return { response: false, message: 'Desenvolvedora(s) inválida(s), deve conter entre 4 e 32 caracteres.' };
    }

    if (!checkMinMaxLength(_distributor, 4, 32)) {
        return { response: false, message: 'Distribuidora(s) inválida(s), deve conter entre 4 e 32 caracteres.' };
    }

    if (!isNumber(_price)) {
        return { response: false, message: 'Preço inválido, deve ser um valor numérico positivo.' };
    }

    if (!checkMinMaxLength(_imageURL, 10, 90)) {
        return { response: false, message: 'Link da imagem inválido, deve conter entre 10 e 90 caracteres.' };
    }

    if (!checkMinMaxLength(_videoURL, 10, 50)) {
        return { response: false, message: 'Link do vídeo inválido, deve conter entre 10 e 50 caracteres.' };
    }

    return { response: true }
}