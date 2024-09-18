import { NextApiRequest, NextApiResponse } from "next";
import { createGenreController } from "../../controller/genreController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name } = req.body;

    const response = await createGenreController(name);

    return res.status(response.status).json({message: response.message});
}