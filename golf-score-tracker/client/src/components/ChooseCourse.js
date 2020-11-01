import React, { Component } from 'react';
import '../Styles/Home.css';
import CreateCourse from "./CreateCourse";
import ScoreCard from "./ScoreCard";

export default class ChooseCourse extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            course: '',
            loadScoreCard: false,
            coursePars: []
        }
        this.handleCourseSelect = this.handleCourseSelect.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:5000/choose_course";
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 0; i < data.length; i ++) {
            this.setState ({courses: this.state.courses.concat([data[i].course_name])})
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        this.setState ({
            loadScoreCard: true,
            course: document.getElementById("golf_courses").value,
            coursePars: []
        })
        try {
            const response = await fetch ("http://localhost:5000/choose_course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    selectedCourse: document.getElementById("golf_courses").value
                })
            });
            const data = await response.json();
            let vals = Object.values(data[0]).slice();
            for (let i = 0; i < vals.length; i ++) {
                this.setState ({coursePars: this.state.coursePars.concat(vals[i])})
            }
        } catch (err) {
            console.error(err.messsage);
        }
    }

    render() {
        return (
            <div>
                <form className="Select-course-dropdown" onSubmit={this.handleSubmit}>
                    <select id="golf_courses" className="Course-dropdown">
                        {this.populateCourses()}
                    </select>
                    <button className="Choose-course-button" type="submit">Load Course</button>
                </form>
                {(!this.state.loadScoreCard) ? <CreateCourse /> : <ScoreCard pars={this.state.coursePars} selectedCourse={this.state.course}/>}
            </div>
        );
    }

    handleCourseSelect = (event) => {
        this.setState({
            course: event.target.value
        })
    }

    populateCourses = () => {
        let course = [];
        for (let i = 0; i < this.state.courses.length; i ++) {
            course.push(<option value={this.state.courses[i]} onChange={this.handleCourseSelect}>{this.state.courses[i]}</option>);
        }
        return course;
    }
}