const main = document.querySelector(".primary")
const second = document.querySelector(".secondary")
var last, wynik, simbol, value, dot_number, equ, clipboard = 0, clipboard_first = true, m

const NUMBER_LIMIT = 15

var math_history = new Array()

$(document).ready(() => {
    console.log("Liczę na ciebie! ;))")
    $(".button").click(function() {

        value = $(this).attr("value")
        simbol = $(this).text()
        dot_number = main.innerHTML.length - main.innerHTML.replaceAll(".", "").length;
    
        if (value == "number") {
            (equ == true) && clr()
            if (main.innerHTML.length < NUMBER_LIMIT) {
                (main.innerHTML == 0 && dot_number != 1) && (main.innerHTML = "")
                main.innerHTML += simbol
            }
        } else {
            switch (value) {
                case "clr":
                    clr()
                    main.innerHTML = 0
                    break
                case "del":
                    (equ == true) && clr()
                    main.innerHTML = main.innerHTML.slice(0, -1)
                    main.innerHTML.length == 0 && (main.innerHTML = 0)
                    break
                case "not":
                    if (equ == true) {
                        clr()
                        main.innerHTML = 0
                    }
                    let x = parseFloat(main.innerHTML)
                    main.innerHTML = (main.innerHTML < 0) ? Math.abs(x) : -Math.abs(x)
                    break
                case "dot":
                    if (equ == true) {
                        clr()
                        main.innerHTML = 0
                    }
                    (dot_number < 1) && (main.innerHTML += ".")
                    break
                case "equ":
                    math(last)
                    if (clipboard == Infinity) {
                        alert("Nielegalne działanie. nara")
                        clr()
                        main.innerHTML = 0
                    } else {
                        second.innerHTML += ` ${main.innerHTML} =`
                        main.innerHTML = wynik
                        math_history.push(`${second.innerHTML} ${main.innerHTML}`)
                        last = "equ"
                        equ = true
                    }
                    break
                default:
                    math(value)
                    second.innerHTML = `${wynik} ${simbol}`
                    main.innerHTML = 0     
                    last = value              
                    break
            }
        }
        console.clear()
        console.log(`%cKliknięto ${value} ( ${simbol} )`, 'color: #A66BFF')
        console.log(`(${main.innerHTML.length}) ${main.innerHTML}`)
        console.log(clipboard)
        math_history.forEach((item) => {console.log(`%c${item}`, 'margin:10px;padding: 5px 10px;background:#48AB87;font-family:Montserrat;border-radius:5px;font-size:16px')})
    })
})
const math = (action) => {
    m = parseFloat(main.innerHTML)
    switch (action) {
        case "add":
            calc(() => {clipboard += m})
            break
        case "sub":
            calc(() => {clipboard -= m})
            break
        case "mul":
            calc(() => {clipboard *= m})
            break
        case "div":
            calc(() => {clipboard /= m})
            break
        default:
            second.innerHTML = ""
            wynik = m
            break
    }

}

const calc = (foo) => {
    if (equ == true) {
        clipboard = m
        equ = !equ
    } else {
        if (clipboard_first == true) {
            clipboard = m
            clipboard_first = false
        } else {foo()}
    }
    wynik = clipboard
}

const clr = () => {
    main.innerHTML = ""
    second.innerHTML = 0
    clipboard = 0
    clipboard_first = true
    equ = false
}