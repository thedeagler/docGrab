App = React.createClass({
 // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      presentations: Presentations.find({}).fetch()
    }
  },

  renderLinks() {
    return this.getPresentationList((result) => {

      // Get tasks from this.data.tasks
      var look = result.items.map((doc) => {
        return {
          link: doc.embedLink,
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id
        }
      });
      console.log(look.map((link) => {
        return (
          <li> omg pls
            <Link
              key={link.gid}
              data={link}
            />
          </li>
        )
      }))
    })
  },

  getPresentationList(cb) {
    return GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"',null, function (err, result) {
      if(err) console.error(err);

      // Use react setstate instead. Look into state -> subscribe
      return cb(result);
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <AccountsUIWrapper />

          <ul className="presentation_list">
            {this.renderLinks()}
          </ul>
        </header>
      </div>
    );
  }
});
