import React, { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: ${`#f2f2f2`};
    color: ${`#2a2a2a`};
    border-radius: 1.5rem;
    margin-right: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    min-width: 3rem;
    min-height: 3rem;
    padding: 0.4rem 0.4rem;    

    &:hover {
        background-color: ${`#650360`};
        color: ${`#f2f2f2`};
    }
    &:before,
    &:after,
    &:focus {
        outline: none;
    }
`

const TooltipContentWrapper = styled.div`
    position: relative;
`

const TooltipTextContainer = styled.span`
    
    min-width: 30rem;
    min-height: fit-content;
    background-color: ${`#FFFFFF`};
    color: ${`#2a2a2a`};
    border: 0.2rem solid ${`#8e0280`};    
    font-size: 2rem;
    text-align: center;
    border-radius: 6px;
    padding: 1rem 2rem;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: -131.5%;
    margin-left: -10rem;

    &::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 1.25rem;
        border-style: solid;
        border-color: transparent transparent ${`#8e0280`} transparent;
    }
`

const Tooltip = ({ text }) => {
    const [showText, setShowText] = useState(false)
    const toggleTooltipText = () => {
        setShowText(!showText)
    }
    return (
        <TooltipContentWrapper>
            <StyledButton
                onMouseOver={() => toggleTooltipText()}
                onMouseOut={() => toggleTooltipText()}
            >
                ?
            </StyledButton>        
            { showText ? <TooltipTextContainer>{text}</TooltipTextContainer> : null }
        </TooltipContentWrapper>
    )
}

export default Tooltip
