Link = React.createClass({
  propTypes: {
    // require data proto --> contains all link info
    data: React.PropTypes.object.isRequired
  },

  // set state of svgs to empty array
  getInitialState () { 
    return {svgs: []}
  },

  presentation () {
    // declare identifier variables in function scope
    let user = Meteor.user()._id;
    let link = this.props.data.link;
    let gid = this.props.data.gid;

    // call method to create a 
    Meteor.call('createPresentation', link, user, gid, function (err, result) {
      if(err){
        console.error(err);
      }else {
        // search db for presentation with the gid --> make sure to turn into a string for search 
        var pres = Presentations.find({gid: gid+''}).fetch();

      }
    })
  },

  render () {
    return (
      <li>
        <div onClick={this.presentation}>
          <img src={this.props.data.thumbnail}/>
          <h1>{this.props.data.title}</h1>
        </div>
      </li>
    )
  }
})


// <div class="thumbnail" style={{background-image:"url('"+{this.props.data.thumbnail}+"')"}}></div>
