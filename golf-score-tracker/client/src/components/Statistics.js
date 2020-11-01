import React, { Component } from 'react';
import '../Styles/Statistics.css';
import {Line, Bar, Pie} from 'react-chartjs-2';

export default class Statistics extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            player: '',
            handicap: '',
            averageScore: '',
            bestScore: '',
            bestCourse: '',
            averageHoleScore: {},
            scoreTypes: {}, 

            pieData: {
                labels: [],
                datasets: [
                    {
                        label: '', 
                        data: [],
                        backgroundColor:[]
                    }
                ]
            },
            barData: {
                labels: [],
                datasets: [
                    {
                        label: '', 
                        data: [],
                        backgroundColor:[]
                    }
                ]
            },
            lineData: {
                labels: [],
                datasets: [
                    {
                        label: '', 
                        data: [],
                        backgroundColor:[]
                    }
                ]
            }
        }
        this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:5000/statistics";
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < data.length; i ++) {
            this.setState ({players: this.state.players.concat([data[i].player_name])})
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        this.setState ({
            player: document.getElementById("player_list").value
        })
        try {
            const response = await fetch ("http://localhost:5000/statistics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    selectedPlayer: document.getElementById("player_list").value
                })
            });
            const data = await response.json();
            this.setState ({
                averageScore: data[0],
                bestScore: data[1][0],
                bestCourse: data[1][1],
                handicap: data[3],
            })
            this.createPieChart(data[2]);
            this.createBarChart(data[4]);
            this.createLineChart(data[5]);
        } catch (err) {
            console.error(err.messsage);
        }
    }

    handlePlayerSelect = (event) => {
        this.setState({
            player: event.target.value
        })
    }

    populatePlayers = () => {
        let playerNames = [];
        for (let i = 0; i < this.state.players.length; i ++) {
            playerNames.push(<option value={this.state.players[i]} onChange={this.handlePlayerSelect}>{this.state.players[i]}</option>);
        }
        return playerNames;
    }

    createPieChart = (scoreTypes) => {
        let names = Object.keys(scoreTypes);
        let numScoreTypes = Object.values(scoreTypes)

        this.setState ({
            pieData: {
                title: "Scores",
                labels: names,
                datasets: [
                    {
                        label: 'Scores', 
                        data: numScoreTypes,
                        backgroundColor:['#32b1e4', '#a3cff6', '#a2a7aa', '#f6b840', '#ff9700', '#ee5c00', '#ec1d1d'],
                    }
                ]
            }
        })
    }

    createBarChart = (scoreAverages) => {
        let par = Object.keys(scoreAverages);
        let average = Object.values(scoreAverages)

        this.setState ({
            barData: {
                title: "Scores",
                labels: par,
                datasets: [
                    {
                        label: 'Scoring Averages', 
                        data: average,
                        backgroundColor:['#00AEFF', '#00AEFF', '#00AEFF'],
                    }
                ]
            }
        })
    }

    createLineChart = (totalScores) => {
        let dates = Object.keys(totalScores);
        let totals = Object.values(totalScores)

        this.setState ({
            lineData: {
                title: "Scores",
                labels: dates,
                datasets: [
                    {
                        label: 'Round Totals', 
                        data: totals,
                        //backgroundColor:['#00E4FF'],
                        borderColor:['#00AEFF'],
                                    
                    }
                ]
            }
        })
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
                <div className="Top-stat-box">
                    <h3 className="Value-display">Average Score: {this.state.averageScore}</h3>
                    <h3 className="Value-display">Handicap: {this.state.handicap}</h3>
                    <h3 className="Value-display">Best Score: {this.state.bestScore}</h3>
                    <h3 className="Value-display">Best Course: {this.state.bestCourse}</h3>
                </div>
                <div className="Pie-chart">
                    <Pie data={this.state.pieData} 
                        options={
                            {   
                                animation: {
                                    animateScale: true,
                                },
                                responsive: true,
                                maintainAspectRatio: false
                            }
                        }
                    />
                </div>
                <div className="Bar-chart">
                    <Bar data={this.state.barData} 
                        options={
                            { 
                                responsive: true,
                                maintainAspectRatio: false
                            }
                        }
                    />
                </div>
                <div className="Line-chart">
                    <Line data={this.state.lineData} 
                        options={
                            { 
                                responsive: true,
                                maintainAspectRatio: false
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}