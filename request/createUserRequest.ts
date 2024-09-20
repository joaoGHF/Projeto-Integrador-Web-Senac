import { isEmail, checkMinMaxLength, isCPF } from "./check";


export function createUserRequest(_name: any, _username: any, _email: any, _cpf: any, _password: any, _confirmPassword: any) {

    // usar o simbolo ! é equivalente a "== false" no final da expressão.
    if (!checkMinMaxLength(_name, 3, 25)) {
        return { response: false, message: 'Nome inválido, deve conter entre 3 e 25 caracteres' };
    }

    if (!checkMinMaxLength(_username, 6, 15)) {
        return { response: false, message: 'Username inválido, deve conter entre 6 e 15 caracteres' };
    }

    if (!isEmail(_email)) {
        return { response: false, message: 'Email inválido' };
    }

    if (!isCPF(_cpf)) {
        return { response: false, message: 'CPF inválido' };
    }

    if (!checkMinMaxLength(_password, 6, 32)) {
        return { response: false, message: 'Senha inválida, deve conter entre 6 e 32 caracteres' };
    }

    if (!checkMinMaxLength(_confirmPassword, 6, 32)) {
        return { response: false, message: 'Confirmação da senha inválida, deve conter entre 6 e 15 caracteres ' };
    }

    return { response: true };

}