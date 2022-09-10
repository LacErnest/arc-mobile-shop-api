import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main'
import { loadUser } from './action/authActions';
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return(
      <BrowserRouter>
        <div className='App'>
          <Main/>
        </div>
      </BrowserRouter>
    )
  }
}


export default App;
