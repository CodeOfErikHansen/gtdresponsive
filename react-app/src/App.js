import React from "react";
import Inbox from "./Inbox";
import Organizer from "./Organizer";
import FinishedList from "./FinishedList";
import Projects from './Projects'
import Records from './Records'
import HotSeat from "./HotSeat";
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
                <h1 id="app-title">Get Stuff Done</h1>
                <nav>
                    <div id="nav-inbox" onClick={this.handleNavClick}>InBox</div>
                    <div id="nav-org" onClick={this.handleNavClick}>Organizer</div>
                    <div id="hot-seat" onClick={this.handleNavClick}>HotSeat</div>
                    <div id="projects" onClick={this.handleNavClick}>Projects</div>
                    <div id="records" onClick={this.handleNavClick}>Records</div>
                    <div id="complete" onClick={this.handleNavClick}>Complete</div>
                </nav>
            </div>
              { (this.state.activePage == 'InBox') &&
                  <Inbox/>
              }

              {(this.state.activePage == 'HotSeat') && <HotSeat/>}

              { (this.state.activePage == 'Organizer') &&
                  <Organizer/>
              }
              { (this.state.activePage == 'Projects') &&
                <Projects/>
              }
              { (this.state.activePage == 'Records') &&
                  <Records/>

              }
              { (this.state.activePage == 'Complete') &&
              <FinishedList version={this.state.activePage}/>
              }

        </>
    );
    }
}
export default App;

