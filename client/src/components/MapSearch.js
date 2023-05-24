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
                <select id="search" onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="gyms">Gyms</option>
                <option value="parks">Parks</option>
                <option value="fields">Fields</option>
                <option value="hiking trails">Hiking Trails</option>
                <option value="bike paths">Bike Paths</option>
                <option value="yoga">Yoga Studios</option>
                <option value="mma boxing">MMA/Boxing Gyms</option>
                <option value="beaches">Beaches</option>
                </select>
            </label>
        
            <button className="sign-button button" onClick={handleSearch}>Search</button>
            </>
        )
}

export default MapSearch