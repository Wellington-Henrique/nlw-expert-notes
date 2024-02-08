import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'

import { NewNoteCard } from './componets/new-note-card'
import { NoteCard } from './componets/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    return !!notesOnStorage ? JSON.parse(notesOnStorage) : []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content
    }

    const notesArray = [newNote, ...notes ]

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => note.id !== id)

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setSearch(value)
  }
  
  const filteredSearch = !!search ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes
  //md:px0
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logo} alt="NLW Expert" />

      <form
        className='w-full' 
        action=""
      >
        <input 
          type="text" 
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700"/>

      <div className='grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        
        {filteredSearch.map(note => 
          <NoteCard 
            key={note.id} 
            note={note}
            onNoteDeleted={onNoteDeleted}
          />
        )}
      </div>
    </div>
  )
}