// Define a collection to hold our tasks
Presentations = new Mongo.Collection("presentations");

if (Meteor.isClient) {
  // set scope for google auth to include drive access
  var scopes = ['https://www.googleapis.com/auth/drive'];

  Accounts.ui.config({
    'passwordSignupFields': 'USERNAME_ONLY',
    'requestPermissions': { 'google': scopes },
    'requestOfflineToken': { 'google': true}
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the App component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // require npm package
  Meteor.startup(function () {
    Presentations.remove({});
  })
  var getSVG = Meteor.npmRequire('google-slides-downloader');
  Meteor.methods ({
    // method for creating a new presentation in database with svg elements
    createPresentation: function (url, id, gid, cb) {
      // change privacy setting of the presentation to public
      GoogleApi.post("drive/v2/files/"+gid+"/permissions", {data: {"type":"anyone", "role": "reader"}}, function (err, result) {
        // pass in url to get an array of svgs
        getSVG.getSVGs(url).then(function (svgs){
          // update or insert a presentation in database
          Presentations.upsert({gid: gid.toString()}, {
            svgs: svgs,
            url: url,
            user: id,
            gid: gid
          });
          return svgs;
        }).then(function () {
          return;
        })
      })
    }
  })
};

