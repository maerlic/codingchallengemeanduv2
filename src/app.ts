import express from 'express';
import { getPokemon, getPokemonTranslated } from './controllers/pokemonController';

const app = express();
const port = process.env.PORT || 3000;

app.get('/pokemon/:name', getPokemon);
app.get('/pokemon/translate/:name', getPokemonTranslated);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;