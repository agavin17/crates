import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import "./jumbo.css"

class Jumbo extends Component {
    render() {
        return (
            <div>
                <div>
      <Jumbotron id='jumbothing'>
        <h1 className="display-3">Welcome to BitQuilts</h1>
        <p className="lead">Im gonna try to make quilts out of album artwork from Last.FM API</p>
        <hr className="my-2" />
        <p>Something Will eventually go here too...</p>
        <p className="lead">
          <Button color="dark">What Does This Button Do?</Button>
        </p>
      </Jumbotron>
    </div>
            </div>
        );
    }
}

export default Jumbo;