import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import logo from '../assets/14677-alexa.png'

const StyledHeader = styled.header`
    background-color: #650360;
    color: #FFF;
    font-size: 5rem;
    font-weight: 700;
    height: 13vh;
    cut-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const LogoSection = styled.div`
    background-color: #FFFFFF;
    height: 7vh;
    width: 100vw;
    display: flex;
`
const StyledImage = styled.img`
    max-height: 5rem;
    max-width: 5rem;
    margin: 1rem;
`

const DefaultHeader = ({ text }) => {
    return (
        <React.Fragment>
            <LogoSection>
                <StyledImage src={logo} alt='Ally Logo' />
            </LogoSection>
            <StyledHeader>{text}</StyledHeader>
        </React.Fragment>
    )
}

export default DefaultHeader

DefaultHeader.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string
}
