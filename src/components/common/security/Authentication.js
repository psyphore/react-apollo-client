import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class AuthBrand extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    return (
      <div>
          <a href="#" onClick={this.goTo.bind(this, 'home')}>Auth0 - React</a>
      </div>
    );
  }
}

export class AuthHome extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Button
              varient="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
      </div>
    );
  }
}

export class Authentication extends Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
            {!isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
      </div>
    );
  }
}

// export class Authentication extends Component {
//   goTo(route) {
//     this.props.history.replace(`/${route}`);
//   }

//   login() {
//     this.props.auth.login();
//   }

//   logout() {
//     this.props.auth.logout();
//   }

//   render() {
//     const { isAuthenticated } = this.props.auth;
//     return (
//       <div>
//         <Navbar fluid>
//           <Navbar.Header>
//             <Navbar.Brand>
//               <a href="#">Auth0 - React</a>
//             </Navbar.Brand>
//             <Button
//               bsStyle="primary"
//               className="btn-margin"
//               onClick={this.goTo.bind(this, 'home')}
//             >
//               Home
//             </Button>
//             {!isAuthenticated() && (
//               <Button
//                 bsStyle="primary"
//                 className="btn-margin"
//                 onClick={this.login.bind(this)}
//               >
//                 Log In
//               </Button>
//             )}
//             {isAuthenticated() && (
//               <Button
//                 bsStyle="primary"
//                 className="btn-margin"
//                 onClick={this.logout.bind(this)}
//               >
//                 Log Out
//               </Button>
//             )}
//           </Navbar.Header>
//         </Navbar>
//       </div>
//     );
//   }
// }