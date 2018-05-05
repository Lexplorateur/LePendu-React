import React, { Component } from 'react';
import shuffle from 'lodash.shuffle'
import $ from 'jquery'
import './App.css';

import GuessCount from './GuessCount'
import LetterWord from './LetterWord'
import LetterEntered from "./LetterEntered";

const WORDS_TO_FIND = [
    'composant',
    'traduction',
    'javascript',
    'symphonie',
    'orchestre',
    'restaurant',
    'gigantopithèque',
    'spinosaure',
    'diplodaucus',
];

const VISUAL_PAUSE_MSECS = 750

class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        const initialState = {
            word: this.generateWords(),
            letterFalse: 1,
            letterTrue: 1,
            letterUsed: [],
            guesses: 0,
            matchedLetterTrue: [],
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState())
        $('#letter').removeClass('hidden-input').focus()
        $('#button-replay').addClass("hidden-input")
    }

    generateWords() {
        const result = []
        let wordsTab = 0
        let wordsShuffle = shuffle(WORDS_TO_FIND)
        const newWord = wordsShuffle[wordsTab]
        for (let i = 0; i < newWord.length; i++) {
            result[i] = newWord[i]
        }
        if (wordsShuffle.length !== wordsTab) {
            wordsTab = wordsTab + 1;
        } else {
            wordsShuffle = shuffle(wordsShuffle)
            wordsTab = 0
        }
        console.log(newWord)
        console.log(result)
        return (result)
    }

    getFeedbackForCard(index) {
        const { matchedLetterTrue } = this.state
        const indexMatched = matchedLetterTrue.includes(index)
        return indexMatched ? 'visible' : 'hidden'
    }

    handleLetterClick = letterEntered => {
        console.log(letterEntered)
        this.handleNewLetterClosedBy(letterEntered)
    }

    handleNewLetterClosedBy(letterEntered) {
        const { word, letterUsed, letterFalse, letterTrue, guesses, matchedLetterTrue } = this.state
        console.log(word)
        let newPair = [];
        console.log(newPair.length)
        let j = 0;
        let newGuesses = guesses
        let matched = false
        let letterUsedCompare = 0;
        for (let i = 0; i < letterUsed.length; i++) {
            if (letterUsed[i] === letterEntered) {
                letterUsedCompare = 1;
            }
        }

        if (letterUsedCompare === 0) {
            letterUsed.push(letterEntered)
        }
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letterEntered) {
                newPair[j] = i;
                matched = true;
                j++;
            }
        }
        console.log(newPair.length)
        for (let n = 0; n < matchedLetterTrue.length; n++) {
            if (matchedLetterTrue[n] === newPair[0]) {
                matched = false;
            }
        }

        if (matched) {
            this.setState({ matchedLetterTrue : [...matchedLetterTrue, ...newPair]})
            newGuesses = newGuesses + (newPair.length * letterTrue);
            $('.input-letter-entered').css("border-bottom", "2px solid green")
        } else {
            newGuesses = newGuesses - letterFalse
            $('.input-letter-entered').css("border-bottom", "2px solid red")
        }
        this.setState({ guesses: newGuesses })
        setTimeout(function(){$('#letter').val("")}, VISUAL_PAUSE_MSECS)
        setTimeout(function(){$('.input-letter-entered').css("border-bottom", "2px solid #095059")}, VISUAL_PAUSE_MSECS)
        console.log(matchedLetterTrue)
    }

  render() {
        const { word, guesses, matchedLetterTrue, letterUsed } = this.state
        const won = matchedLetterTrue.length === word.length
        const loose = guesses === -5
        if (won || loose) {
            $('#letter').addClass('hidden-input')
            $('#button-replay').removeClass("hidden-input")
        }
        return (
            <div className="pendu">
                <header className="pendu-header">
                    <h1 className="pendu-title">LE PENDU</h1>
                </header>
                <GuessCount guesses={guesses} />
                {won && <p className="end-game win">Congratulation</p>}
                {loose && <p className="end-game loose">You loose</p>}
                <button id="button-replay" className="hidden-input" type="reset" onClick={this.resetState}>REJOUER</button>
                <div className="word-to-guess">
                    {word.map((letter, index) => (
                        <LetterWord
                            letter={letter}
                            feedback={this.getFeedbackForCard(index)}
                            key={index}
                            index={index}
                        />
                    ))}
                </div>
                <LetterEntered onInput={this.handleLetterClick} />
                <p className="newLetter">{letterUsed}</p>
            </div>
        )
  }
}

export default App;
