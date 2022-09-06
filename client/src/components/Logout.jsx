import { Component, Fragment } from "react";
import { logout } from "../action/authActions";
import { connect } from "react-redux";
import {NavLink, Button} from 'reactstrap'

export class Logout extends Component{

  render(){
    return(
      <div>
        <Fragment>
          <Button color="danger" className="btn btn-sm"><NavLink onClick={this.props.logout} href="#"><span className="text-ligth"><b>Logout</b></span></NavLink></Button>
        </Fragment>
      </div>
    )
  }
}

export default connect(null, {logout})(Logout)