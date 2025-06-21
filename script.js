// Variáveis globais para controlar o estado da calculadora
let displayValue = '0';
let expression = ''; // Nova variável para armazenar a expressão completa
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Elementos do DOM
const display = document.querySelector('.visor');

// Função para atualizar o visor
function updateDisplay() {
    // Mostra a expressão completa se existir, senão mostra apenas o valor atual
    if (expression && !waitingForSecondOperand) {
        display.value = expression + displayValue;
    } else {
        display.value = displayValue;
    }
}

// Função para adicionar dígito
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
        // Adiciona o operador à expressão
        expression += operator + ' ';
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Função para adicionar ponto decimal
function inputDecimal() {
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        expression += operator + ' ';
        return;
    }

    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

// Função para limpar tudo
function clear() {
    displayValue = '0';
    expression = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

// Função para limpar apenas o último número
function clearLastNumber() {
    if (waitingForSecondOperand) {
        // Se está esperando o segundo operando, volta para o primeiro
        displayValue = String(firstOperand);
        waitingForSecondOperand = false;
        operator = null;
        // Remove o último operador da expressão
        expression = expression.slice(0, -2); // Remove " + " (operador + espaço)
    } else {
        // Limpa apenas o número atual
        displayValue = '0';
    }
}

// Função para realizar cálculos
function performCalculation() {
    if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(displayValue);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case 'x':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    alert('Erro: Divisão por zero!');
                    clear();
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            case '%':
                result = firstOperand % secondOperand;
                break;
            default:
                return;
        }

        // Atualiza a expressão para mostrar o resultado
        expression = `${firstOperand} ${operator} ${secondOperand} = `;
        displayValue = String(result);
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
    }
}

// Função para lidar com operadores
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
        // Inicia a expressão com o primeiro número
        expression = String(inputValue) + ' ';
    } else if (operator) {
        // Se já existe um operador, calcula o resultado anterior
        performCalculation();
        // Continua a expressão com o resultado
        expression = String(firstOperand) + ' ';
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
}

// Event listener para todos os botões
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // Verificar o tipo de botão clicado
        if (!isNaN(value) || value === '0') {
            // É um número
            inputDigit(value);
        } else if (value === '.') {
            // É um ponto decimal
            inputDecimal();
        } else if (value === 'ac') {
            // Limpar tudo
            clear();
        } else if (value === 'c') {
            // Limpar apenas o último número
            clearLastNumber();
        } else if (value === '=') {
            // Calcular resultado
            performCalculation();
        } else {
            // É um operador
            handleOperator(value);
        }

        updateDisplay();
    });
});

// Inicializar o display
updateDisplay();

