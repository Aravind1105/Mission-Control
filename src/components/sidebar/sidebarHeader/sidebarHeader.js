// import external modules
import React, { Component } from "react";
import { ToggleLeft, ToggleRight, X } from "react-feather";
import Link from "redux-first-router-link";

// import internal(own) modules
import { FoldedContentConsumer } from "../../../utility/context/toggleContentContext";

// Styling
import "../../../assets/scss/components/sidebar/sidebarHeader/sidebarHeader.scss";

class SidebarHeader extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu('close');
   };

   render() {      
      return (
         <FoldedContentConsumer>
            {context => (
               <div className="sidebar-header">
                  <div className="logo clearfix">
                     <Link to={{type:'MAIN'}} className="logo-text float-left active"> 
                        <div className="logo-img">
                           <img src="https://livello-mission-control.netlify.com/android-chrome-192x192.png" width="35px"/>
                        </div>
                        <span className="text align-middle">Livello</span>                             
                     </Link>                     
                     <span className="nav-toggle d-none d-sm-none d-md-none d-lg-block">
                        {context.foldedContent ? (
                           <ToggleLeft
                              onClick={context.makeNormalContent}
                              className="toggle-icon"
                              size={22}
                           />
                        ) : (
                           <ToggleRight
                              onClick={context.makeFullContent}
                              className="toggle-icon"
                              size={22}
                           />
                        )}
                     </span>
                     <span href="" className="nav-close d-block d-md-block d-lg-none d-xl-none" id="sidebarClose">
                        <X
                           onClick={this.handleClick} size={20}
                        />
                     </span>
                  </div>
               </div>
            )}
         </FoldedContentConsumer>
      );
   }
}

export default SidebarHeader;


