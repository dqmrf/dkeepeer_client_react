import React, { PropTypes } from 'react';
import { Link }             from 'react-router';
import NavItem              from './NavItem';

export default class Header extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired
  }

  handleLogout = e => {
    const { logout, router } = this.props;
    e.preventDefault();
    logout(router);
  }

  renderNavBar() {
    const { loggedIn, router } = this.props;
    const isActive = router.isActive.bind(router);
    let navItems;

    if (loggedIn) {
      navItems = [
        { to: '/admin/dashboard', title: 'Dashboard' },
        { to: '/logout', title: 'Logout', onClick: this.handleLogout }
      ];
    } else {
      navItems = [
        { to: '/login', title: 'Login' },
        { to: '/signup', title: 'Sign up' },
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
      <ul>
        {navItems}
      </ul>
    );
  }

  render() {
    return(
      <nav>
        {this.renderNavBar()}
      </nav>
    );
  }
}
