import React from 'react'
import styled from 'styled-components'
import Tooltip from './Tooltip'

const StyledInput = styled.input`
    font-size: 2rem;
    line-height: 3rem;
    margin: 0.5rem;
    width: 40%;

    &:focus {
        outline: 0.1rem solid ${`#650360`};
    }
`

const SearchBar = ({ updateAction }) => {
    return (
        <React.Fragment>
            <StyledInput 
                type='text' 
                placeholder='Enter search terms here...'
                onChange={(e) => updateAction(e.target.value)}
            />
            <Tooltip     
                color='#2a2a2a'
                backgroundColor='#f2f2f2'
                text='This is the tooltip text. To use the search bar, enter a search term in the input box and then click the search button'
            />
        </React.Fragment>
    )
}

export default SearchBar
