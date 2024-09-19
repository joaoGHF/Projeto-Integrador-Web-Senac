import { NextApiRequest, NextApiResponse } from "next";
import { deleteRatingController } from "../../controller/ratingController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "DELETE") {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {userName, gameName} = req.body;

    // Enviar para o controller
    const response = await deleteRatingController(userName, gameName);

    return res.status(response.status).json({ message: response.message });
}