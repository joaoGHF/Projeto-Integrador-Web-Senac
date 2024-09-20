import { NextApiRequest, NextApiResponse } from "next";
import { createGameController } from "../../controller/gameController";
import { createGameRequest } from "@/request/createGameRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, releaseDate, genres, systemRequirements, description, accessLink, platform, developer, distributor, price, imageURL, videoURL } = req.body;

    const checkRequest = createGameRequest(name, releaseDate, systemRequirements, description, accessLink, platform, developer, distributor, price, imageURL, videoURL);

    if ( checkRequest.response == false ) {
        return res.status(400).json( { message: checkRequest.message } );
    }
    
    const response = await createGameController(name, releaseDate, genres, systemRequirements, description, accessLink, platform, developer, distributor, price, imageURL, videoURL );

    return res.status(response.status).json({message: response.message});
}