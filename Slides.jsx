Slides = React.createClass({
  propTypes: {
    // require data proto --> contains all link info
    svgs: React.PropTypes.array
  },

  getInitialState () { 
    // set links to an empty array
    return {index: 0}
  },

  increment() {
    var numb = this.state.index + 1;
    if(numb >= this.props.svgs.length){
      this.setState({index: 0})
    } else {
      this.setState({index: numb});    
    }
  },

  slideMaker(){
    console.log("making a slide");
    return {__html: this.props.svgs[this.state.index]};
  },

  render () {
    return <div className="slide" onClick={this.increment} dangerouslySetInnerHTML={this.slideMaker()}></div>
  }
})
