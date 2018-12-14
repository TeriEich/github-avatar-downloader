var request = require('request');
var authorization = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': authorization
    }
  };
  console.log('Downloading file...');

  request(options, function(err, res, body) {
    let obj = JSON.parse(body);
    cb(err, obj);
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors('jquery', 'jquery', function(err, result) {
  for (let url in result) {
    let avatarURL = result[url].avatar_url;
    let fileName = result[url].login;
    downloadImageByURL(avatarURL, `./avatars/${fileName}.jpg`);
  }
  console.log("Errors: ", err);
});

console.log('Download complete.');
