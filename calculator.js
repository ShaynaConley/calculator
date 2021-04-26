const calculate = (n1, operator, n2) => {
  let result = ""
  if(operator === "add"){
    result = parseFloat(n1) + parseFloat(n2)
  }else if (operator === "subtract"){
    result = parseFloat(n1) - parseFloat(n2)
  }else if (operator === "multiply"){
    result = parseFloat(n1) * parseFloat(n2)
  }else if (operator === "divide"){
    result = parseFloat(n1) / parseFloat(n2)
  }
  return result
}

const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")
const display = document.querySelector(".calculator__display")


keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove("is-depressed"))
        
        if (!action){
            if(displayNum === "0" || previousKeyType === "operator"){
                display.textContent = keyContent
            }else{
                display.textContent = displayNum + keyContent
            }
          calculator.dataset.previousKeyType = "number"
        }
      
        if(action === "decimal"){
            if(!displayNum.includes(".")){
              display.textContent = displayNum + "."
            }else if(previousKeyType === "operator" || previousKeyType === "calculate"){
              display.textContent = "0"
            }
            calculator.dataset.previousKeyType = "decimal"
        }
        if(action === "add" || action === "subtract" || action === "multiply" || action === "divide"){
             const firstValue = calculator.dataset.firstValue
             const operator = calculator.dataset.operator
             const secondValue = displayNum
             
             if(firstValue && operator && previousKeyType !== "operator"){
               const calcValue = calculate(firstValue, operator, secondValue)
           display.textContent = calcValue
               calculator.dataset.firstValue = calcValue
        }else{
           calculator.dataset.firstValue = displayNum
        }
             
             key.classList.add("is-depressed")
             calculator.dataset.previousKeyType = "operator"
            
             calculator.dataset.operator = action
        }
      if (action === "clear"){
        calculator.dataset.firstValue = ""
         calculator.modValue = ""
        calculator.dataset.operator = ""
        calculator.dataset.previousKeyType = ""
        
        display.textContent = 0
        calculator.dataset.previousKeyType = "clear"
      }
      if(action === "calculate"){
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayNum
        
        if(firstValue){
          if(previousKeyType === "calculate"){
            firstValue = displayNum
            secondValue = calculator.dataset.modValue
          }
          display.textContent = calculate(firstValue, operator, secondValue)
          
        }
        calculator.dataset.modValue = secondValue
       calculator.dataset.previousKeyType = "calculate"
      }
    }
})
