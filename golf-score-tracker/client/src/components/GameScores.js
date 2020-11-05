import React, { Component } from 'react';
import '../Styles/ScoreCardStyle.css';

export default class GamesScores extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            player: '',
            courses: {},
            scoreCards: {}
        }
        this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:5000/game_scores";
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < data.length; i ++) {
            this.setState ({players: this.state.players.concat([data[i].player_name])})
        }
    }

    handlePlayerSelect = (event) => {
        this.setState({
            player: event.target.value
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch ("http://localhost:5000/game_scores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    selectedPlayer: document.getElementById("player_list").value
                })
            });
            const data = await response.json();
            this.setState({
                courses: data[0],
                scoreCards: data[1]
            })
        } catch (err) {
            console.error(err.messsage);
        }
    }

    displayCards = () => {
        let cards = [];
        for (let [courseName, scores] of Object.entries(this.state.scoreCards)) {
            for (let i = 0; i < scores.length; i ++) {
                cards.push(
                    <div class="Card-score-box">
                        <h2>{courseName}</h2>
                        <table className="Card-scores">
                            <tbody>
                                <tr className="Hole-num">
                                    <th style={{color: "white"}}>Hole</th>
                                    {this.holeNums()}
                                </tr>
                                <tr>
                                    <th style={{color: "white"}}>Par</th>
                                    {this.pars(this.state.courses[courseName])}
                                </tr>
                                <tr>
                                    <th style={{color: "white"}}>Score</th>
                                    {this.holeScores(scores[i], this.state.courses[courseName])}
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        return cards;
    }

    holeNums = () => {
        let card = [];
        for (let i = 1; i <= 18; i ++) {
            card.push(<th style={{color: "white"}} className="Table-cells">{i}</th>);
        }
        card.push(<th style={{color: "white"}}>Total</th>);
        return card;
    }

    pars = (course) => {
        let card = [];
        for (let i = 0; i < 19; i ++) {
            card.push(<th style={{color: "white"}} className="Table-cells">{course[i]}</th>);
        }
        return card;
    }

    holeScores = (scores, course) => {
        let card = [];
        let bColor = '';
        let scoreDif = 0;
        for (let i = 0; i < 18; i ++) {
            scoreDif = scores[i] - course[i];
            if(scoreDif == -2) {
                bColor = '#32b1e4';
            }
            if(scoreDif == -1) {
                bColor = '#a3cff6';
            }
            if(scoreDif == 0) {
                bColor = '#a2a7aa';
             }
            if(scoreDif == 1) {
                bColor = '#f6b840'; 
            }
            if(scoreDif == 2) {
                bColor = '#ee5c00';
            }
            if(scoreDif == 3) {
                bColor = '#AD6B00';
            }
            if(scoreDif >= 4) {
                bColor = '#ec1d1d';
            }
            card.push(<th style={{color: "black"}} className="Table-cells" bgcolor={bColor}>{scores[i]}</th>);
        }
        card.push(<th style={{color: "white"}} className="Table-cells" bgcolor={"black"}>{scores[18]}</th>);
        return card;
    }

    populatePlayers = () => {
        let playerNames = [];
        for (let i = 0; i < this.state.players.length; i ++) {
            playerNames.push(<option value={this.state.players[i]} onChange={this.handlePlayerSelect}>{this.state.players[i]}</option>);
        }
        return playerNames;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select id="player_list">
                        {this.populatePlayers()}
                    </select>
                    <button className="Choose-player-button" type="submit">Load Player Stats</button>
                </form>
                <div>
                    {this.displayCards()}
                </div>
            </div>
        );
    }
}