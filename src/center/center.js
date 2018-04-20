import React, { Component } from 'react';
import './center.css'
import { Button, Fade } from 'reactstrap';

class CenterText extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.artistImage) {
            var centerpicture = <img id="centerPic" src={this.props.artistImage} />
            var spotifylink = <a href={this.props.spotifyUrl}><img id='spotify' src='http://markbmusic.com/wp-content/uploads/2016/10/spotifybutton1.png' /></a>
            var listeners = 'Listeners: ' + this.props.listeners;
        }
        return (
            <div>
                {/* <h2> Artist Info </h2> */}
                <div id='centerContainer'>
                    {centerpicture}
                    <h4>{this.props.artistName}</h4>
                    {spotifylink} {listeners}
                    <div> {this.props.artistSummary} </div>
                    {/* <div id='centerText'> {this.props.artistSummary}</div> */}
                </div>

            </div>

        );
    }
}

export default CenterText;