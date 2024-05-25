import app from '../src/app'; // Import the Express application instance from the app module in the src directory
import supertest from 'supertest'; // Import supertest, a library to test HTTP endpoints

const request = supertest(app); // Create a supertest request object, passing in the Express app instance

// Describe block for testing the GET /pokemon/:name endpoint
describe('GET /pokemon/:name', () => {
  
  // Test case to check if the endpoint returns correct Pokemon data
  it('should return the correct Pokemon data', async () => {
    const response = await request.get('/pokemon/pikachu'); // Make a GET request to the endpoint with 'pikachu' as the Pokemon name
    expect(response.status).toBe(200); // Expect the response status to be 200 OK
    expect(response.body.name).toBe('pikachu'); // Expect the name in the response body to be 'pikachu'
    expect(typeof response.body.name).toBe('string'); // Expect the name to be a string
    expect(typeof response.body.description).toBe('string'); // Expect the description to be a string
    expect(typeof response.body.habitat).toBe('string'); // Expect the habitat to be a string
    expect(typeof response.body.isLegendary).toBe('boolean'); // Expect the legendary status to be a boolean
  });

  // Test case to check how the endpoint handles a non-existent Pokemon
  it('should handle non-existent Pokemon', async () => {
    const response = await request.get('/pokemon/nonexistentpokemon'); // Make a GET request to the endpoint with a non-existent Pokemon name
    expect(response.status).toBe(500); // Expect the response status to be 500 Internal Server Error
    expect(response.body.error).toBe('Failed to fetch data'); // Expect the error message in the response body to indicate a failure to fetch data
  });
});

// Describe block for testing the GET /pokemon/:name/translate endpoint
describe('GET /pokemon/:name/translate', () => {
  
  // Test case to check if the endpoint returns translated description in Yoda style for cave habitat or legendary Pokemon
  it('should return translated description in Yoda style for cave habitat or legendary', async () => {
    const response = await request.get('/pokemon/zubat/translate'); // Make a GET request to the endpoint with 'zubat' as the Pokemon name
    expect(response.status).toBe(200); // Expect the response status to be 200 OK
    expect(response.body.translationApplied).toBe('yoda'); // Expect the translation applied to be 'yoda'
  });

  // Test case to check if the endpoint returns translated description in Shakespeare style for other habitats
  it('should return translated description in Shakespeare style for other habitats', async () => {
    const response = await request.get('/pokemon/pikachu/translate'); // Make a GET request to the endpoint with 'pikachu' as the Pokemon name
    expect(response.status).toBe(200); // Expect the response status to be 200 OK
    expect(response.body.translationApplied).toBe('shakespeare'); // Expect the translation applied to be 'shakespeare'
  });

  // Test case to check how the endpoint handles errors from the translation API
  it('should handle errors from the translation API', async () => {
    const response = await request.get('/pokemon/nonexistentpokemon/translate'); // Make a GET request to the endpoint with a non-existent Pokemon name
    expect(response.status).toBe(500); // Expect the response status to be 500 Internal Server Error
    expect(response.body.error).toBe('Failed to fetch or translate data'); // Expect the error message in the response body to indicate a failure to fetch or translate data
  });
});
