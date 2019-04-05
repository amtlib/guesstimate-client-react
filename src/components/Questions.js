import React, { Component } from 'react';
import axios from 'axios'
import config from '../config'

class Questions extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: {},
      questions: []
    }
  }
  componentDidMount(){
    axios.get(`${config.SERVER_PATH}/api/categories/${this.props.match.params.id}`).then(category => {
      this.setState({category: category.data})
      console.log(this.state.category)
    })
    axios.get(`${config.SERVER_PATH}/api/categories/${this.props.match.params.id}/questions`).then(questions => {
      console.log(questions.data)
      this.setState({questions: [...this.state.questions, ...questions.data]})
    })
  }
  render() {
    
    return (
      <div className="container">
        <h1 className="center">{this.state.category.name}</h1>
      </div>
    );
  }
}

export default Questions;
