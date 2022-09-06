import { Component } from "react";
import {Button, Form, FormGroup, Label, Container, Alert, Input} from 'reactstrap'
import {connect} from 'react-redux'
import {addItem} from '../action/itemActions'
import AppNavbar from "./AppNavbar";

class AddItem extends Component{
  state = {
    title: '',
    description: '',
    category: '',
    price: ''
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault()
    let {title, description, category, price} = this.state

    const newItem = {
      title,
      description,
      category,
      price
    }

    await this.props.addItem(newItem)

    alert('Item added successfully')
  }

  render(){
    return(
      <div>
        <AppNavbar />
        <Container>
          <h2 className="text-center mb-3">Add a new Item</h2>
          {this.props.isAuthenticated ?
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title of the item"
                onChange={this.onChange}
              />
              <br/>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="title"
                placeholder="Title of the item"
                onChange={this.onChange}
              />
              <br/>
              <Label for="category">Category</Label>
              <Input
                type="text"
                name="category"
                id="category"
                placeholder="Category of the item"
                onChange={this.onChange}
                />
                <br/>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price of the item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Add Item</Button>
            </FormGroup>
          </Form> : <Alert className="text-center" color="danger">Login to add items!</Alert>
          }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(AddItem)