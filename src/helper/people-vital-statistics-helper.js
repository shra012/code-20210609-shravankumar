const fs = require('fs').promises;

exports.readFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath);
    return JSON.parse(content.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
    throw Error(`Got an error trying to read the file: ${error.message}`)
  }
};

exports.computeBMIAndClassify = (peopleVitalStatistics) => {
  return peopleVitalStatistics.map((personVitalStatistics) => {
    const heightInMeters = personVitalStatistics['HeightCM'] / 100;
    const weightInKiloGram = personVitalStatistics['WeightKg'];
    // bmi = weight in kilogram divided by height in meters squared
    const bmi = weightInKiloGram / Math.pow(heightInMeters, 2);
    // we can round off the value if required with .toFixed(1) which rounds off the value to
    // single decimal if next decimal is greater than 5
    const { category, healthRisk } = classifyPeopleByBMI(bmi);
    personVitalStatistics['Category'] = category;
    personVitalStatistics['HealthRisk'] = healthRisk;
    return personVitalStatistics;
  });
};

const classifyPeopleByBMI = (bmi) => {
  if (bmi <= 18.4) {
    return {
      category: 'Underweight',
      healthRisk: 'Malnutrition risk',
    };
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return {
      category: 'Normal weight',
      healthRisk: 'Low risk',
    };
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return {
      category: 'Overweight',
      healthRisk: 'Enhanced risk',
    };
  } else if (bmi > 29.9 && bmi <= 34.9) {
    return {
      category: 'Moderately obese',
      healthRisk: 'Medium risk',
    };
  } else if (bmi > 34.9 && bmi <= 39.9) {
    return {
      category: 'Severely obese',
      healthRisk: 'High risk',
    };
  } else {
    return {
      category: 'Very severely obese',
      healthRisk: 'Very high risk',
    };
  }
};

exports.peopleUnderOverweightCategory = (peopleVitalStatistics) => {
  return peopleVitalStatistics.filter(
    (personVitalStatistics) => personVitalStatistics.Category === 'Overweight'
  );
};
