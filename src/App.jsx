import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Soundsection from "./components/Soundsection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";


function App() {

  return (
    <div className="App">
      <Nav />
      <Jumbotron />
      <Soundsection />
      <DisplaySection />
      <WebgiViewer />
    </div>
  );
}

export default App;
