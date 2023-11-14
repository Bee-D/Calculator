function Calculator(){
    this.methods = {
        '+': (a,b) => a + b,
        '-': (a,b) => a - b,
        '*': (a,b) => a * b,
        '/': (a,b) => a / b,
    }; 

    this.calculate = string => {
        let operators = string.split(/[\d.]/).filter(val => val);
        let numbers = string.split(/[^\d.]/).filter(val => val);

        let a = 0;
        let op = '';
        let b = 0;

        let total;

        for(let i = 1; i < numbers.length; i++){
            if(isNaN(total)){
                a = +numbers[0];
                b = +numbers[i];
                op = operators[i-1]

                total = this.methods[op](a,b);
            } else {
                b = +numbers[i];
                op = operators[i-1];

                total = this.methods[op](total,b);
            }
        }

        return total;
    }

    this.addMethod = (operator, func) => {
        return this.methods[operator] = func;
    };
}

let result_screen = document.querySelector('.result');
let buttons = document.querySelectorAll('button');
let userInput = '';
let calculator = new Calculator;

buttons.forEach(each => {
    each.addEventListener('click', event => {
        if(event.target.id === 'AC'){
            userInput = '';
            result_screen.textContent = '0';
        } else if(event.target.id === '='){
            userInput  = calculator.calculate(userInput)
            result_screen.textContent = userInput;
        } else {
            userInput += event.target.id;
            result_screen.textContent = userInput;
        }
    });
})