Slides = React.createClass({
  propTypes: {
    // require data proto --> contains all link info
    svgs: React.PropTypes.array
  },

  getInitialState() {
    // set links to an empty array
    return {index: 0}
  },

  nextSlide() {
    var numb = this.state.index + 1;
    if(numb >= this.props.svgs.length){
      this.setState({index: 0})
    } else {
      this.setState({index: numb});
    }
  },

  prevSlide() {
    var numb = this.state.index - 1;
    if(numb >= this.props.svgs.length){
      this.setState({index: 0})
    } else {
      this.setState({index: numb});
    }
  },

  slideMaker() {
    console.log("making a slide");
    return {__html: this.props.svgs[this.state.index]};
  },

  // DOESN't really work. Once deleted, can't be re-added
  // closePres(e) {
  //   console.log(e.target);
  //   e.target.parentNode.parentNode.HTML = null;
  // },

  render () {
    return (
      <div>
        <div className="slide" onClick={this.nextSlide} dangerouslySetInnerHTML={this.slideMaker()}></div>
        <span onClick={this.prevSlide}>prev</span>
        <span onClick={this.nextSlide}>next</span>
        <span onClick={this.closePres}>close</span>
      </div>
    )
  }
})
