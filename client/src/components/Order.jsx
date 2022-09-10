import { Component, Fragment } from "react";
import AppNavbar from './AppNavbar'
import { connect } from "react-redux";
import { getOrders } from '../action/orderActions'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap'

class Order extends Component{

  state = {
    loaded: false
  }

  ongetOrders = async (id) => {
    await this.props.getOrders(id)
    this.setState({loaded: true})
  }

  render(){
    const user = this.props.user

    if(this.props.isAuthenticated && !this.props.order.loading && !this.state.loaded){
      this.ongetOrders(user._id)
    }

    return(
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? 
          <Fragment>
            {this.props.order.orders !== [] ? null:
              <Alert color="info" className="text-center">You have no orders!</Alert>
            }
          </Fragment>
          : <Alert color="danger" className="text-center">Login to View!</Alert>
        }

        {this.props.isAuthenticated && !this.props.order.loading && this.state.loaded && this.props.order.orders.length ?
          <Container>
            <div className="row">
              {this.props.order.orders.map((order) =>(
                <div className="col-md-12">
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">{order.items.length} items - Total: {order.bill} EUR</CardTitle>
                      <div className="row">
                      {order.items.map((item) => (
                        <div className="col-md-4">
                            <Card className="mb-2">
                              <CardBody>
                                <CardTitle tag="h5">{item.name} ({item.quantity} pieces)</CardTitle>
                                <CardSubtitle tag="h6">{item.price}/piece</CardSubtitle>
                              </CardBody>
                            </Card>
                        </div>
                      ))}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </Container>
        : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, {getOrders})(Order)