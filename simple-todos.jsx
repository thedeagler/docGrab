// Define a collection to hold our tasks

Presentations = new Mongo.Collection("presentations");

if (Meteor.isClient) {
  // This code is executed on the client only
  var scopes = ['https://www.googleapis.com/auth/drive'];


  Accounts.ui.config({
    'passwordSignupFields': 'USERNAME_ONLY',
    'requestPermissions': { 'google': scopes },
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  var getSVG = Meteor.npmRequire('google-slides-downloader');
  Meteor.methods ({
    getPresentationHtml: function (url, id, gid) {
      GoogleApi.post("drive/v2/files/"+gid+"/permissions", {data: {"type":"anyone", "role": "reader"}}, function (err, result) {
        getSVG.getSVGs(url).then(function (svgs){
          Presentations.upsert({
            svgs: svgs,
            url: url,
            user: id,
            gid: gid
          });
          return svgs;
        })
      })
    }
  })
};

