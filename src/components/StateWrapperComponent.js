import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import SearchBar from './SearchBar'
import Button from './Button'
import Results from './Results'

const WrapperDivLayout = styled.div`
    height: 80vh;
    width: 100vw;
    cut-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ControlsLayout = styled.div`    
    height: 10vh;
    width: 100%;
    border-bottom: 1px solid ${`#8e0280`};
`
const ControlsContainer = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const ResultsLayout = styled.div`
    height: 82.5vh;
    width: 100vw;
    // overflow-y: scroll; 
    background-color: #f2f2f2;
    color: #2a2a2a;
`
// wraps everything but header, 
// makes api call, 
// manages state,
// and feeds state to children components
const StateWrapperComponent = () => {
    const [searchTerms, setSearchTerms] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [emptyResults, setEmptyResults] = useState(true)
    
    const handleSearchUpdate = async () => {                
        const query = searchTerms.trim().split(' ').join('%20')             
        const queryString = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=search&meta=&continue=-%7C%7Cinfo&utf8=1&formatversion=1&srsearch={${query}}&srnamespace=0&srlimit=100&srwhat=text&srprop=wordcount%7Ctimestamp%7Csnippet%7Csectionsnippet&srsort=relevance`
        await axios.get(queryString)
            .then(response => {
                if(response.status == 200) {
                    setSearchResults(response.data.query.search)
                    setEmptyResults(false)
                } else {
                    setEmptyResults(true)
                }
            })            
    }    
    handleSearchUpdate('hockey')
    const clearResults = () => {
        setSearchResults([])
        setEmptyResults(true)
    }
    const updateSearchTerms = (newInput) => {
        setSearchTerms(newInput)
    }

    return (
        <WrapperDivLayout>
            <ControlsLayout>
                <ControlsContainer>
                    <SearchBar updateAction={updateSearchTerms} />
                    <Button 
                        text='Search'
                        color='#f2f2f2'
                        backgroundColor='#2a2a2a'
                        clickAction={handleSearchUpdate}
                        actionParameter={searchTerms}
                    />
                    <Button                        
                        text='Clear'
                        color='#2a2a2a'
                        backgroundColor='#f2f2f2'
                        clickAction={clearResults}                        
                    />
                </ControlsContainer>
            </ControlsLayout>
            <ResultsLayout>
                {
                    emptyResults ?
                        <div>To view results, use the search bar (above) then click 'Search'</div>
                    :
                        <Results searchData={searchResults} />
                }            
            </ResultsLayout>
        </WrapperDivLayout>
    )
}

export default StateWrapperComponent