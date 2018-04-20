//IMPORTS!!!
import React, { Component } from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, Fade, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Jumbo from "../jumbo/jumbo.js";
import axios from "axios";
import './bitquilts.css';
import CenterText from "../center/center.js";
import Album from "../album/album.js";
import classnames from 'classnames';
import Flag from '../flag/flag.js'

var Chance = require('chance');

//Generate 10 unique numbers from 1-100 
var chance = new Chance();
var randomNumbers = chance.unique(chance.integer, 10, { min: 0, max: 100 });

//save the numbers to respective variables
let randNum1 = randomNumbers[0]
let randNum2 = randomNumbers[1]
let randNum3 = randomNumbers[2]
let randNum4 = randomNumbers[3]
let randNum5 = randomNumbers[4]
let randNum6 = randomNumbers[5]
let randNum7 = randomNumbers[6]
let randNum8 = randomNumbers[7]
let randNum9 = randomNumbers[8]

//React class component with set-state(s)
class Bitquilts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            locationData: {},
            fadeIn: false,
            artistSummary: "Select An Album or Artist To Load Info",
            artistName: "",
            spotifyUrl: "",
            albumName: "",
            artistImage: "",
            flag: null,
            listeners: "",
            welcome: "Enter a country to get started!",
            similardata: {}
        }
        // this.toggle = this.toggle.bind(this);
        this.artistInfo = this.artistInfo.bind(this);
        this.setUser = this.setUser.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.spotifyAlbumSearch = this.spotifyAlbumSearch.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setSimilar = this.setSimilar.bind(this);
    }

    //FUNCTIONS!!!

    // toggle() {
    //     this.setState({
    //         fadeIn: !this.state.fadeIn
    //     });
    // }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    //Shuffle function (gathers new records based on random numbers)
    shuffle() {
        randomNumbers = chance.unique(chance.integer, 10, { min: 0, max: 99 });
        randNum1 = randomNumbers[0]
        randNum2 = randomNumbers[1]
        randNum3 = randomNumbers[2]
        randNum4 = randomNumbers[3]
        randNum5 = randomNumbers[4]
        randNum6 = randomNumbers[5]
        randNum7 = randomNumbers[6]
        randNum8 = randomNumbers[7]
        randNum9 = randomNumbers[8]
        this.setState({

        });
    }

    //Set Username from Last.FM based on input value
    setUser(input) {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${input}&period=3month&limit=101&api_key=5bc98df467c4541a1787d433095c0db0&format=json`).then((response) => {
            // axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${input}&api_key=5bc98df467c4541a1787d433095c0db0&format=json`).then((response) => {
            this.setState({
                data: response.data,
                fadeIn: !this.state.fadeIn
            })
        })
    }

    setSimilar(input) {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${input}&api_key=5bc98df467c4541a1787d433095c0db0&format=json`).then((response) => {
            console.log(response)

            this.setState({
                data: response.data,
                fadeIn: !this.state.fadeIn
            })

        })
    }

    //Set Location from Last.FM based on input value
    setCountry(input, input2) {
        Promise.all([axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${input}&location=${input2}&limit=101&api_key=5bc98df467c4541a1787d433095c0db0&format=json`),axios.get(`https://restcountries.eu/rest/v2/name/${input}`)])
        .then((responses) => {
                this.setState({
                    data: responses[0].data,
                    flag: responses[1].data[0].flag,
                    welcome: null
                })
            })
    }

    //Gather artist info based on selected album from Last.FM
    artistInfo(input) {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${input}&api_key=5bc98df467c4541a1787d433095c0db0&format=json`).then((response) => {
            this.setState({
                artistSummary: response.data.artist.bio.summary,
                artistName: response.data.artist.name,
                artistImage: response.data.artist.image[2]['#text'],
                listeners:  response.data.artist.stats.listeners
            })
            this.spotifyAlbumSearch()
        })
    }

    //Hitting Spotify API based on selected album to create a working Spotify Link
    spotifyAlbumSearch() {
        axios.post("/hitSpotify", { artistName: this.state.artistName }).then((response) => {
            if (response.data.uri) {
                this.setState({
                    spotifyUrl: response.data.uri
                });
            }
        })
    }

    render() {
        if (this.state.data.topalbums) {
            var shufflebutton = <Button color='warning' onClick={this.shuffle}>Shuffle</Button>
            var artistList = <div>
                {/* <Fade in={this.state.fadeIn}>  */}
                <table id='matrix'>
                    <tbody>
                        <tr>
                            {/* <Album data={this.state.data} artistSummary={this.state.artistSummary}/> */}
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum1].artist.name)}><img src={this.state.data.topalbums.album[randNum1].image[2]["#text"]} /> </Button> <div><p className="album"> {this.state.data.topalbums.album[randNum1].artist.name} - {this.state.data.topalbums.album[randNum1].name}</p></div> </td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum2].artist.name)}><img src={this.state.data.topalbums.album[randNum2].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.topalbums.album[randNum2].artist.name} - {this.state.data.topalbums.album[randNum2].name}</p></td>
                            <div className='cellbg'> <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum3].artist.name)}><img src={this.state.data.topalbums.album[randNum3].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.topalbums.album[randNum3].artist.name} - {this.state.data.topalbums.album[randNum3].name}</p></td></div>
                        </tr>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum4].artist.name)}><img src={this.state.data.topalbums.album[randNum4].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.topalbums.album[randNum4].artist.name} - {this.state.data.topalbums.album[randNum4].name}</p></td></div>
                            <td className='center'>
                                <CenterText data={this.state.data} artistSummary={this.state.artistSummary} artistName={this.state.artistName} artistImage={this.state.artistImage} spotifyUrl={this.state.spotifyUrl} listeners={this.state.listeners} />
                            </td>
                            <div className='cellbg'> <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum5].artist.name)}><img src={this.state.data.topalbums.album[randNum5].image[2]["#text"]} /></Button> <p className="album"> {this.state.data.topalbums.album[randNum5].artist.name} - {this.state.data.topalbums.album[randNum5].name}</p></td></div>

                            {/* <td><img src={this.state.data.topalbums.album[randNum4].image[3]["#text"]} /></td>
                    <td><img src={this.state.data.topalbums.album[randNum5].image[3]["#text"]} /></td>
                    <td><img src={this.state.data.topalbums.album[randNum6].image[3]["#text"]} /></td> */}

                            {/* <td><img src={this.state.data.similarartists.artist[randNum4].image[4]["#text"]} /></td>
                    <td><img src={this.state.data.similarartists.artist[randNum5].image[4]["#text"]} /></td>
                    <td><img src={this.state.data.similarartists.artist[randNum6].image[4]["#text"]} /></td> */}
                        </tr>
                        <tr>
                            <div className='cellbg'>  <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum6].artist.name)}><img src={this.state.data.topalbums.album[randNum6].image[2]["#text"]} /></Button> <p className="album"> {this.state.data.topalbums.album[randNum6].artist.name} - {this.state.data.topalbums.album[randNum6].name}</p></td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum7].artist.name)}><img src={this.state.data.topalbums.album[randNum7].image[2]["#text"]} /> </Button><p className="album"> {this.state.data.topalbums.album[randNum7].artist.name} - {this.state.data.topalbums.album[randNum7].name}</p></td>
                            <div className='cellbg'>  <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.topalbums.album[randNum8].artist.name)}><img src={this.state.data.topalbums.album[randNum8].image[2]["#text"]} /></Button><p className="album"> {this.state.data.topalbums.album[randNum8].artist.name} - {this.state.data.topalbums.album[randNum8].name}</p></td></div>

                            {/* <td><img src={this.state.data.topalbums.album[randNum7].image[3]["#text"]} /></td>
                    <td><img src={this.state.data.topalbums.album[randNum8].image[3]["#text"]} /></td>
                    <td><img src={this.state.data.topalbums.album[randNum9].image[3]["#text"]} /></td> */}

                            {/* <td><img src={this.state.data.similarartists.artist[randNum7].image[4]["#text"]} /></td>
                    <td><img src={this.state.data.similarartists.artist[randNum8].image[4]["#text"]} /></td>
                    <td><img src={this.state.data.similarartists.artist[randNum9].image[4]["#text"]} /></td> */}
                        </tr>
                    </tbody>
                </table>
                {/* </Fade> */}
                {/* <Button onClick={this.spotifyAlbumSearch}>spotify</Button> */}

            </div>
        } else if (this.state.data.tracks) {
            var shufflebutton = <Button color='warning' onClick={this.shuffle}>Shuffle</Button>
            var countryArtistList = <div>
                <table id='matrix'>
                    <tbody>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum1].artist.name)}><img src={this.state.data.tracks.track[randNum1].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum1].artist.name} - {this.state.data.tracks.track[randNum1].name}</p> </td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum2].artist.name)}><img src={this.state.data.tracks.track[randNum2].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum2].artist.name} - {this.state.data.tracks.track[randNum2].name}</p> </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum3].artist.name)}><img src={this.state.data.tracks.track[randNum3].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum3].artist.name} - {this.state.data.tracks.track[randNum3].name}</p> </td></div>
                        </tr>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum4].artist.name)}><img src={this.state.data.tracks.track[randNum4].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum4].artist.name} - {this.state.data.tracks.track[randNum4].name}</p> </td></div>
                            <td className='center'>
                                <CenterText data={this.state.data} artistSummary={this.state.artistSummary} artistName={this.state.artistName} artistImage={this.state.artistImage} spotifyUrl={this.state.spotifyUrl} listeners={this.state.listeners} />
                            </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum5].artist.name)}><img src={this.state.data.tracks.track[randNum5].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum5].artist.name} - {this.state.data.tracks.track[randNum5].name}</p> </td></div>
                        </tr>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum6].artist.name)}><img src={this.state.data.tracks.track[randNum6].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum6].artist.name} - {this.state.data.tracks.track[randNum6].name}</p> </td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum7].artist.name)}><img src={this.state.data.tracks.track[randNum7].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum7].artist.name} - {this.state.data.tracks.track[randNum7].name}</p> </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.tracks.track[randNum8].artist.name)}><img src={this.state.data.tracks.track[randNum8].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.tracks.track[randNum8].artist.name} - {this.state.data.tracks.track[randNum8].name}</p> </td></div>
                        </tr>
                    </tbody>
                </table>
            </div>
        } else if (this.state.data.similarartists) {
            var shufflebutton = <Button color='warning' onClick={this.shuffle}>Shuffle</Button>
            var similarArtistList = <div>
                <table id='matrix'>
                    <tbody>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum1].name)}><img src={this.state.data.similarartists.artist[randNum1].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum1].name}</p> </td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum2].name)}><img src={this.state.data.similarartists.artist[randNum2].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum2].name}</p> </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum3].name)}><img src={this.state.data.similarartists.artist[randNum3].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum3].name}</p> </td></div>
                        </tr>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum4].name)}><img src={this.state.data.similarartists.artist[randNum4].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum4].name}</p> </td></div>
                            <td className='center'>
                                <CenterText data={this.state.data} artistSummary={this.state.artistSummary} artistName={this.state.artistName} artistImage={this.state.artistImage} spotifyUrl={this.state.spotifyUrl} listeners={this.state.listeners} />
                            </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum5].name)}><img src={this.state.data.similarartists.artist[randNum5].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum5].name}</p> </td></div>
                        </tr>
                        <tr>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum6].name)}><img src={this.state.data.similarartists.artist[randNum6].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum6].name}</p> </td></div>
                            <td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum7].name)}><img src={this.state.data.similarartists.artist[randNum7].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum7].name}</p> </td>
                            <div className='cellbg'><td> <Button color='dark' onClick={() => this.artistInfo(this.state.data.similarartists.artist[randNum8].name)}><img src={this.state.data.similarartists.artist[randNum8].image[2]["#text"]} /> </Button> <p className="album"> {this.state.data.similarartists.artist[randNum8].name}</p> </td></div>
                        </tr>
                    </tbody>
                </table>
            </div>
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            User Crates
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Country Crates
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Artist Crates
            </NavLink>
                    </NavItem>

                </Nav>


                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div className='yourmom'>
                                    <input id="artistName" type="text" placeholder="Username" />  <Button color='info'
                                        id="clickme" onClick={() => this.setUser(document.getElementById("artistName").value)}>Browse</Button> {shufflebutton}
                                </div>
                                <div id='quiltcontainer'>
                                    <h5>Enter a Last.FM user account to start diggin'!</h5>
                                    {artistList}
                                </div>

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <div className='yourmom'>
                                    <input id="country" type="text" placeholder="Country (required)" />
                                    <input id="location" type="text" placeholder="City (optional)" />  <Button color='info'
                                        id="clickme" onClick={() => this.setCountry(document.getElementById("country").value, document.getElementById("location").value)}>Browse</Button> {shufflebutton}
                                    <Flag flag={this.state.flag} />

                                </div>
                                <div id='quiltcontainer'>
                                    <div id='welcome'>{this.state.welcome}</div>
                                    {countryArtistList}
                                </div>


                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <div className='yourmom'>
                                    <input id="artist" type="text" placeholder="Artist Name" />  <Button color='info'
                                        id="clickme" onClick={() => this.setSimilar(document.getElementById("artist").value)}>Browse</Button> {shufflebutton}

                                </div>
                                <div id='quiltcontainer'>
                                    <div id='welcome'>{this.state.welcome}</div>
                                    {similarArtistList}
                                </div>


                            </Col>
                        </Row>
                    </TabPane>

                </TabContent>
                {/* <Jumbo /> */}
            </div>
        );
    }
}

export default Bitquilts;