import { prisma } from "@/db";

export async function createGame(_name:string, _releaseDate:string, _systemRequirements:string, _description:string, _accessLink:string, _platform:string, _developer:string, _distributor:string, _price:number, _imageURL:string, _videoURL:string) {
    console.log("Dentro da model");
    console.log(_releaseDate);
    
    
    const game = await prisma.game.create({
        data: {
            name: _name,
            releaseDate: _releaseDate,
            systemRequirements: _systemRequirements,
            description: _description,
            accessLink: _accessLink,
            platform: _platform,
            developer: _developer,
            distributor: _distributor,
            price: _price,
            imageURL: _imageURL,
            videoURL: _videoURL
        }
    });

    return game;
}

export async function findGameByName(_name:string) {
    const game = await prisma.game.findUnique({
        where: {
            name: _name
        }
    });

    return game;
}

export async function selectGames() {
    const games = await prisma.game.findMany();

    return games;
}