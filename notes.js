const fs = require('fs');

console.log('Starting notes.js');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);        
    } catch (error) {
        console.log('El archivo no existe');        
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    console.log('Adding note',title,body);
    var notes = fetchNotes();
    
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        var note = {
            title,
            body
        };
        notes.push(note);
        saveNotes(notes);
        return note;  
    }
    else {
        console.log('Esa nota ya existe');
    }
};

//getNote lo escribi como una funcion convencional para probar si funciona de igual manera
function getNote (title) {
    console.log('Getting note',title);
    var notes = fetchNotes();
    var note = notes.find((note) => note.title === title);
    return note;
};

//lo escribi como una funcion asignada a una variable para probar
var removeNote = function (title) {
    console.log('Removing note',title);
    var notes = fetchNotes();
    var notesFiltered = notes.filter((note) => note.title !== title);
    saveNotes(notesFiltered);
    return notes.length !== notesFiltered.length;
}

var getAll = () => {
    console.log('Getting all notes');
    return fetchNotes();
};

var logNote = (note) => {
    debugger;
    console.log('---');
    console.log(`Titulo: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote: addNote,
    //Remember that in ES6, if you have a property whose name is identical to
    //the value, which is a variable, you can simply remove the value variable
    //and the colon
    //Como hago de aca para abajo
    getNote,
    removeNote,
    getAll,
    logNote
};