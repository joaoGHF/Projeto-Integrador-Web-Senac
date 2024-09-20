import { NextApiRequest, NextApiResponse } from "next";
import { createUserController } from "../../controller/userController";
import { createUserRequest } from "@/request/createUserRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(403).json({ message: 'Method not allowed' });
    }

    const {name, username, email, cpf, password, confirmPassword} = req.body;

    // Aplicar request
    const checkRequest = createUserRequest(name, username, email, cpf, password, confirmPassword);
    if ( checkRequest.response == false ) {
        return res.status(400).json( { message: checkRequest.message } );
    }

    
    // Enviar para o controller 
    const response = await createUserController(name, username, email, cpf, password, confirmPassword);

    return res.status(response.status).json({message: response.message});
}