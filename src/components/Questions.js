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
      questions: []
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
            <input type="text" name="newQuestionText" id="newQuestionText" className="form-field" />
            <input type="text" name="newQuestionType" id="newQuestionType" className="form-field" />
            <input type="text" name="newQuestionCorrectAnswer" id="newQuestionCorrectAnswer" className="form-field" />
            <input type="text" name="newQuestionAnswers" id="newQuestionAnswers" className="form-field" />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close btn-flat green">Add!</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
