import { Component, Fragment } from "react";
import AppNavBar from './AppNavbar'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap'
import {connect} from 'react-redux'
import {getCart, deleteFromCart} from '../action/cartActions'
import Checkout from "./Checkout";
import {checkout} from '../action/orderActions'

class Cart extends Component{
  
  state = {
    loaded: false
  }

  getCartItems = async (id) => {
    await this.props.getCart(id)
    this.setState({loaded: true})
  }

  onDeleteFromCart = (id, itemId) => {
    this.props.deleteFromCart(id, itemId)
  }

  render(){
    const user = this.props.user
    if(this.props.isAuthenticated && ! this.props.cart.loading && !this.state.loaded){
      this.getCartItems(user._id)
    }
    return(
      <div>
        <AppNavBar />
        {this.props.isAuthenticated ? 
          <Fragment>
            {this.props.cart.cart ? null : 
              <Alert color="info" className="text-center">Your cart is empty!</Alert>
            }
          </Fragment>
          : <Alert color="danger" className="text-center">Login to View!</Alert>
        }

        {this.props.isAuthenticated && !this.props.cart.loading && this.state.loaded && this.props.cart.cart ?
        <Container>
          <div className="row">
              {this.props.cart.cart.items.map((item) => (
                <div className="col-md-4">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">{item.name}</CardTitle>
                      <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                      <CardText>Quantity - {item.quantity}</CardText>
                      <Button color="danger" onClick={this.onDeleteFromCart.bind(this, user._id, item.productId)}>Delete</Button>
                    </CardBody>
                  </Card>
                <br/>
                </div>
              ))}
              <div className="col-md-12">
                <Card>
                  <CardBody>
                    <CardTitle tag="h5">Total Cost = Rs. {this.props.cart.cart.bill}</CardTitle>
                    <Checkout
                      user={user._id}
                      amount={this.props.cart.cart.bill}
                      checkout={this.props.checkout}
                    />
                  </CardBody>
                </Card>
              </div>
          </div>
        </Container>
        : null}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})


export default connect(mapStateToProps, {getCart, deleteFromCart, checkout})(Cart)