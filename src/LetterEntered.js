import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'

import './LetterEntered.css'


const LetterEntered = ({ onInput }) => (
        <input
            className="input-letter-entered"
            onChange={() => onInput($('#letter').val()) }
            type="text"
            id="letter"
            maxLength={1}
            minLength={1}
            autoFocus={1}
			autoComplete="off"
            required
        />
);

LetterEntered.propTypes = {
    letterEntered: PropTypes.string,
    onInput: PropTypes.func.isRequired,
};


export default LetterEntered