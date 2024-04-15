class Exercise {
    constructor(name, instructions, muscles, equipment) {
        this.name = name;
        this.instructions = instructions;
        this.muscles = muscles;
        this.equipment = equipment;
    }
}

const exercise01 = new Exercise('squat', 'lorem ipsum', ['piernas', 'gluteos'], 'maquina')
const exercise02 = new Exercise('ab crunch', 'lorem ipsum', ['abdominal', 'piernas'], 'none')
const exercise03 = new Exercise('skullcrusher', 'lorem ipsum', ['triceps', 'biceps'], 'dumbbell')

const exercises = [ exercise01, exercise02, exercise03 ]

const objectives = [
    'perder peso',
    'fuerza',
    'cardio'
]

class Session {
    constructor(exercise, duration, intensity, rendimiento, objective) {
        this.exercise = exercise
        this.duration = duration
        this.intensity = intensity
        this.rendimiento = rendimiento
        this.objective = objective
    }
}

const sessions = []

///////////////////////////////////////////////////////////////////////////

let addExercise
let trExercisesRow
let tableExercises

let addSession
let selSessionExercise
let trSessionsRow
let tableSessions

function initialize() {
    addExercise = document.querySelector('#addExercise')
    trExercisesRow = document.querySelector('#trExercisesRow')
    tableExercises = document.querySelector('#tableExercises')

    console.log(tableExercises)

    addSession = document.querySelector('#addSession')
    selSessionExercise = document.querySelector('#selSessionExercise')
    trSessionsRow = document.querySelector('#trSessionsRow')
    tableSessions = document.querySelector('#tableSessions')

    refreshExercises()
    refreshSessions()
}

///////////////////////////////////////////////////////////////////////////

function addRow(table, row) {
    const tbody = table.getElementsByTagName('tbody')[0]
    const newRow = tbody.insertRow()
    newRow.innerHTML = row.innerHTML
}

function addOption(select, option) {
    select.appendChild(option)
}

///////////////////////////////////////////////////////////////////////////

function submitExercise() {
    const formData = new FormData(addExercise)
    const exercise = new Exercise(
        formData.get('name'),
        formData.get('instructions'),
        formData.get('muscles'),
        formData.get('equipment')
    )

    exercises.push(exercise)

    refreshExercises()
    return false
}

function newExerciseRow(exercise) {
    const row = trExercisesRow.cloneNode(true)

    row.id = ''
    row.style.display = ''

    row.innerHTML = row.innerHTML
        .replace('name', exercise.name)
        .replace('instructions', exercise.instructions)
        .replace('muscles', exercise.muscles)
        .replace('equipment', exercise.equipment)

    return row
}

function newExerciseOption(exercise) {
    const option = document.createElement('option')
    option.value = exercise.name
    option.innerText = exercise.name

    return option
}

function refreshExercises() {
    console.log(tableExercises)
    const rowCount = tableExercises.rows.length

    // clear
    for (let i = rowCount - 1; i > 0; i--) {
        console.log('i', i)
        console.log(tableExercises.rows[i].id)

        if (!tableExercises.rows[i].id) {
            tableExercises.deleteRow(i)
        }
    }

    selSessionExercise.innerHTML = ''

    // add
    for (let exercise of exercises) {
        addRow(tableExercises, newExerciseRow(exercise))
        addOption(selSessionExercise, newExerciseOption(exercise))
    }

    return false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function submitSession() {
    const formData = new FormData(addSession)
    const exercise = exercises.find(ex => ex.name == formData.get('exercise'))
    const session = new Session(exercise, formData.get('duration'), formData.get('intensity'), formData.get('rendimiento'), formData.get('objective'))

    sessions.push(session)

    return false
}

function newSessionRow(session) {
    console.log('session', session)
    const row = trSessionsRow.cloneNode(true)

    row.id = ''
    row.style.display = ''

    row.innerHTML = row.innerHTML
        .replace('exercise', session.exercise.name)
        .replace('duration', session.duration)
        .replace('intensity', session.intensity)
        .replace('rendimiento', session.rendimiento)
        .replace('objective', session.objective)

    return row
}

function refreshSessions() {
    const rowCount = tableSessions.rows.length

    for (let i = rowCount - 1; i > 0; i--) {
        console.log('i', i)
        console.log(tableSessions.rows[i].id)

        if (!tableSessions.rows[i].id) {
            tableSessions.deleteRow(i)
        }
    }

    const rowCount2 = tableSessions.rows.length
    console.log('rowCount2', rowCount2)

    for (let session of sessions) {
        addRow(tableSessions, newSessionRow(session))
    }

    return false;
}
