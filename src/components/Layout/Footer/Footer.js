import React from 'react';
import './Footer.styl'

export default class Footer extends React.Component {
  render() {
    return(
      <footer className="site-footer">
        <div className="container">
          <p className="sm">
            © Created by&nbsp;
            <a href="https://github.com/misha-pelykh">Misha Pelykh</a>&nbsp;
            2017
          </p>
        </div>
      </footer>
    );
  }
}
