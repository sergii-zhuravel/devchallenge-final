import { parseExpression, evaluateExpressions } from "./expressions.js";
import {
  variables,
  operations,
  MAX_EXPRESSIONS_NUMBER,
  Variable,
} from "./constants.js";

const expressions = []; // {id: '1', expression: ['dog', '+', 'dog', '=', '4']}

// with this we can modify any expression
function onExpressionViewClick() {
  const expressionId = this.getAttribute("data-id");
  console.log(expressionId);
  window.currentExpressionId = expressionId;
}

function onAddExpressionClick() {
  if (expressions.length >= MAX_EXPRESSIONS_NUMBER) return; // error can be shown
  const expressionsContainer = document.querySelector(".expressions");
  const expressionId = expressions.length + 1;
  window.currentExpressionId = expressionId; // set new current expression id
  expressions.push({ id: expressionId, expression: [] });

  const expressionDiv = document.createElement("div");
  expressionDiv.className = "expression-item";
  expressionDiv.setAttribute("data-id", expressionId);
  expressionDiv.onclick = onExpressionViewClick;
  expressionsContainer.append(expressionDiv);
}

function updateExpressionWithNewVariable(variableName) {
  const expressionItem = expressions.find(
    (el) => el.id == window.currentExpressionId
  );

  // update expression
  expressionItem.expression.push(variableName);
}

function onImageInputClick() {
  if (!window.currentExpressionId) {
    alert("Create Expression first");
    return;
  }

  // update expression
  updateExpressionWithNewVariable(this.title);

  //now we can update the View
  // variant 1: directly push the value to the expression
  const expressionItemElem = document.querySelector(
    `[data-id='${window.currentExpressionId}']`
  );

  const variableName = this.title;
  const variable = variables.find((v) => v.name === variableName);
  if (!variable) return; // TODO: show error

  const btn = document.createElement("input");
  btn.type = "image";
  btn.title = variable.name;
  btn.src = variable.src;

  expressionItemElem.append(btn);
}

function onOperatorInputClic() {
  if (!window.currentExpressionId) {
    alert("Create Expression first");
    return;
  }

  const expressionItem = expressions.find(
    (el) => el.id == window.currentExpressionId
  );
  expressionItem.expression.push(this.textContent);
  //now we can update the View
  // variant 1: directly push the value to the expression
  const expressionItemElem = document.querySelector(
    `[data-id='${window.currentExpressionId}']`
  );

  const btn = document.createElement("button");
  btn.title = this.textContent;
  btn.textContent = this.textContent;

  expressionItemElem.append(btn);
}

function createButtonElement(text) {
  const btn = document.createElement("button");
  btn.title = text;
  btn.textContent = text;
  return btn;
}

function onEnterNumValueClick() {
  const numInputElem = document.getElementById("numInput");
  const expressionItem = expressions.find(
    (el) => el.id == window.currentExpressionId
  );

  expressionItem.expression.push(numInputElem.value);

  // update view
  const expressionItemElem = document.querySelector(
    `[data-id='${window.currentExpressionId}']`
  );
  const btn = createButtonElement(numInputElem.value);
  expressionItemElem.append(btn);

  // clear input
  numInputElem.value = "";
}

function displayResults(results) {
  const container = document.querySelector(".results-inner");
  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      const variable = variables.find((v) => v.id === i + 1);
      const btn = createVariableImageElement(variable.name, variable.src);
      container.append(btn);

      container.append(createButtonElement("="));
      container.append(createButtonElement(results[i]));
    }
  }
}

function onCalculateBtnClick() {
  const results = evaluateExpressions(expressions);
  displayResults(results);
}

function onAddNewArgumentClick() {
  const argumentImageUrlElem = document.getElementById("argumentImageUrl");
  const argumentNameElem = document.getElementById("argumentName");
  const newVariable = new Variable(
    argumentNameElem.value,
    argumentImageUrlElem.value,
    variables.length + 1
  );
  variables.push(newVariable);
  initInputPad();
}

function createVariableImageElement(name, src) {
  const element = document.createElement("input");
  element.type = "image";
  element.title = name;
  element.src = src;

  return element;
}

function initInputPad() {
  const padContainer = document.querySelector(".pad-container");
  padContainer.innerHTML = null;
  if (!padContainer) return;
  for (let i = 0; i < variables.length; i++) {
    const btn = createVariableImageElement(variables[i].name, variables[i].src);
    btn.onclick = onImageInputClick;
    padContainer.append(btn);
  }

  for (let i = 0; i < operations.length; i++) {
    const btn = document.createElement("button");
    btn.title = operations[i];
    btn.textContent = operations[i];
    btn.onclick = onOperatorInputClic;

    padContainer.append(btn);
  }
}

initInputPad();

const addExpressionButtonElem = document.querySelector(
  ".add-expression-button"
);
addExpressionButtonElem.onclick = onAddExpressionClick;

const enterNumValueButtonElem = document.querySelector(
  ".enter-num-value-button"
);
enterNumValueButtonElem.onclick = onEnterNumValueClick;

const calcButtonElem = document.querySelector(".calc-btn");
calcButtonElem.onclick = onCalculateBtnClick;

const addNewArgumentButtonBtn = document.querySelector(
  ".add-new-argument-button"
);
addNewArgumentButtonBtn.onclick = onAddNewArgumentClick;
