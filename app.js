console.log('Starting app.js');

//node_modules
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

//modules i created
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
                .command('add', 'Add a new note', {
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('list', 'List all notes')
                .command('read', 'Read a note', {
                    title: titleOptions
                })
                .command('remove', 'Remove a note', {
                    title: titleOptions
                })
                .help()
                .argv;
var command = argv._[0];
console.log('Command:', command);
console.log('Yargs',argv);

switch (command) {
    case 'add':
        var note = notes.addNote(argv.title,argv.body)
        if (note) {
            console.log('Nota creada correctamente');
            notes.logNote(note);
        }
        else {
            console.log('La nota no fue creada');
        }
        break;
    case 'list':
        var allNotes = notes.getAll();
        if (allNotes) {
            console.log(`Cantidad de notas: ${allNotes.length}`);
            allNotes.forEach(note => notes.logNote(note));
        }
        else {
            console.log('No hay notas guardadas');
        }
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Nota encontrada');
            notes.logNote(note);
        }
        else {
            console.log('La nota no fue encontrada');
        }
        break;
    case 'remove':
        var noteRemoved = notes.removeNote(argv.title);
        var message = noteRemoved? 'La nota fue eliminada':'No se ha eliminado ninguna nota';
        console.log(message);
        break;
    default:
        console.log('Command not recognized');
        break;
}