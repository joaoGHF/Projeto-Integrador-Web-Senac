import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../controller/userController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    // Enviar para o controller
    const response = await login(username, password);

    if (response.status == 200) {
        return res.status(response.status).json({ message: response.message, token: response.token });
    } else {
        return res.status(response.status).json({ message: response.message });
    }
}