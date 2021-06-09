const app = require('../src/app');
const supertest = require('supertest');

test('GET /peopleVitals/:count', async () => {
  await supertest(app)
    .get('/peopleVitals/10')
    .expect(200)
    .then((response) => {
      // Check Data type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(10);

      // Check data
      expect(response.body[0].Gender).toBe('Female');
      expect(response.body[0].HeightCM).toBe(185);
      expect(response.body[0].WeightKg).toBe(65);
      expect(response.body[0].Category).toBe('Normal weight');
      expect(response.body[0].HealthRisk).toBe('Low risk');
    });
});

test('GET /overweight/people/:count', async () => {
  await supertest(app)
    .get('/overweight/people/10')
    .expect(200)
    .then((response) => {
      // Check Data type and length
      expect(response.body.constructor === Object).toBeTruthy();
      expect(response.body).toHaveProperty('count', 180266);
      expect(response.body).toHaveProperty('peopleVitals');
      expect(Array.isArray(response.body.peopleVitals)).toBeTruthy();
      // Check data
      response.body.peopleVitals.forEach((personVitals) => {
        expect(personVitals).toHaveProperty('Gender');
        expect(personVitals).toHaveProperty('HeightCM');
        expect(personVitals).toHaveProperty('WeightKg');
        expect(personVitals.Category).toBe('Overweight');
        expect(personVitals.HealthRisk).toBe('Enhanced risk');
      });
    });
});
