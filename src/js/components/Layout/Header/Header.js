import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import NavItem              from './NavItem';

export default class Header extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired
  }

  state = {
    collapsed: true,
  };

  handleLogout = e => {
    const { logout, router } = this.props;
    e.preventDefault();
    logout(router);
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  renderNavBar() {
    const { loggedIn, router } = this.props;
    const isActive = router.isActive.bind(router);
    let navItems;

    if (loggedIn) {
      navItems = [
        { 
          to: '/admin/dashboard', 
          title: 'Dashboard', 
          onClick: this.toggleCollapse.bind(this) 
        },
        { to: '/logout', 
          title: 'Logout', 
          onClick: (e) => { 
            this.handleLogout(e); 
            this.toggleCollapse.call(this); 
          } 
        }
      ];
    } else {
      navItems = [
        { 
          to: '/login', 
          title: 'Login', 
          onClick: this.toggleCollapse.bind(this) 
        },
        { to: '/signup', 
          title: 'Sign up', 
          onClick: this.toggleCollapse.bind(this) 
        }
      ];
    }

    navItems = navItems.map((props) =>
      <NavItem
        key={props.to}
        to={props.to}
        active={isActive(props.to)}
        onClick={props.onClick}
      >
        {props.title}
      </NavItem>
    );

    return (
      <ul className="nav navbar-nav">
        {navItems}
      </ul>
    );
  }

  render() {
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return(
      <nav className="navbar navbar-inverse" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button 
              type="button" 
              className="navbar-toggle" 
              onClick={this.toggleCollapse.bind(this)} 
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            {this.renderNavBar()}
          </div>
        </div>
      </nav>
    );
  }
}
