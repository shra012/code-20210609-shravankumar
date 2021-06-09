const app = require('./src/app.js');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
  console.log(
    `Route to show people vitals http://${host}:${port}/peopleVitals/10`
  );
  console.log(
    `Route to show people classified as overweight http://${host}:${port}/overweight/people/10`
  );
});
