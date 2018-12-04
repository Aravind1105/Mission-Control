// import external modules
import React, { PureComponent } from "react";
import classnames from "classnames";
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// import internal(own) modules
import { FoldedContentConsumer, FoldedContentProvider } from "../utility/context/toggleContentContext";
import Sidebar from "./sidebar/sidebar";
import NavbarLayout from "./navbar/navbar";
import Footer from "./footer/footer";
// Styling
import "../assets/scss/layouts/mainLayout.scss";

import templateConfig from "../templateConfig";


class MainLayout extends PureComponent {   

   state = {      
      width: window.innerWidth,
      sidebarState: 'close'      
   };

   updateWidth = () => {
      this.setState(prevState => ({
         width: window.innerWidth
      }));
   };

   async componentDidMount() {
      if (window !== "undefined") {
         window.addEventListener("resize", this.updateWidth, false)         
      }
      this.props.app.auth.handleAuthentication();      
   }

   componentWillUnmount() {
      if (window !== "undefined") {
         window.removeEventListener("resize", this.updateWidth, false);
      }            
      this.props.app.auth.handleAuthentication();
   }

   toggleSidebarMenu(sidebarState) {
      this.setState({ sidebarState });
   }

   render() {      
      console.log('------------------------------>children',this.props.children);
      return (
            <FoldedContentProvider>
               <FoldedContentConsumer>
                  {context => (
                     <div
                        className={classnames("wrapper "+ templateConfig.sidebar.size, {
                           "menu-collapsed": context.foldedContent || this.state.width < 991,
                           "main-layout": !context.foldedContent
                        })}
                     >

                        <Sidebar
                           toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                           sidebarState={this.state.sidebarState}
                        />

                        <NavbarLayout
                           toggleSidebarMenu={this.toggleSidebarMenu.bind(this)}
                           sidebarState={this.state.sidebarState}
                        />   
                        <main>{this.props.children}</main>                    
                        <Footer />
                     </div>
                  )}
               </FoldedContentConsumer>
            </FoldedContentProvider>
      );
   }
}

const mapStateToProps = (state) => {
   return state;
};
 
export default injectIntl(connect(mapStateToProps)(MainLayout));
 