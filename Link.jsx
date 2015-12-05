Link = React.createClass({
  propTypes: {
    // thumbUrl: React.PropTypes.any.isRequired,
    // presentation: React.PropTypes.any.isRequired,
    // title: React.PropTypes.string.isRequired
    data: React.PropTypes.object.isRequired
  },

  presentation () {
    GoogleApi.get(this.props.data.link, null, function (err, results) {
      if(err) {
        console.error(err);
      } else {
        console.log("this is the results from ")
      }
    })
  },

  render () {
    return (
      <div onClick={this.presentation}>
        <div class="thumbnail" style="background-image=url({this.prop.data.thumbnail})"></div>
        <h1>{this.prop.data.title}</h1>
      </div>
    )
  }
})
