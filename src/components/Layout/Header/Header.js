import React, { PropTypes } from 'react';
import NavItem              from './NavItem';

export default class Header extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: true,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  handleLogout = e => {
    const { logout, router } = this.props;

    e.preventDefault();
    logout(router);
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;

    this.setState({collapsed});
  }

  createNavItems(navItems) {
    if (!navItems) return;

    const { router } = this.props;
    const isActive = router.isActive.bind(router);

    return navItems.map((props) =>
      <NavItem
        key={props.to}
        to={props.to}
        active={isActive(props.to)}
        onClick={props.onClick}
      >
        {props.title}
      </NavItem>
    );
  }

  renderNavBar() {
    const { loggedIn } = this.props;
    let navItems;
    let navItemsRight;

    if (loggedIn) {
      navItems = [
        { 
          to: '/admin/dashboard', 
          title: 'Dashboard', 
          onClick: this.toggleCollapse
        }
      ];
      navItemsRight = [
        {
          to: '/logout', 
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
          onClick: this.toggleCollapse
        },
        { to: '/signup', 
          title: 'Sign up', 
          onClick: this.toggleCollapse
        }
      ];
    }

    navItems = this.createNavItems(navItems);
    navItemsRight = this.createNavItems(navItemsRight);

    return (
      <nav>
        <ul className="nav navbar-nav">
          {navItems}
        </ul>
        {navItemsRight ? 
          <ul className="nav navbar-nav navbar-right">
            {navItemsRight}
          </ul> : null
        }
      </nav>
    );
  }

  render() {
    const { collapsed } = this.state;
    const { authMsg, adminMsg } = this.props; 
    const navClass = collapsed ? "collapse" : "";

    return(
      <header className="siteHeader">
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button 
                type="button" 
                className="navbar-toggle" 
                onClick={this.toggleCollapse} 
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

        { (authMsg || adminMsg) ? 

          <div className="container">
            <div className="site-notifications">
              {authMsg ? <div className="alert alert-success">{authMsg}</div> : null}
              {adminMsg ? <div className="alert alert-success">{adminMsg}</div> : null}
            </div>
          </div>

        : null}
      </header>
    );
  }
}
