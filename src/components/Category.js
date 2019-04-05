import React, { Component } from 'react';
import axios from 'axios'
import config from '../config'

class Category extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            category: props.category
        }
    }
    handleDelete = (e) => {
        axios.delete(`${config.SERVER_PATH}/api/categories`, {
            data: {
                id: this.state.category.id
            }
        }).then(response => {
            console.log('deleted', response)
            this.props.deleteCategory(response.data.id)
        })
    }
    handleModify = (e) => {
        axios.put(`${config.SERVER_PATH}/api/categories`, {
            id: this.state.category.id,
            name: this.state.category.name

        }).then(category => {
            console.log('name modified')
        })
    }
    handleShowQuestions = (e) => {
        
    }
    handleCategoryNameChange = (e) => {
        let cat = this.state.category
        cat.name = e.target.value
        this.setState({ category: cat })
    }
    render() {
        return (
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">
                            <span className="input-field">
                                <input type="text" onChange={this.handleCategoryNameChange} value={this.state.category.name} />
                            </span>
                        </span>

                    </div>
                    <div className="card-action">
                        <a className="btn green" href={"/categories/"+this.state.category.id+"/questions"}>Show questions</a>
                        <button className="btn orange" onClick={this.handleModify}>Modify</button>
                        <button className="btn red" onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;
