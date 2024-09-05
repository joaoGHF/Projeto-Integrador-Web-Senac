import { NextApiRequest, NextApiResponse } from "next";
import { createUserController } from "../../controller/userController";

// TODO: Bug, falha ao testar com o insomnia

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const {name, username, email, cpf, password, confirmPassword} = req.body;
    
    // Enviar para o controller 
    const response = await createUserController(name, username, email, cpf, password, confirmPassword);

    return res.status(response.status).json(response.message);
}