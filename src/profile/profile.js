import React, { Component } from 'react';
import './profile.css'


class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.profile) {
            var profilePicture = <div id='profileDiv'> <img id='profilePic' src={this.props.profile} /> </div>
        }
        return (
            <div>
                {profilePicture}
            </div>
        );
    }
}

export default Profile;