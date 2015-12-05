App = React.createClass({
 // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      presentations: Presentations.find({}).fetch()
    }
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <AccountsUIWrapper />

          <Links />
        </header>
      </div>
    );
  }
});
