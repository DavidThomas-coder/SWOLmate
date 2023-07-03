import express from "express"
import { ValidationError } from "objection"
import NoteSerializer from "../../serializers/NoteSerializer.js"

import { Note } from "../../../models/index.js"

const groupsNotesRouter = new express.Router({ mergeParams: true })

groupsNotesRouter.get("/", async (req, res) => {
    try {
        const notes = await Note.query()
        const serializedNotes = notes.map(note => NoteSerializer.showNoteDetails(note))
        return res.status(200).json({ notes: serializedNotes })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

groupsNotesRouter.post("/", async (req, res) => {
    const chatId = req.params.id
    const newNoteBody = req.body.note.noteBody
    try {
        const newNote = await Note.query().insert({ noteBody: newNoteBody, userId: req.user.id })
        return res.status(201).json({ note: newNote })
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ error: "Unable to add note!" })
    }
})

export default groupsNotesRouter