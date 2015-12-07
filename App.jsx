App = React.createClass({
 // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState () { 
    return {links: []}
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      presentations: Presentations.find({}).fetch()
    }
  },
  grabDocs() { 
    console.log('user', Meteor.user());
    return this.getPresentationList(this,(result) => {

      // Get tasks from this.data.tasks
      return result.items.map((doc) => {
        return {
          link: doc.embedLink.replace('preview', 'embed'),
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id,
          owner: doc.owners[0]
        }
      });
    });
  },

  renderLinks() {
    return this.state.links.map((link) => {
      return (
        <Link
          key={link.gid}
          data={link} />
      )
    })
  },

  getPresentationList(react, cb) {
    return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"',null, function (err, result) {
      if(err) console.error(err);

      // Use react setstate instead. Look into state -> subscribe
      console.log(result);
      var links = cb(result);
      console.log('here are links', links);
      react.setState({links: links});
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <AccountsUIWrapper />
          <button onClick={this.grabDocs}> grab docs </button>

          <ul className="presentation_list">
            {this.renderLinks()}
          </ul>
        </header>
      </div>
    );
  }
});
