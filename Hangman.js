import { Component } from 'react'
import './css/Hangman.css'
import { randomWord } from './Word'
import HangmanDrawing from './HangmanDrawing';
import LandingPage from './LandingPage';

class Hangman extends Component {
    static defaultProps = {
        maxWrong:6
    }
    state = { nWrong:0 , answer:randomWord(), guessed: new Set(), showMainMenu: false, group: 'color'} 
    reset = () => {
        const { group} = this.state;
        this.setState({
            nWrong: 0,
            guessed: new Set(),
            answer: randomWord(group),
        });
    }
    guessedWord = () => {
        return this.state.answer.split('').map(letter => (this.state.guessed.has(letter)? letter : "_"))
    }
    handleGuess = (e) => {
        let letter = e.target.value;
        this.setState((ps) => ({
            guessed: ps.guessed.add(letter),
            nWrong: ps.nWrong + (ps.answer.includes(letter) ? 0 : 1),
        }));
    }
    generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button value={letter} key={letter} onClick={this.handleGuess} disabled={this.state.guessed.has(letter)}>{letter}</button>
        ))
    }
    goToMainMenu = () => {
        this.setState({ showMainMenu: true }); 
    }
    handleChange = (e) => { 
        const {value,name} = e.target;
        this.setState({
            [name]: value,
            answer: randomWord(value),
            nWrong: 0,
            guessed: new Set()
        })
    }
    render() { 
        const {maxWrong} = this.props
        const {nWrong,answer,showMainMenu,group} = this.state
        let isWinner = this.guessedWord().join("") === answer
        let gameOver = nWrong >= maxWrong
        let gameState = this.generateButtons()
        if(isWinner) gameState=this.reset()
        if(gameOver) gameState='You Lost!'
        if (showMainMenu) {
            return <LandingPage />; 
        }
        return (
            <div className='Hangman'>
                <h1 className='Hangman-title'>Hangman</h1>
                <div className='Hangman-flex'>
                    <div className='Hangman-reset'>
                        <form>
                            <label htmlFor="group">Genre: </label>
                            <select className='select' name="group" id="group" value={group} onChange={this.handleChange}>
                                <option value="color">Color</option>
                                <option value="country">Country</option>
                                <option value="animal">Animal</option>
                                <option value="person">Name</option>
                            </select>
                        </form>
                        <div className='two-btns'>
                            <button id='reset'onClick={this.goToMainMenu}>Main Menu</button>
                            <button id='reset' onClick={this.reset}>Play Again</button>
                        </div>
                    </div>  
                    <div>
                        <p className='Hangman-word'>{gameOver ? answer : this.guessedWord()}</p>
                        <h4 className='hint'>Hint: This word is a {group}</h4>
                        <div className='btns'>{gameState}</div>
                    </div>
                    <div className='Hangman-counter'>
                        <HangmanDrawing numberOfGuesses={nWrong} />
                        <p>Guesses Remaining: {6-nWrong}</p>
                    </div>
                
                </div>
            </div>
        );
    }
}
 
export default Hangman;