function getRandomNumber() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const randomValue = Math.random();
      const error = randomValue > .8 ? true : false;
      if (error) {
        reject(new Error('Ooops, something broke!'));
      } else {
        resolve(randomValue);
      }
    }, 2000);
  }); 
}
async function logNumbers() {
  let promises = [];
  promises[0] = getRandomNumber();
  promises[1] = getRandomNumber();
  promises[2] = getRandomNumber();
  Promise.all(promises)
    .then(function(values) {
      console.log(values);
    })
    .catch(function(err) {
      console.log(err);
    });
}
logNumbers();