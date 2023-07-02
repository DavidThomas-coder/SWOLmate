import React, { useState } from "react"

const NoteForm = () => {
    const [newNote, setNewNote] = useState({
        noteBody: "",
    })
    const [errors, setErrors] = useState({})

    const handleNoteChange = (event) => {
        setNewNote({
            ...newNote,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        if (newNote.noteBody.trim() !== "") {
            handleNoteSubmit(event, newNote)
            setNewNote({ noteBody: "" })
            setErrors({})
        } else {
            setErrors({ noteBody: "Error: Note can't be empty!" })
        }
    }

    return (
        <div className="NoteForm-wrapper">
            <form onSubmit={handleNoteSubmit} className="NoteForm">
                <label>
                Leave a Note For The Group!
                </label>
                <label>
                Note here:
                <input
                    type="text"
                    name="noteBody"
                    value={newNote.noteBody}
                    onChange={handleNoteChange}
                />
                
                </label>
                {errors.noteBody && <div className="error">{errors.noteBody}</div>}
                <button type="submit" className="note-btn">
                Send
                </button>
            </form>
        </div>

    )
}
