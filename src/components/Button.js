import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = ({ text, clickAction, actionParameter }) => {    

    const StyledButton = styled.button`
        background-color: ${`#f2f2f2`};
        color: ${`#650360`};
        border: 1px solid ${`#650360`};
        border-radius: 1.5rem;
        margin: 0.5rem;        
        min-height: 3rem;
        min-width: 10rem;
        font-size: 1.5rem;
        box-shadow: 0.1rem 0.1rem;

        &:hover {
            background-color: ${`#650360`};
            color: ${`#FFFFFF`};
            box-shadow: 0.1rem 0.1rem;
        }
        &:active {
            background-color: ${`#8e0280`};
            transform: translateY(0.2rem);            
        }
        &:before,
        &:after,
        &:focus {
            outline: none;
        }
    `
    return (
        <StyledButton 
            onClick={() => clickAction(actionParameter)}
        >
            {text}
        </StyledButton>
    )
}

export default Button

Button.propTypes = {
    text: PropTypes.string.isRequired,
    clickAction: PropTypes.func.isRequired,
    actionParameter: PropTypes.array
}