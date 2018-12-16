const request = require('request');
const authorization = require('./secrets');
const fs = require('fs');

const userInput = process.argv.slice(2);
console.log(userInput);

console.log('Welcome to the GitHub Avatar Downloader!');

if (userInput[0] && userInput[1]) {
  function getRepoContributors(repoOwner, repoName, cb) {
    const options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': authorization.GITHUB_TOKEN
      }
    };
    console.log('Downloading file...');
    console.log(options.url);

    request(options, function(err, res, body) {
      let obj = JSON.parse(body);
      cb(err, obj);
    });
  }


  function downloadImageByURL(url, filePath) {
    request.get(url)
    .pipe(fs.createWriteStream(filePath));
  }


  getRepoContributors(userInput[1], userInput[0], function(err, result) {
    for (let url in result) {
      let avatarURL = result[url].avatar_url;
      let fileName = result[url].login;
      downloadImageByURL(avatarURL, `./avatars/${fileName}.jpg`);
    }
    console.log("Errors: ", err);
    console.log('Download complete.');
  });


} else {
  console.log('Error: Please input a repo and then the owner!');
}

