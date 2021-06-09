const express = require('express');
const path = require('path');
const {
  readFile,
  computeBMIAndClassify,
  peopleUnderOverweightCategory,
} = require('./helper/people-vital-statistics-helper');

const app = express();

const dataStoreLocation = path.resolve(__dirname, 'resources/one-million-input.json');

// A Memory Cache To Load Data Only Once.
let peopleVitalStatistics = [];

const loadPeopleVitalStatistics = async () => {
  const peopleVitalStatisticsFromFile = await readFile(dataStoreLocation);
  peopleVitalStatistics = computeBMIAndClassify(peopleVitalStatisticsFromFile);
};
// Vitals route
app.get('/peopleVitals/:count', async (req, res) => {
  if (peopleVitalStatistics.length === 0) {
    await loadPeopleVitalStatistics();
  }
  res.json(peopleVitalStatistics.slice(0, req.params.count));
});

app.get('/peopleVitals', function (req, res) {
  res.redirect('/peopleVitals/10');
});

// Overweight people route
app.get('/overweight/people/:count', async (req, res) => {
  if (peopleVitalStatistics.length === 0) {
    await loadPeopleVitalStatistics();
  }
  const overweightPeople = peopleUnderOverweightCategory(peopleVitalStatistics);
  res.json({
    count: overweightPeople.length,
    peopleVitals: overweightPeople.slice(0, req.params.count),
  });
});

app.get('/overweight/people', (req, res) => {
  res.redirect('/overweight/people/10');
});

module.exports = app;
