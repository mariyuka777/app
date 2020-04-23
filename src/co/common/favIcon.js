import React from 'react'
import network from '~network'
import colors from '../../modules/colors'

var brokenImgs = []

export default class FavIcon extends React.Component {
	state = {}

	static getDerivedStateFromProps(props) {
		if (brokenImgs.indexOf(props.domain)!=-1)
			return null
		else
			return { domain: props.domain }
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.domain != nextProps.domain)
	}

	handleImgLoadSuccess(e) {
		if (e.target.naturalWidth<=1){
			this.handleImgLoadError();
			return;
		}

		if (brokenImgs.indexOf(this.state.domain)!=-1){
			brokenImgs.splice(brokenImgs.indexOf(this.state.domain),1);
		}
	}

	handleImgLoadError() {
		if (brokenImgs.indexOf(this.state.domain)==-1){
			brokenImgs.push(this.state.domain);
		}

		this.setState({domain: false});
	}

	render() {
		var img;

		if (this.state.domain)
			img = <img
					srcSet={network.favIcon(this.state.domain)+" 1x, "+network.favIcon(this.state.domain,"retina")+" 2x"}
					onLoad={this.handleImgLoadSuccess.bind(this)} onError={this.handleImgLoadError.bind(this)} alt="" />;
		else
			img = <span ref="img" className={this.props.className+" "+this.props.className+"-placeholder"} style={{backgroundColor: "rgba("+colors.colorFromString(this.props.domain)+",.3)"}}></span>;

		return (
			<span className={this.props.className} style={this.props.style}>
				{img}
			</span>
		);
	}
}