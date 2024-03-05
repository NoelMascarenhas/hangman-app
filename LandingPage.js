import React, { Component } from 'react';
import Hangman from './Hangman';
import './css/LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false // State to track whether the game has started
        };
    }

    startGame = () => {
        this.setState({ gameStarted: true }); // Set gameStarted state to true when play button is clicked
    };

    render() {
        const { gameStarted } = this.state;

        // Render the Hangman component when the game has started
        if (gameStarted) {
            return <Hangman />;
        }

        // Render the landing page content when the game hasn't started
        return (
            <div className="landing-page">
                <h1 className="title">
                    <pre>
                     _   _
                    | | | |
                    | |_| | __ _ _ __   __ _ _ __ ___   __ _ _ __
                    |  _  |/ _\` | '_ \\ / _\` | '_ \` _ \\ / _\` | '_ \\
                    | | | | (_| | | | | (_| | | | | | | (_| | | | |
                    \\_| |_/\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|
                                        __/ |
                                       |___/
                    </pre>
                </h1>
                <h1 className="title">Hangman</h1>
                <p className="description">
                    Hangman is a classic word-guessing game. Try to guess the word by selecting letters. You have a limited number of incorrect guesses before the game is over. Good luck!
                </p>
                <button id='reset' onClick={this.startGame}>Play Hangman</button>
            </div>
        );
    }
}

export default LandingPage;