const request = require('request');
const authorization = require('./secrets');
const fs = require('fs');

const userInput = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

// requests and parses the contributor information from the repo:
function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': authorization.GITHUB_TOKEN
    }
  };
  // checks if repo owner and repo name args were given:
  if (userInput[0] && userInput[1]) {
    console.log('Downloading file...');

    request(options, function (err, res, body) {
      let obj = JSON.parse(body);
      cb(err, obj);
    });

  } else {
    console.log('Error: Please input both a repo name and the owner!');
  }
}

// downloads the avatar images into the specified file path:
function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

// loops through the array of contributor information for avatar urls and logins for the file names:
getRepoContributors(userInput[1], userInput[0], function(err, result) {
  for (let url in result) {
    let avatarURL = result[url].avatar_url;
    let fileName = result[url].login;
    downloadImageByURL(avatarURL, `./avatars/${fileName}.jpg`);
  }
  console.log('Errors: ', err);
  console.log('Download complete.');
});
