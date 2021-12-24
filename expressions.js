import { variables } from "./constants.js";

export function parseExpression(expression) {
  const matrixRow = [0, 0, 0, 0, 0];

  console.log(expression);

  const firstVar = expression[0];
  const operator = expression[1];
  const secondVar = expression[2];

  const variable1 = variables.find((v) => v.name === firstVar);
  if (!variable1) alert("error");

  const variable2 = variables.find((v) => v.name === secondVar);
  if (!variable2) alert("error");

  if (firstVar === secondVar) {
    let value = 1;
    if (operator === "+") {
      value = 2;
    } else if (operator === "*") {
      value = [1, 2];
    }
    matrixRow[variable1.id - 1] = value;
  } else {
    matrixRow[variable1.id - 1] = 1;
    if (operator === "+") {
      matrixRow[variable2.id - 1] = 1;
    } else {
      matrixRow[variable2.id - 1] = -1;
    }
  }

  matrixRow[matrixRow.length] = expression[expression.length - 1];

  return matrixRow;
}

export function evaluateOneExpression(exp) {}

function isExpressionSolvable(expMatrix) {
  const params = expMatrix.slice(0, expMatrix.length - 1);
  const variablesCount = params.filter((p) => p !== 0).length;

  return variablesCount === 1;
}

// @return [variableID: number, variableValue: number]
function solveExpressionWithOneVariable(expMatrix) {
  //   const resp = [];
  const params = expMatrix.slice(0, expMatrix.length - 1);
  const result = expMatrix.slice(length - 1);

  const paramPosition = params.findIndex((p) => p !== 0);
  if (typeof expMatrix[paramPosition] === "number") {
    const value = result / 2;
    return [paramPosition + 1, value];
  } else {
    const value = Math.pow(result, 1 / params[paramPosition][1]);
    return [paramPosition + 1, value];
  }
}

export function evaluateExpressions(expressions) {
  const resultsRow = [0, 0, 0, 0, 0];

  let parsedExpressions = [];
  for (let i = 0; i < expressions.length; i++) {
    parsedExpressions.push(parseExpression(expressions[i].expression));
  }

  const solvableExpressionIdx =
    parsedExpressions.findIndex(isExpressionSolvable);

  if (solvableExpressionIdx !== undefined) {
    const [variableId, variableValue] = solveExpressionWithOneVariable(
      parsedExpressions[solvableExpressionIdx]
    );
    resultsRow[variableId - 1] = variableValue;
    parsedExpressions.splice(solvableExpressionIdx, 1);
  }

  return resultsRow;
}
