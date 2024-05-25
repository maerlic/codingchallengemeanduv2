import express from 'express'; 
import { getPokemon, getPokemonTranslated } from './controllers/pokemonController'; // Import the controller functions from the pokemonController module

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 3000; // Define the port on which the server will run, using an environment variable if available, or defaulting to 3000

// Define a route handler for GET requests to /pokemon/:name
// This route will invoke the getPokemon function, which fetches Pokemon data by species name
app.get('/pokemon/:name', getPokemon);

// Define a route handler for GET requests to /pokemon/:name/translate
// This route will invoke the getPokemonTranslated function, which fetches the Pokemon data and translates the descriptions by species name
app.get('/pokemon/:name/translate', getPokemonTranslated);

// Start the Express server and have it listen on the specified port
// When the server starts, log a message indicating the URL where the server is running
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app; // Export the Express application instance for use in other modules, such as for testing
