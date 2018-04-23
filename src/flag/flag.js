import React, { Component } from 'react';
import './flag.css'

class Flag extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.flag) {
            var flaggy = <div id='flagdiv'> <img id='flag' src={this.props.flag} /> </div>
        }
        return (
            <div>
                {flaggy}
            </div>

        );
    }
}
export default Flag;