var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(url, function(err, res, body) {
    cb(err, body);
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
});