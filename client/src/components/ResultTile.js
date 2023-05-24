import React from "react"

const ResultTile = (props) => {
    console.log(props)
    return (
        <div className="result-tile cell medium-6">
            <h3>{props.result.name}</h3>
            <p>{props.result.formatted_address}</p>
            <p>{props.result.rating} / 5</p>
        </div>
    )
}

export default ResultTile