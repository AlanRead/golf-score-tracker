import React, { Component } from 'react';

export default class ScoreCard extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            courseName: '',
            date: '',
            total: 0,
            puttTotal: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await fetch ("http://localhost:5000/score_card", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    playerName: document.getElementById("playerName").value,
                    courseName: this.props.selectedCourse,
                    gameDate: document.getElementById("gameDate").value,
                    h1: document.getElementById("h1").value,
                    h2: document.getElementById("h2").value,
                    h3: document.getElementById("h3").value,
                    h4: document.getElementById("h4").value,
                    h5: document.getElementById("h5").value,
                    h6: document.getElementById("h6").value,
                    h7: document.getElementById("h7").value,
                    h8: document.getElementById("h8").value,
                    h9: document.getElementById("h9").value,
                    h10: document.getElementById("h10").value,
                    h11: document.getElementById("h11").value,
                    h12: document.getElementById("h12").value,
                    h13: document.getElementById("h13").value,
                    h14: document.getElementById("h14").value,
                    h15: document.getElementById("h15").value,
                    h16: document.getElementById("h16").value,
                    h17: document.getElementById("h17").value,
                    h18: document.getElementById("h18").value,
                    p1: document.getElementById("p1").value,
                    p2: document.getElementById("p2").value,
                    p3: document.getElementById("p3").value,
                    p4: document.getElementById("p4").value,
                    p5: document.getElementById("p5").value,
                    p6: document.getElementById("p6").value,
                    p7: document.getElementById("p7").value,
                    p8: document.getElementById("p8").value,
                    p9: document.getElementById("p9").value,
                    p10: document.getElementById("p10").value,
                    p11: document.getElementById("p11").value,
                    p12: document.getElementById("p12").value,
                    p13: document.getElementById("p13").value,
                    p14: document.getElementById("p14").value,
                    p15: document.getElementById("p15").value,
                    p16: document.getElementById("p16").value,
                    p17: document.getElementById("p17").value,
                    p18: document.getElementById("p18").value,
                    total: this.state.total,
                    puttTotal: this.state.puttTotal
                })
            });
        } catch (err) {
            console.error(err.messsage);
        }
    }
    
    render() {
        return (
            <div class="Card-box">
                <form onSubmit={this.handleSubmit}>
                    <h1>{this.props.selectedCourse} Golf Course</h1>
                    <table className="Center-card-info">
                        <tr className="Card-table">
                            <th>Player Name: </th>
                            <input type="text" id="playerName"></input>
                            <th>Date: </th>
                            <input id="gameDate" type="date" placeholder="yyyy-mm-dd (Today Default)"></input>
                        </tr>
                    </table>
                    <table className="Center-card-scores">
                        <tbody>
                            <tr className="Hole-num">
                                <th style={{color: "white"}}>Hole</th>
                                {this.initializeCardHoles()}
                            </tr>
                            <tr>
                                <th style={{color: "white"}}>Par</th>
                                {this.initializeParInputs()}
                            </tr>
                            <tr>
                                <th style={{color: "white"}}>Score</th>
                                {this.initializeScoreInputs()}
                            </tr> 
                            <tr>
                                <th style={{color: "white"}}>Putts</th>
                                {this.initializePuttInputs()}
                            </tr> 
                        </tbody>
                    </table>
                    <button className="Submit-course-button" type="submit">Save Round</button>
                </form>
                <button type="button" onClick={this.refreshPage}>Go Back</button>
            </div>
        );
    }

    setTotal = () => {
        let holeIds = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12", "h13", "h14", "h15", "h16", "h17", "h18"];
        let parTotal = 0;
        for (let i = 0; i < holeIds.length; i ++) {
            if(!isNaN(parseInt(document.getElementById(holeIds[i]).value))) {
                parTotal += parseInt(document.getElementById(holeIds[i]).value);
            }
        }
        this.setState({
            total: parTotal
        })
    }

    setPuttTotal = () => {
        let puttIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18"];
        let total = 0;
        for (let i = 0; i < puttIds.length; i ++) {
            if(!isNaN(parseInt(document.getElementById(puttIds[i]).value))) {
                total += parseInt(document.getElementById(puttIds[i]).value);
            }
        }
        this.setState({
            puttTotal: total
        })
    }

    //Probably a better way to go back a state other than having a refresh button
    refreshPage = () => {
        window.location.reload();
    }

    //Populates the hole numbers on the card
    initializeCardHoles = () => {
        let card = [];
        for (let i = 0; i < 18; i ++) {
            card.push(<th style={{color: "white"}}>{i + 1}</th>);
        }
        card.push(<th style={{color: "white"}}>Total</th>);
        return card;
    }

    //Populates the Par score for each hole
    initializeParInputs = () => {
        let card = [];
        let pars = this.props.pars;
        for (let i = 0; i < 19; i ++) {
            card.push(<th style={{color: "white"}} size="3">{pars[i]}</th>);
        }
        return card;
    }

    //Populates the inputs for the user to enter their hole score
    initializeScoreInputs = () => {
        let card = [];
        let holeIds = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12", "h13", "h14", "h15", "h16", "h17", "h18"];
        for (let i = 0; i < 18; i ++) {
            card.push(<td><input id={holeIds[i]} onChange={this.setTotal} size="3"></input></td>);
        }
        card.push(<th style={{color: "white"}} value={this.state.total}>{this.state.total}</th>);
        return card;
    }

    //Populates the inputs for the user to enter their hole score
    initializePuttInputs = () => {
        let card = [];
        let puttIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18"];
        for (let i = 0; i < 18; i ++) {
            card.push(<td><input id={puttIds[i]} onChange={this.setPuttTotal} size="3"></input></td>);
        }
        card.push(<th style={{color: "white"}} value={this.state.puttTotal}>{this.state.puttTotal}</th>);
        return card;
    }
}