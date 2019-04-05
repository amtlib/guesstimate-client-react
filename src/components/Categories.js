import React, { Component } from 'react'
import Category from './Category'
import axios from 'axios'
import config from '../config'
import M from "materialize-css"
import "materialize-css/dist/css/materialize.min.css"


class Categories extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],
            newCategory: ''
        }
    }
    componentDidMount() {

        axios.get(`${config.SERVER_PATH}/api/categories`).then(categories => {
            console.log(categories)
            this.setState({ categories: categories.data.map(category => <Category deleteCategory={this.deleteCategory} serverEntryPoint={config.SERVER_PATH} key={category.id} category={category} />) })
        })

        //init modal
        M.Modal.init(document.querySelectorAll('.modal'), {});
    }
    handleAddCategory = (e) => {
        axios.post(`${config.SERVER_PATH}/api/categories`, {
            name: this.state.newCategory
        }).then(newCategory => {
            console.log('done', newCategory)
            this.setState({newCategory: '', categories: [...this.state.categories, <Category deleteCategory={this.deleteCategory} serverEntryPoint={config.SERVER_PATH} key={newCategory.data.id} category={newCategory.data} />]})
        })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    deleteCategory = (id) => {
        console.log('inside delete category', this.state.categories)
        this.setState({categories: this.state.categories.filter(category => category.key !== ""+id)})
    }
    render() {
        return (
            <div className="container">
                <h1 className="center-align">Categories</h1>
                <div className="row">

                    <div className="fixed-action-btn">
                        <a href="#addCategory" className="btn-floating pulse btn-large red modal-trigger">
                            <i className="material-icons large">add</i>
                        </a>
                    </div>
                    <div id="addCategory" className="modal">
                        <div className="modal-content">
                            <h4>Add new category</h4>
                            <input type="text" name="newCategory" onChange={this.handleChange} value={this.state.newCategory} className="form-field" />
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close btn-flat green" onClick={this.handleAddCategory}>Add!</a>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.categories.length > 0 ? this.state.categories : <h4 className="center">No categories yet.</h4>}
                    </div>

                    {/* <h2 className="align-center">No categories yet</h2> */}


                </div>
                <script>

                </script>
            </div>
        );
    }
}

export default Categories;
