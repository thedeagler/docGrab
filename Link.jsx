Link = React.createClass({
  propTypes: {
    // thumbUrl: React.PropTypes.any.isRequired,
    // presentation: React.PropTypes.any.isRequired,
    // title: React.PropTypes.string.isRequired
    data: React.PropTypes.object.isRequired
  },
  getInitialState () { 
    return {svgs: []}
  },

  presentation () {
    user = Meteor.user()._id;
    link = this.props.data.link;
    gid = this.props.key;

    Meteor.call('getPresentationHtml', link, user, gid, function (err, result) {
      if(err){
        console.error(err);
      }else {
        var pres = Presentations.find({}).fetch();
        console.log("this here", pres);
      }
    })
  },

  slide (){ 
    this.state.svgs.map((svg) =>{
      return (< Slide svg={svg} />)
    })
  },

  render () {
    return (
      <li>
        <div onClick={this.presentation}>
          <img src={this.props.data.thumbnail}/>
          <h1>{this.props.data.title}</h1>
        </div>
        {this.slide()}
      </li>
    )
  }
})


// <div class="thumbnail" style={{background-image:"url('"+{this.props.data.thumbnail}+"')"}}></div>
