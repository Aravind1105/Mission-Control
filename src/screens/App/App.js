import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter} from 'react-router-dom';
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Spinner from "../../components/spinner/spinner";

import MainLayout from "../../components/mainLayout";
import LoginPage from "../../components/login";
import ShoppingCartCard from "../../components/cards/shoppingCartCard";
import { AdvancedCardData } from "../../views/cards/advancedCardData";
const LazyContacts = lazy(() => import("../../views/contacts/contacts"));


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
            <LoginPage ></LoginPage>                      
          ),
          'MAIN': (                            
            <MainLayout>                           
            </MainLayout> 
          ),     
          'USERS':(
            <MainLayout> 
              <LazyContacts></LazyContacts>                          
            </MainLayout>
          ),
          'PRODUCTS':(
            <MainLayout> 
              <ShoppingCartCard shoppingCart={AdvancedCardData.ShoppingCart} cardTitle="Products List"></ShoppingCartCard>                         
            </MainLayout>
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
