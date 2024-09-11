import { NextApiRequest, NextApiResponse } from "next";
import { createGameController } from "../../controller/gameController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, releaseDate, systemRequirements, description, accessLink, platform, developer, distributor, price, imageURL, videoURL } = req.body;
    
    const response = await createGameController(name, releaseDate, systemRequirements, description, accessLink, platform, developer, distributor, price, imageURL, videoURL );

    return res.status(response.status).json({message: response.message});
}