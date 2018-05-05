import React from 'react'
import PropTypes from 'prop-types'

import './LetterWord.css'

const HIDDEN_SYMBOL = '_';

const LetterWord = ({ letter, feedback, index }) => (
    <div className={`letter ${feedback}`} key={index}>
        <span className="letter">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
        </span>
    </div>
);

LetterWord.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'visible',
        'hidden',
    ]).isRequired,
    index: PropTypes.number.isRequired,
}

export default LetterWord