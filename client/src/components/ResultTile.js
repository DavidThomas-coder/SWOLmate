import React from "react"

const ResultTile = (props) => {
    return (
        <div className="callout">
            <h3>{props.result.name}</h3>
            <p>{props.result.formatted_address}</p>
            <p>{props.result.rating} / 5</p>
        </div>
    )
}

export default ResultTile