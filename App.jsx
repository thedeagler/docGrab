App = React.createClass({

  getInitialState() {
    // set previews to an empty array
    return {previews: []}
  },

  grabDocs() {
    // get presentations
    return this.getPresentationList(this,(result) => {
      // extract important data from presentation objects that we get back from google drive API
      return result.items.map((doc) => {
        return {
          link: doc.embedLink.replace('link', 'embed'),
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id
        }
      });
    });
  },

  renderPreviews() {
    // iterate over previews and create a new Preview for each item in the array
    return this.state.previews.map((preview) => {
      return (
        <Preview
          key={preview.gid}
          data={preview} />
      )
    })
  },

  getPresentationList(react, cb) {
    // query for all presentations that are in user's google drive
    return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"',null, function (err, result) {
      if(err) console.error(err);
      // pass the document objects to callback, getting an array of objects with specific traits
      var previews = cb(result);
      // change state of previews to this new array
      react.setState({previews: previews});
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
            {this.renderPreviews()}
          </ul>
        </header>
      </div>
    );
  }
});
