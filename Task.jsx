// Task component - represents a single todo item
Links = React.createClass({

  renderLinks(result) {
    // Get tasks from this.data.tasks
    var look = result.items.map((doc) => {
      return {
        link: doc.embedLink,
        title: doc.title,
        thumbnail: doc.thumbnailLink, 
        gid: doc.id
      }
    });
    return look.map((link) => {
      return <Link 
        key={link.gid}
        data={link}/>
    })
  },

  information(cb) {
    console.log("this is the user",Meteor.user());
    GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"',null, function (err, result){
      if(err){
        console.error(err);
      }


      this.state.allLinks = this.renderLinks(result);
    });

  },

  render() {
    return this.renderLinks()
  }
});
