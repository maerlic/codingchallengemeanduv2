import app from '../src/app'; 
import supertest from 'supertest';

const request = supertest(app);

describe('GET /pokemon/:name', () => {
  it('should return the correct Pokemon data', async () => {
    const response = await request.get('/pokemon/pikachu');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('pikachu');
    expect(response.body.description).toBeDefined();
    expect(response.body.habitat).toBeDefined();
    expect(response.body.isLegendary).toBeDefined();
  });

  it('should handle non-existent Pokemon', async () => {
    const response = await request.get('/pokemon/nonexistentpokemon');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch data');
  });
});

describe('GET /pokemon/translate/:name', () => {
  it('should return translated description in Yoda style for cave habitat or legendary', async () => {
    const response = await request.get('/pokemon/translate/zubat'); 
    expect(response.status).toBe(200);
    expect(response.body.translationApplied).toBe('yoda');
  });

  it('should return translated description in Shakespeare style for other habitats', async () => {
    const response = await request.get('/pokemon/translate/pikachu');
    expect(response.status).toBe(200);
    expect(response.body.translationApplied).toBe('shakespeare');
  });

  it('should handle errors from the translation API', async () => {
    const response = await request.get('/pokemon/translate/nonexistentpokemon');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch or translate data');
  });
});
