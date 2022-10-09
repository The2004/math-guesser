// all templates must be 6 characters long
var templates = [ "X+XX-X", "X+X-XX", "X+XX*X", "X+X*XX", "X+XX+X", "X+X+XX", "X+XX/X", "X+X/XX", "X-XX-X", "X-X-XX", "X-XX*X", "X-X*XX", "X-XX+X", "X-X+XX", "X-XX/X", "X-X/XX", "X*XX-X", "X*X-XX", "X*XX*X", "X*X*XX", "X*XX+X", "X*X+XX", "X*XX/X", "X*X/XX", "X/XX-X", "X/X-XX", "X/XX*X", "X/X*XX", "X/XX+X", "X/X+XX", "X/XX/X", "X/X/XX"]

function generate_expression(){
    var result = "";
    var i = 0;
        var template = templates[randint(0, templates.length - 1)];
        for (const c of template) {
            if (c == 'X') {
                result += randint(0, 9);
            } else {
                result += c;
            }
        }
    while(eval(result) < 0 || eval(result) > 100 || !Number.isInteger(eval(result))){
        result = "";
        var i = 0;
        var template = templates[randint(0, templates.length - 1)];
        for (const c of template) {
            if (c == 'X') {
                result += randint(0, 9);
            } else {
                result += c;
            }
        }
    }
    return result;
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
var guess = ""
var expression = generate_expression();
var answer = eval(expression);
document.getElementById("toptext").innerHTML = "find hidden calculation that equals " + answer;
var guesscount = 0;

// make event listener for keypress
document.addEventListener("keydown", function(event) {
    console.log(event.key);
    console.log(event.keyCode);
    // if key pressed is number
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        if (!event.shiftKey) {
            var number = event.keyCode - 48;
            type(number);
        }
    }
    //if minus
    if (event.keyCode == 189) {
        type("-");
    }
    //if plus
    if (event.keyCode == 187) {
        type("+");
    }
    //if divide
    if (event.keyCode == 191) {
        type("/");
    }
    //if multiply
    if (event.keyCode == 56) {
        if (event.shiftKey){
        type("*");}
    }

    //if backspace
    if (event.keyCode == 8) {
        backspace()
    }
    // if enter
    if (event.keyCode == 13) {
        // check if guess is 6 characters long 
        submit();
    }
})

function backspace(){
    // remove last character
    guess = guess.slice(0, -1);
    // remove last character from screen
    const el = document.getElementById(String(guesscount * 6 + guess.length + 1))
    el.innerHTML = "";
    el.style.borderColor = "white";
}

function submit(){
    if (guess.length == 6) {
        // check if guess is correct
            if (eval(guess) == answer) {
                // if correct, add to guesscount
                // check every letter in guess if it mathes the expression
                for (var i = 0; i < guess.length; i++) {
                    
                    if (expression.includes(guess[i])) {
                        const el = document.getElementById(String(guesscount * 6 + i + 1))
                        el.style.borderColor = "yellow";
                        // if char is number
                        if (!isNaN(guess[i]) && document.getElementById("n" + guess[i]).style.borderColor != "green") {
                            document.getElementById("n" + guess[i]).style.borderColor = "yellow";
                        }
                        // if char is operator
                        if (guess[i] == '+' || guess[i] == '-' || guess[i] == '/' || guess[i] == '*') {
                            if (guess[i] == "+") {
                                if (document.getElementById("plus").style.borderColor != "green") {
                                    document.getElementById("plus").style.borderColor = "yellow";
                                }
                            }
                            if (guess[i] == "-") {
                                if (document.getElementById("minus").style.borderColor != "green") {
                                    document.getElementById("minus").style.borderColor = "yellow";
                                }
                            }
                            if (guess[i] == "/") {
                                if (document.getElementById("divide").style.borderColor != "green") {
                                    document.getElementById("divide").style.borderColor = "yellow";
                                }
                            }
                            if (guess[i] == "*") {
                                if (document.getElementById("multiply").style.borderColor != "green") {
                                    document.getElementById("multiply").style.borderColor = "yellow";
                                }
                            }
                        }

                    }
                    // if it matches, change border color to green
                    if (guess[i] == expression[i]) {
                        const el = document.getElementById(String(guesscount * 6 + i + 1))
                        el.style.borderColor = "green";
                        // if char is number
                        if (!isNaN(guess[i])) {
                            document.getElementById("n" + guess[i]).style.borderColor = "green";
                        }
                        // if char is operator
                        if (guess[i] == '+' || guess[i] == '-' || guess[i] == '/' || guess[i] == '*') {
                            if (guess[i] == "+") {
                                document.getElementById("plus").style.borderColor = "green";
                            }
                            if (guess[i] == "-") {
                                document.getElementById("minus").style.borderColor = "green";
                            }
                            if (guess[i] == "/") {
                                document.getElementById("divide").style.borderColor = "green";
                            }
                            if (guess[i] == "*") {
                                document.getElementById("multiply").style.borderColor = "green";
                            }
                        }


                    }
                    // if it doesn't match, and it is not in the expression, change border color to grey
                    if (!expression.includes(guess[i])) {
                        const el = document.getElementById(String(guesscount * 6 + i + 1))
                        el.style.borderColor = "grey";
                        if (!isNaN(guess[i])) {
                            document.getElementById("n" + guess[i]).style.borderColor = "rgb(94, 94, 94)";
                        }
                        if (guess[i] == '+' || guess[i] == '-' || guess[i] == '/' || guess[i] == '*') {

                            if (guess[i] == "+") {
                                document.getElementById("plus").style.borderColor = "rgb(94, 94, 94)";
                            }
                            if (guess[i] == "-") {
                                document.getElementById("minus").style.borderColor = "rgb(94, 94, 94)";
                            }
                            if (guess[i] == "/") {
                                document.getElementById("divide").style.borderColor = "rgb(94, 94, 94)";
                            }
                            if (guess[i] == "*") {
                                document.getElementById("multiply").style.borderColor = "rgb(94, 94, 94)";
                            }
                        }
                    }

                }
                guesscount++;
                guess = "";
            }else{
                alert("Guess has to be equals to " + answer);
            }
        }
}

function type(char){
    if (guess.length >= 6) {
        return;
    }else{
        guess += char;
        const el = document.getElementById(String(guesscount * 6 + guess.length))
        el.innerHTML = char;
        el.style.borderColor = "purple";
    }
}

// n0 on click
document.getElementById("n0").addEventListener("click", function(){
    type(0);
}
)
// n1 on click
document.getElementById("n1").addEventListener("click", function(){
    type(1);
}
)
// n2 on click
document.getElementById("n2").addEventListener("click", function(){
    type(2);
}
)
// n3 on click
document.getElementById("n3").addEventListener("click", function(){
    type(3);
}
)
// n4 on click
document.getElementById("n4").addEventListener("click", function(){
    type(4);
}
)
// n5 on click
document.getElementById("n5").addEventListener("click", function(){
    type(5);
}
)
// n6 on click
document.getElementById("n6").addEventListener("click", function(){
    type(6);
}
)
// n7 on click
document.getElementById("n7").addEventListener("click", function(){
    type(7);
}
)
// n8 on click
document.getElementById("n8").addEventListener("click", function(){
    type(8);
}
)
// n9 on click
document.getElementById("n9").addEventListener("click", function(){
    type(9);
}
)
// n- on click
document.getElementById("minus").addEventListener("click", function(){
    type("-");
}
)

// plus on click
document.getElementById("plus").addEventListener("click", function(){
    type("+");
}
)

// divide on click
document.getElementById("divide").addEventListener("click", function(){
    type("/");
}
)

//multiply on click
document.getElementById("multiply").addEventListener("click", function(){
    type("*");
}
)
//enter on click
document.getElementById("enter").addEventListener("click", function(){
    submit();
}
)
//backspace on click
document.getElementById("backspace").addEventListener("click", function(){
    backspace();
}
)
