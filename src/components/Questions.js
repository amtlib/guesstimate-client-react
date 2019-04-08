import React, { Component } from 'react';
import axios from 'axios'
import config from '../config'
import M from "materialize-css"
import "materialize-css/dist/css/materialize.min.css"

class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: {},
            questions: [],
            newQuestion: {
                question: '',
                correctAnswer: '',
                type: 'value',
                answers: [],
            }
        }
    }
    componentDidMount() {
        axios.get(`${config.SERVER_PATH}/api/categories/${this.props.match.params.id}`).then(category => {
            this.setState({ category: category.data })
            console.log(this.state.category)
        })
        axios.get(`${config.SERVER_PATH}/api/categories/${this.props.match.params.id}/questions`).then(questions => {
            console.log(questions.data)
            this.setState({ questions: [...this.state.questions, ...questions.data] })
        })
        M.Modal.init(document.querySelectorAll('.modal'), {});
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }
    addQuestion = (e) => {
        axios.post(`${config.SERVER_PATH}/api/categories/${this.state.category.id}/questions`, {...this.state.newQuestion}).then(response => {
            console.log(response)
        })
    }
    formChanged = (e) => {
        if(e.target.name === 'answers'){
            if(this.state.newQuestion.type === 'slider' && e.target.value.indexOf('-') !== -1){
                this.setState({newQuestion: {...this.state.newQuestion, answers: e.target.value.split('-').map(n => parseFloat(n))}})
            }else if(this.state.newQuestion.type === 'value' && e.target.value.indexOf(',') !== -1){
                this.setState({newQuestion: {...this.state.newQuestion, answers: e.target.value.split(',').map(n => parseFloat(n))}})
            }else{
                // error
                console.log('wrong input!!!')
            }
        }else{
            this.setState({newQuestion: {...this.state.newQuestion, [e.target.name]: e.target.value}})
        }
    }
    render() {
        return (
            <div className="container">
                <h1 className="center">{this.state.category.name}</h1>
                <div className="fixed-action-btn">
                    <a href="#addQuestion" className="btn-floating pulse btn-large red modal-trigger">
                        <i className="material-icons large">add</i>
                    </a>
                </div>
                <div id="addQuestion" className="modal">
                    <div className="modal-content">
                        <h4>Add new question</h4>
                        <input type="text" onChange={this.formChanged} name="question" id="newQuestionText" placeholder="Question..." className="form-field" />
                        <div className="form-field">
                            <select name="type" onChange={this.formChanged}>
                                <option>value</option>
                                <option>slider</option>
                            </select>
                        </div>
                        
                        <input type="text" onChange={this.formChanged} name="correctAnswer" id="newQuestionCorrectAnswer" className="form-field" placeholder="Correct Answer"/>
                        <input type="text" onChange={this.formChanged} name="answers" id="newQuestionAnswers" className="form-field" placeholder="20-30 if slider or 2,3,6,3 if value"/>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.addQuestion} className="modal-close btn-flat green white-text">Add!</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Questions;
