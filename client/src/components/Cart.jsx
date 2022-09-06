import { Component, Fragment } from "react";
import AppNavBar from './AppNavbar'
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container} from 'reactstrap'
import {connect} from 'react-redux'
import {getCart, deleteFromCart} from '../action/cartActions'
import Checkout from "./Checkout";
import {checkout} from '../action/orderActions'