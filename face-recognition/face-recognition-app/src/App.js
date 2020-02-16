import React from 'react';
import Clarifai from 'clarifai';
import particlesConfig from './components/ParticleConfig/particlesjs-config';
import Logo from './components/Logo/Logo';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
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
      imageUrl: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        password: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const boundingBox = data.region_info.bounding_box

    const measurements = {
      top: boundingBox.top_row,
      left: boundingBox.left_col,
      right: boundingBox.right_col,
      bottom: boundingBox.bottom_row
    }

    return measurements
  }

  displayFace = (coordinates) => {
    const imageContainer = document.getElementById('img-container');

    const newDiv = document.createElement('div');
    newDiv.classList.add('bounding-box')
    newDiv.style.top = String((coordinates.top * 100) + "%");
    newDiv.style.left = String((coordinates.left * 100) + "%");
    newDiv.style.right = String((1 - coordinates.right) * 100 + "%");
    newDiv.style.bottom = String((1 - coordinates.bottom) * 100 + "%");

    imageContainer.appendChild(newDiv)
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  removingFaces = () => {
    const divList = document.getElementById('img-container')

      while (divList.childNodes.length > 1){
        divList.removeChild(divList.childNodes[1]);
      }
  }

  onButtonSubmit = () => {
    
    this.removingFaces()

    this.setState({imageUrl: this.state.input})

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>  {
        if(response){
          fetch("http://localhost:4000/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        
        for(let x = 0; x < response.outputs[0].data.regions.length; x++){
          this.displayFace(this.calculateFaceLocation(response.outputs[0].data.regions[x])) 
        }
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    route === 'home' ? this.setState({isSignedIn: true}) : this.setState({isSignedIn: false})
    this.setState({route: route})

  }


  render() {
      return (
        <div>
          <Particles params={particlesConfig} className='particles'/>
  
          <div className='navbar'>
            <Logo/>
            <Navbar isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          </div>

          {
          this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : (
              this.state.route === 'register'
                ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                : <div>
                    <Rank 
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                    />
                    <Searchinput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                    <FaceRecognition imgSrc={this.state.imageUrl}/>
                  </div> 
            )
          }
        </div>
      )
  }
  
}
export default App;
