import React from "react";
import Inbox from "./Inbox";
import Organizer from "./Organizer";
import './root.css'
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 'InBox',
        };
        this.handleNavClick = this.handleNavClick.bind(this);
    }
    handleNavClick(e){
        this.setState({
            activePage: e.target.innerText,
        });
    }
    render(){
      return (
          <>
            <div>
                <h1 id="app-title">Get Shit Done</h1>
                <nav>
                    <div id="nav-inbox" onClick={this.handleNavClick}>InBox</div>
                    <div id="nav-org" onClick={this.handleNavClick}>Organizer</div>
                </nav>
            </div>
              { (this.state.activePage == 'InBox') &&
                  <Inbox/>
              }
              { (this.state.activePage == 'Organizer') &&
                  <Organizer/>
              }
        </>
    );
    }
}
export default App;

