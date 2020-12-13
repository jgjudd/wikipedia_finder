import React from 'react'

const Results = ({ searchData }) => {
    return (
        <React.Fragment>
            {
                searchData.length > 0 ? 
                    <div>Array With Values</div> 
                    : 
                    <div>Loading...</div>
            }
        </React.Fragment>        
    )
}

export default Results
