import React, { Component } from 'react';
import '../Styles/Home.css';

export default class CreateCourse extends Component { 

    handleSubmit = async(event) => {
        event.preventDefault();

        try {
            await fetch ("http://localhost:5000/create_course", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    courseName: document.getElementById("courseName").value,
                    courseRating: document.getElementById("courseRating").value,
                    slopeRating: document.getElementById("slopeRating").value,
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
                    total: document.getElementById("total").value
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
                    <table className="Center-card-info">
                        <tr className="Card-table">
                            <th>Course Name: </th>
                            <input type="text" id="courseName"></input>
                            <th>Course Rating: </th>
                            <input type="text" id="courseRating"></input>
                            <th>Slope Rating: </th>
                            <input type="text" id="slopeRating"></input>
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
                        </tbody>
                    </table>
                    <button className="Submit-course-button" type="submit">Create Course</button>
                </form>
            </div>
        );
    }

    initializeCardHoles = () => {
        let card = [];
        for (let i = 0; i < 18; i ++) {
            card.push(<th style={{color: "white"}}>{i + 1}</th>);
        }
        card.push(<th style={{color: "white"}}>Total</th>);
        return card;
    }

    initializeParInputs = () => {
        let card = [];
        let holeNames = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12", "h13", "h14", "h15", "h16", "h17", "h18", "total"];
        for (let i = 0; i < 19; i ++) {
            card.push(<td><input id={holeNames[i]} size="3.5"></input></td>);
        }
        return card;
    }

}