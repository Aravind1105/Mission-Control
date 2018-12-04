// import external modules
import React, { Component } from "react";
import { connect } from "react-redux";

import { Navbar, Jumbotron, Button} from 'reactstrap';

import Footer from "./footer/footer";
import "../assets/scss/layouts/loginLayout.scss";


class LoginPage extends Component {    
    
   render() {     
    return (  
        <div className="login-layout">
            <Navbar className="navbar">                
            </Navbar>
            <Jumbotron className="jumbotron" >
                <h1 className="display-3" text="white">Livello Mission Control</h1>
                <p className="lead">
                <Button color="success" onClick={this.props.app.auth.login}>Login</Button>
                </p>
            </Jumbotron>
            <div className="footer">
                <Footer />
            </div>            
        </div>    
    );
   }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(LoginPage);

