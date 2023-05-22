import React, { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

import MapSearch from "./MapSearch"
import ResultList from "./ResultList"
import UserTile from "./UserTile"

const GoogleMap = (props) => {

    const [searchQuery, setSearchQuery] = useState("gyms")
    const [searchResults, setSearchResults] = useState([])
    const [error, setError] = useState("")

    const loader = new Loader({
        apiKey: "AIzaSyDum5hxOQ4YOWlsfYmS9xknVNvgvHLv858",
        libraries: ["places"],
    })

    useEffect(() => {
        setError("")
        loader.load().then(() => {
            const boston = { lat: 42.361, lng: -71.057 }

            const request = {
                query: searchQuery,
                location: boston,
                radius: "500"
            }

            const map = new google.maps.Map(document.getElementById("map"), {
                center: boston,
                zoom: 11,
            })

            const service = new google.maps.places.PlacesService(map)
            if (searchQuery) {
                service.textSearch(request, function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setSearchResults(results)
                        results.forEach((result) => {
                            const resultContent =
                                `<p>${result.name}</p>` +
                                `<p>${result.formatted_address}</p>`

                            const infoWindow = new google.maps.InfoWindow({
                                content: resultContent,
                                ariaLabel: result.name,
                            })

                            const marker = new google.maps.Marker({
                                position: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
                                map: map,
                            })

                            marker.addListener("click", () => {
                                infoWindow.open({
                                    anchor: marker,
                                    map,
                                })
                            })
                        })
                        map.setCenter(results[0].geometry.location)
                    } else {
                        setError("No results found, please try again.")
                    }
                })
            }
        })
    }, [searchQuery])

    const userTiles = props.users.map((user) => {
        return (
                <UserTile 
                    key={user.id} 
                    user={user} 
                    onChatRequest={(event) => props.handleChatRequest(event, user.id)}
                    chat={props.chat}
                />
        )
    })

    return (
        <>
            <h1>Find Places Near You!</h1>
            <p>We're showing you gyms by default, but search for anything you'd like!</p>
            <div className="map-search-container">
                <MapSearch setSearchQuery={setSearchQuery} />
            </div>
            <div id="map" style={{ height: 400, maxWidth: '100%', margin: '0 auto', marginTop: '20px', marginLeft: '40px', marginRight: '40px' }}></div>
            <div className="results-main grid-x grid-margin-x">
                <div className="cell medium-6">
                    <div className="result-list-container">
                        <h2>Search Results:</h2>
                        <ResultList searchResults={searchResults} />
                    </div>
                </div>
                <div className="cell medium-6">
                    <div className="user-tiles-container">
                        <h2>SWOLmate Users Near You!</h2>
                        {userTiles}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoogleMap