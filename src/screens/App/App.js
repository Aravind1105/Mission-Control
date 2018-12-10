// import external modules
import React, { Component, Suspense, lazy } from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// import internal(own) modules
import MainLayout from "../../components/mainLayout";
import LoginPage from "../../components/login";
import Products from "../../views/products/products";
import { AdvancedCardData } from "../../views/cards/advancedCardData";

//import views
const Dashboard = lazy(() => import("../../views/dashboard/dashboard"));
const Users = lazy(() => import("../../views/users/users"));
const Fridges = lazy(() => import("../../views/fridges/fridges"));
const JSON = require('circular-json');

/**
 * i18n
 * use <FormattedMessage id="xxx.yyy"/> when inside tags
 * and this.props.intl.formatMessage({id:'xxx.yyy'});
 */

class App extends Component { 
  
  processMessage() {

  }
  
  render() {        
    return (        
        <div className="App">
        {{
          'HOME': (          
            <LoginPage/>                      
          ),
          'MAIN': (                            
            <MainLayout/>     
          ),     
          'DASHBOARD':(
            <MainLayout>
              <Dashboard/>
            </MainLayout>  
          ),
          'USERS':(
            <MainLayout> 
              <Users></Users>                          
            </MainLayout>
          ),
          'FRIDGES':(
            <MainLayout>
              <Fridges></Fridges>
            </MainLayout>   
          ),   
          'PRODUCTS':(
            <MainLayout> 
              <Products productsData={JSON.parse(JSON.stringify(this.props.productsReducer))}></Products>                         
            </MainLayout>
          ),                 
          'ORDERS':(
            <MainLayout/>   
          ),
          'PAYMENTS':(
            <MainLayout/>  
          ),
          '@@redux-first-router/NOT_FOUND': (
            <div>Page not found.</div>
          )
        }[this.props.location.type]}
        </div>             
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default injectIntl(connect(mapStateToProps)(App));
