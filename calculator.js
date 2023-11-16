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

        if(!operators.length){
            total = numbers[0]
            return total;
        }

        if(operators.length == numbers.length){
            let firstOperator = operators.splice(0,1);
            for(let i = 1; i < numbers.length; i++){
            
                if(isNaN(total)){
                    a = +numbers[0];
                    b = +numbers[i];
                    op = operators[i-1]
    
                    total = this.methods[op](+`${firstOperator}${a}`,b);
                } else {
                    b = +numbers[i];
                    op = operators[i-1];
    
                    total = this.methods[op](total,b);
                }
            }

            return total;
        }

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
        let clickedButton = event.target.id; 
        let userLastInput = userInput[userInput.length-1];
        let notANumber = isNaN(+clickedButton);
        let userLastInputIsNotANumber = isNaN(+userLastInput);
        if(clickedButton === 'AC'){
            userInput = '';
            result_screen.textContent = '0';
        } else if((clickedButton === '=' && userInput.length >= 3 && !userLastInputIsNotANumber)){
            userInput = String(calculator.calculate(userInput));
            result_screen.textContent = userInput;
        } else if(((userInput && notANumber && !userLastInputIsNotANumber && clickedButton != '=') || (!notANumber))) {
            if(clickedButton == '.' && userInput[userInput.length-2] == '.'){
                return;
            } else {
                userInput += clickedButton;
                result_screen.textContent = userInput;
            }
            
        }
    }); 
})