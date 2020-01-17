import React from "react";
import Inbox from "./Inbox";
import './root.css'
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 'InBox',
        }
    }

    render(){
      return (
          <>
            <div>
                <h1 id="app-title">Get Shit Done</h1>
                <nav>
                    <div onClick={this.handleNavClick}>InBox</div>
                    <div onClick={this.handleNavClick}>Organizer</div>
                </nav>
            </div>
              { (this.state.activePage == 'InBox') &&
                  <Inbox/>
              }
              { (this.state.activePage == 'Organizer') &&
              <div>Not the droids you are looking for</div>
              }
        </>
    );
    }
}
export default App;

