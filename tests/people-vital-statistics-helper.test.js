const {
  readFile,
  computeBMIAndClassify,
  peopleUnderOverweightCategory,
} = require('../src/helper/people-vital-statistics-helper');
const path = require('path');

let peopleVitalStatistics = [];
let dataSet = [];
beforeAll(async () => {
  const dataStoreLocation = path.resolve(__dirname, 'test-input.json');
  dataSet = await readFile(dataStoreLocation);
  peopleVitalStatistics = computeBMIAndClassify(dataSet);
  return peopleVitalStatistics;
});

test('readFile loads the given file', () => {
  expect(Array.isArray(dataSet)).toBeTruthy();
  expect(dataSet.length).toEqual(6);

  expect(dataSet[0].Gender).toBe('Female');
  expect(dataSet[0].HeightCM).toBe(185);
  expect(dataSet[0].WeightKg).toBe(55);
});

test('Check if compute bmi classifies Underweight', () => {
  expect(peopleVitalStatistics[0]).toHaveProperty('Category', 'Underweight');
  expect(peopleVitalStatistics[0]).toHaveProperty(
    'HealthRisk',
    'Malnutrition risk'
  );
});

test('Check if compute bmi classifies Normal Weight', () => {
  expect(peopleVitalStatistics[1]).toHaveProperty('Category', 'Normal weight');
  expect(peopleVitalStatistics[1]).toHaveProperty('HealthRisk', 'Low risk');
});

test('Check if compute bmi classifies Overweight', () => {
  expect(peopleVitalStatistics[2]).toHaveProperty('Category', 'Overweight');
  expect(peopleVitalStatistics[2]).toHaveProperty(
    'HealthRisk',
    'Enhanced risk'
  );
});

test('Check if compute bmi classifies Moderately obese', () => {
  expect(peopleVitalStatistics[3]).toHaveProperty(
    'Category',
    'Moderately obese'
  );
  expect(peopleVitalStatistics[3]).toHaveProperty('HealthRisk', 'Medium risk');
});

test('Check if compute bmi classifies Severely obese', () => {
  expect(peopleVitalStatistics[4]).toHaveProperty('Category', 'Severely obese');
  expect(peopleVitalStatistics[4]).toHaveProperty('HealthRisk', 'High risk');
});

test('Check if compute bmi classifies Very severely obese', () => {
  expect(peopleVitalStatistics[5]).toHaveProperty(
    'Category',
    'Very severely obese'
  );
  expect(peopleVitalStatistics[5]).toHaveProperty(
    'HealthRisk',
    'Very high risk'
  );
});

test('Test function which identifies people with overweight category', () => {
  const overweightPeople = peopleUnderOverweightCategory(peopleVitalStatistics);
  expect(overweightPeople.length).toEqual(1);

  expect(overweightPeople[0].Gender).toBe('Male');
  expect(overweightPeople[0].HeightCM).toBe(189);
  expect(overweightPeople[0].WeightKg).toBe(100);
  expect(overweightPeople[0].Category).toBe('Overweight');
  expect(overweightPeople[0].HealthRisk).toBe('Enhanced risk');
});
