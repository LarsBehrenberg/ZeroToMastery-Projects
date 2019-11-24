import React from 'react';
import Clarifai from 'clarifai';
import particlesConfig from './components/ParticleConfig/particlesjs-config';
import Logo from './components/Logo/Logo';
import Navbar from './components/Navbar/Navbar';
import Searchinput from './components/Searchinput/Seachinput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '74b4e737328a40d9b4841e77a1bcf79f'
 });

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log(response)
    },
    function(err) {
      throw err;
    }
  );
    
  }

  render() {
    return (
      <div>
        <Particles params={particlesConfig} className='particles'/>
        <div className='navbar'>
          <Logo/>
          <Navbar/>
        </div>
        <Searchinput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imgSrc={this.state.imageUrl}/>
      </div>
    )
  }
  
}

export default App;
