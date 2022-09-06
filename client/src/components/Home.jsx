import {Component} from 'react'
import AppNavbar from './AppNavbar'
import { Card, CardBody, CardText, CardTitle, CardSubtitle, Button, Container } from 'reactstrap'
import { Connect } from 'react-redux'
import {getItems} from '../action/itemActions'
import {addToCart} from '../action/cartActions'
import { connect } from 'mongoose'

class Home extends Component{
  
  componentDidMount(){
    this.props.getItems()
  }

  onAddToCart = async (id, productId) => {
    await this.props.addToCart(id, productId, 1)
    alert('Item added to Cart')
  }

  render(){
    const {items} = this.props.item
    const user = this.props.user

    return(
      <div>
        <AppNavbar />
        <Container>
          <div className='row'>
            {items.map((item) =>(
              <div className='col-md-4'>
              <Card className='mb-4'>
                <CardBody>
                  <CardTitle tag="h5">{item.title}</CardTitle>
                  <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                  <CardText>{item.category}</CardText>
                  {this.props.isAuthenticated ? 
                  <Button
                      color='success'
                      size='sm'
                      onClick={this.onAddToCart.bind(this, user._id, item._id)}
                      >Add To Cart</Button> : null
                    }
                </CardBody>
              </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home)