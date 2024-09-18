import { createGenre, findGenreByName, selectGenres } from '@/pages/api/model/genre'

export async function createGenreController(_name:string) {
    try {

        // Verificações
        const genreByName = await findGenreByName(_name);

        if (genreByName != undefined) {
            return { status: 400, message: 'Genre already registered' };
        }

        const response = await createGenre(_name);

        return { status: 201, message: 'Genre Created', data: response }

    } catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}

export async function selectGenresController() {
    try {
        const response = await selectGenres();

        return {status: 200, message: 'Select genres', data: response};

        
    } catch (err) {
        return { status: 500, message: 'Something went wrong' };
    }
}
