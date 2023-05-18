import React, { useState, useEffect } from "react";
import UserTile from "./UserTile";
import { Redirect } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader"

const HomePage = () => {
    const [users, setUsers] = useState([])
    const [redirectToChat, setRedirectToChat] = useState(false)
    const [chat, setChat] = useState(null)

    const loader = new Loader({
        apiKey: "AIzaSyDum5hxOQ4YOWlsfYmS9xknVNvgvHLv858",
        libraries: ["places"],
    })

    const mapLoader = () => {
        loader.load().then(() => {
            const boston = { lat: 42.361, lng: -71.057 }

            const map = new google.maps.Map(document.getElementById("map"), {
                center: boston,
                zoom: 12
            })

            const request = {
                query: "gyms",
                location: boston,
                radius: "100",
            }

            const service = new google.maps.places.PlacesService(map)
            service.textSearch(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    results.forEach((result) => {
                        new google.maps.Marker({
                            position: new google.maps.LatLng(
                                result.geometry.location.lat(),
                                result.geometry.location.lng()
                            ),
                            map:map,
                        })
                    })
                    map.setCenter(results[0].geometry.location)
                }
            })
        })
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch ("/api/v1/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data.users)
            } else {
                console.error("Failed to fetch users:", response.statusText)
            } 
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    useEffect(() => {
        fetchUsers()
        mapLoader()
    }, [])
    

    const handleChatRequest = async (event, userId, newChat) => {
        event.preventDefault()
        try {
            const response = await fetch (`/api/v1/chats`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ chat: newChat, userId })
                }
            )

            if (response.ok) {
                const body = await response.json()
                setChat(body.chat)
                setRedirectToChat(true)
            } else {
                console.error("Failed to start chat:", response.statusText)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const userTiles = users.map((user) => {
        return (
                <UserTile 
                    key={user.id} 
                    user={user} 
                    onChatRequest={(event) => handleChatRequest(event, user.id)}
                    chat={chat}
                />
        )
    })

    return (
        <div className="homepage cell small-12">
            {redirectToChat && <Redirect to={`/chats/${chat.id}`} />}
        <div className="grid-x">
        <div className="cell small-12">
            <h1 className="homepage-title">SWOLmate</h1>
            <h3 className="homepage-subtitle">Find your perfect gym buddy!</h3>
            <h5 className="homepage-subtitle">Created by David Thomas</h5>
            <img src="https://i.imgur.com/efGAkY0.jpg" alt="gym image" />
            <div id="map" style={{height:400}}></div>
        </div>
            <div className="cell medium-6">{userTiles}</div>
        </div>
        </div>
    );
};

export default HomePage;
