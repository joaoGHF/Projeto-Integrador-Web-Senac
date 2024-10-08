import { createUser, findUserByEmail, findUserByUsername, findUserByCPF, findUserlogin } from '../model/user';
import { generateToken } from '@/services/tokenConfig';

export async function createUserController(_name: string, _username: string, _email: string, _cpf: string, _password: string, _confirmPassword: string) {
    console.log("teste 1");

    try {
        // Verificar atributos únicos
        const userByEmail = await findUserByEmail(_email);
        if (userByEmail != undefined) {
            return { status: 403, message: 'Email already registered' };
        }

        const userByUsername = await findUserByUsername(_username);
        if (userByUsername != undefined) {
            return { status: 403, message: 'Username already registered' };
        }

        const userByCpf = await findUserByCPF(_cpf);
        if (userByCpf != undefined) {
            return { status: 403, message: 'CPF already registered' };
        }

        // Criar a Model
        const user = await createUser(_name, _username, _email, _cpf, _password);
        return { status: 201, message: 'User Created', data: user }

    } catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}

export async function login(_username: string, _password: string) {
    try {
        const userLogin = await findUserlogin(_username, _password);
        if (userLogin == undefined) {
            return { status: 404, message: 'Incorrect Username or Password' };
        } else {
            const _token = generateToken(_username);

            return { status: 200, message: 'Logged In', token: _token };
        }

    } catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}
