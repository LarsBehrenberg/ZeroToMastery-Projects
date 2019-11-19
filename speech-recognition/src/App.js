import React from 'react';
import Navbar from './components/Navbar';
import Description from './components/Description';
import Speech from './components/Speech';
import Footer from './components/Footer';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    <Description />
                    <Speech />
                </div>
                <Footer />
            </div>
        )
    }
}

export default App;