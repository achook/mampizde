//firebase.analytics()

const db = firebase.database();

if (location.hostname === "localhost") {
  db.useEmulator("localhost", 9000);
}

const format_pizda = number => {
    if (number == 0) {
        return `wszyscy zdali`
    }
    if (number == 1) {
        return `nie zdała 1 osoba`
    }

    if (number % 100 > 5 && number % 100 < 22) {
        return `nie zdało ${number} osób`
    }

    if (number % 10 > 1 && number % 10 < 5) {
        return `nie zdały ${number} osoby`
    }

    return `nie zdało ${number} osób`
}

const reason = document.querySelector('#pizda_reason')
const counter = document.querySelector('#pizda_counter')

const get_pizda = (snapshot) => {
    if (snapshot.exists()) {
        const val = snapshot.val()
        reason.textContent = val.reason
        counter.textContent = format_pizda(val.number)
      }
}

const push_pizda = () => {
    db.ref().update( { 'number': firebase.database.ServerValue.increment(1) } )
}

db.ref().get().then((snapshot) => {
    get_pizda(snapshot)
}).catch((error) => {
  // add 
})

db.ref().on('value', (snapshot) => {
    get_pizda(snapshot)
}, (err) => {
    // add
})


const handleClick = () => {
    //firebase.analytics().logEvent('click')

    document.querySelector('#harold').classList.remove('hidden')
    push_pizda()
}

const button = document.querySelector('#pizda_adder')
button.addEventListener('click', handleClick)
