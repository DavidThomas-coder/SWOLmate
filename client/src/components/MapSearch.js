import React, { useState } from "react"

const MapSearch = (props) => {
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (event) => {
        setSearchInput(event.currentTarget.value)
    }

    const handleSearch = () => {
        props.setSearchQuery(searchInput)
    }

    return (
        <>
            <label htmlFor="search">
                <input
                    id="search"
                    type="text"
                    onChange={handleChange}
                />
            </label>

            <button className="sign-button button" onClick={handleSearch}>Search</button>
        </>
    )
}

export default MapSearch