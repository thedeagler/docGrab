Link = React.createClass({
  propTypes: {
    // thumbUrl: React.PropTypes.any.isRequired,
    // presentation: React.PropTypes.any.isRequired,
    // title: React.PropTypes.string.isRequired
    data: React.PropTypes.object.isRequired
  },

  presentation () {
    Meteor.call('getPresentationHtml', this.props.data.link, function (err, result) {
      if(err){
        console.error(err);
      }else {
        console.log("we got back here with this", result);
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
