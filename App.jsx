App = React.createClass({
  
  getInitialState () { 
    // set links to an empty array
    return {links: []}
  },

  grabDocs() { 
    // get presentations
    return this.getPresentationList(this,(result) => {
      // extract important data from presentation objects that we get back from google drive API
      return result.items.map((doc) => {
        return {
          link: doc.embedLink.replace('preview', 'embed'),
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id
        }
      });
    });
  },

  renderLinks() {
    // iterate over links and create a new Link for each item in the array
    return this.state.links.map((link) => {
      return (
        <Link
          key={link.gid}
          data={link} />
      )
    })
  },

  getPresentationList(react, cb) {
    // query for all presentations that are in user's google drive
    return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"',null, function (err, result) {
      if(err) console.error(err);
      // pass the document objects to callback, getting an array of objects with specific traits
      var links = cb(result);
      // change state of links to this new array
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
