// import external modules
import React, { Component } from 'react';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import templateConfig from '../../templateConfig';
// Styling
import '../../assets/scss/components/sidebar/sidebar.scss';

// import internal(own) modules
import SideMenuContent from './sidemenu/sidemenu';
import SidebarHeader from './sidebarHeader/sidebarHeader';
import { FoldedContentConsumer } from '../../utility/context/toggleContentContext';

class Sidebar extends Component {
  state = {
    collapsedSidebar: false,
    width: window.innerWidth,
  };
  updateWidth = () => {
    this.setState(prevState => ({
      width: window.innerWidth,
    }));
  };

  componentDidMount() {
    if (window !== 'undefined') {
      window.addEventListener('resize', this.updateWidth, false);
    }
  }

  componentWillUnmount() {
    if (window !== 'undefined') {
      window.removeEventListener('resize', this.updateWidth, false);
    }
  }
  handleMouseEnter = e => {
    this.setState(prevState => ({
      collapsedSidebar: false,
    }));
  };

  handleMouseLeave = e => {
    this.setState(prevState => ({
      collapsedSidebar: true,
    }));
  };

  render() {
    const { collapsedSidebar } = this.state;
    return (
      <FoldedContentConsumer>
        {context => (
          <div
            data-active-color="white"
            data-background-color={templateConfig.sidebar.backgroundColor}
            className={classnames(
              'app-sidebar',
              {
                '': !collapsedSidebar,
                collapsed: collapsedSidebar,
              },
              {
                'hide-sidebar': this.state.width < 991 && this.props.sidebarState === 'close',
                '': this.props.sidebarState === 'open',
              },
            )}
            onMouseEnter={context.foldedContent ? this.handleMouseEnter : null}
            onMouseLeave={context.foldedContent ? this.handleMouseLeave : null}
          >
            <SidebarHeader toggleSidebarMenu={this.props.toggleSidebarMenu} />
            <PerfectScrollbar className="sidebar-content">
              <SideMenuContent collapsedSidebar={collapsedSidebar} toggleSidebarMenu={this.props.toggleSidebarMenu} />
            </PerfectScrollbar>

            {templateConfig.sidebar.backgroundImage ? (
              <div
                className="sidebar-background"
                style={{ backgroundImage: "url('" + templateConfig.sidebar.backgroundImageURL + "')" }}
              />
            ) : (
              ''
            )}
          </div>
        )}
      </FoldedContentConsumer>
    );
  }
}

export default Sidebar;
