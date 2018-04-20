import React, { Component } from 'react';
import './flag.css'

class Flag extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.artistImage) {
            // var centerpicture = <img id="centerPic" src={this.props.artistImage} />
            // var spotifylink = <a href={this.props.spotifyUrl}><img id='spotify' src='http://markbmusic.com/wp-content/uploads/2016/10/spotifybutton1.png' /></a>
            
        }
        return (
            <div>
                <div id='flagdiv'> <img id='flag' src={this.props.flag} /> </div>

            </div>

        );
    }
}
export default Flag;