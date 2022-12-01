const inputs = document.querySelectorAll("input")
inputs.forEach(input => {
    input.addEventListener("invalid", handleValidation)
    input.addEventListener("input", handleValidation)
})

function handleValidation(e) {
    if (e.type === "invalid") {
        e.target.setCustomValidity("Ce champ ne peut être vide.")
    }
    else if (e.type === "input") {
        e.target.setCustomValidity("")
    }
}

const cookieForm = document.querySelector("form")
cookieForm.addEventListener("submit", handleForm)


function handleForm(e) {
    e.preventDefault()

    // notre objet cookies
    const newCookie = {}

    //on parcours nos inputs
    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute] = input.value;

    })

    //création de la date d'expiration du cookie
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    // console.log(newCookie.expires)
    createCookie(newCookie)
    cookieForm.reset()




}

function createCookie(newCookie) {

    if (doesCookiesExist(newCookie.name)) {
        createToast({ name: newCookie.name, state: "modifié", color: "orangered" })
    } else {
        createToast({ name: newCookie.name, state: "créé", color: "green" })
    }
    //on cree un document qui va stoker nos cookies 
    // toUTCString pour faire la conversion de notre date en un informat lisible 
    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`
}

//la fonction qui met nos cookie dans un tableau pour la verification 
function doesCookiesExist(name) {
    //on remplace les space par le champs vide
    const cookies = document.cookie.replace(/\s/g, "").split(";");
    //on retourne un tableau 
    const onlyCookiesName = cookies.map(cookie => cookie.split("=")[0])
    console.log(cookies, onlyCookiesName)
    //on verifie si name  existe en parcourant le tableau cookie
    const cookiePresence = onlyCookiesName.find(cookie => cookie === encodeURIComponent(name))

    return cookiePresence;
}

const toastsContainer = document.querySelector(".toasts-container")


//la fonction pour l'affichage du message 
function createToast({ name, state, color }) {
    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";

    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = color;
    toastsContainer.appendChild(toastInfo)

    setTimeout(() => {
        toastInfo.remove()
    }, 2500)
}