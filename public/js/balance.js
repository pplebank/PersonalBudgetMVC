let incomesDate = document.getElementById("incomesDate");
let incomesCategory = document.getElementById("incomesCategory");
let incomesAmount = document.getElementById("incomesAmount");
let expensesDate = document.getElementById("expensesDate");
let expensesCategory = document.getElementById("expensesCategory");
let expensesAmount = document.getElementById("expensesAmount");

let summaryIncomeCategory = document.getElementById("summaryIncomeCategory");
let summaryIncomeAmount = document.getElementById("summaryIncomeAmount");
let summaryExpenseCategory = document.getElementById("summaryExpenseCategory");
let summaryExpenseAmount = document.getElementById("summaryExpenseAmount");

let incomesTable = document.getElementById("incomesTable");
let expensesTable = document.getElementById("expensesTable");
let summaryIncomesTable = document.getElementById("summaryIncomes");
let summaryExpensesTable = document.getElementById("summaryExpenses");


incomesDate.addEventListener("click", function () {
	sortStrings(incomesTable, 1);
});
incomesCategory.addEventListener("click", function () {
	sortStrings(incomesTable, 2);
});
incomesAmount.addEventListener("click", function () {
	sortNumbers(incomesTable, 3);
});
expensesDate.addEventListener("click", function () {
	sortStrings(expensesTable, 1);
});
expensesCategory.addEventListener("click", function () {
	sortStrings(expensesTable, 2);
});
expensesAmount.addEventListener("click", function () {
	sortNumbers(expensesTable, 3);
});



summaryIncomeCategory.addEventListener("click", function () {
	sortStrings(summaryIncomesTable, 1);
});
summaryIncomeAmount.addEventListener("click", function () {
	sortNumbers(summaryIncomesTable, 2);
});

summaryExpenseCategory.addEventListener("click", function () {
	sortStrings(summaryExpensesTable, 1);
});
summaryExpenseAmount.addEventListener("click", function () {
	sortNumbers(summaryExpensesTable, 2);
});




window.onload = function () {
	calculateBalance(incomesTable, summaryIncomesTable);
	calculateBalance(expensesTable, summaryExpensesTable);
	sum(summaryIncomesTable, totalIncomes, '+');
	sum(summaryExpensesTable, totalExpenses, '-');
	balance();

	createIncomeChar();
	createExpenseChar();
}

function createIncomeChar() {
	let categoryIncomeArray = getDataFromTable(summaryIncomesTable, 1);
	let ammountIncomeArray = getDataFromTable(summaryIncomesTable, 2);
	let incomeArray = generateColorsForCharts(summaryIncomesTable);
	let borderColorIncomeArray = changeColorsOpacityInArray(incomeArray, 1);
	let bgColorIncomeArray = changeColorsOpacityInArray(incomeArray, 0.6);

	let configIncomes = new Object({
		type: 'pie',
		data: {
			labels: categoryIncomeArray,
			datasets: [{
				data: ammountIncomeArray,
				backgroundColor: bgColorIncomeArray,
				borderColor: borderColorIncomeArray,
				borderWidth: 1,
			}]
		},
	});

	let chartIncomes = document.getElementById('chartIncomes').getContext('2d');
	let chartIncomesCanvas = new Chart(chartIncomes, configIncomes);
}

function createExpenseChar() {
	let categoryExpenseArray = getDataFromTable(summaryExpensesTable, 1);
	let ammountExpenseArray = getDataFromTable(summaryExpensesTable, 2);
	let expenseArray = generateColorsForCharts(summaryExpensesTable);
	let borderColorExpenseArray = changeColorsOpacityInArray(expenseArray, 1);
	let bgColorExpenseArray = changeColorsOpacityInArray(expenseArray, 0.6);


	let configExpenses = new Object({
		type: 'pie',
		data: {
			labels: categoryExpenseArray,
			datasets: [{
				data: ammountExpenseArray,
				backgroundColor: borderColorExpenseArray,
				borderColor: bgColorExpenseArray,
				borderWidth: 1,
			}]
		},
	});

	let chartExpenses = document.getElementById('chartExpenses').getContext('2d');
	let chartExpensesCanvas = new Chart(chartExpenses, configExpenses);
}

function random_rgb() {
	let o = Math.round,
		r = Math.random,
		s = 255;
	return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},#)`;
}

function generateColorsForCharts(table) {
	let array = new Array();
	let row = table.rows;
	for (i = 1; i < (row.length); i++) {
		array.push(random_rgb());
	}
	return array;
}

function changeColorsOpacityInArray(array, opacity) {
	let changedArray = new Array();
	for (i = 0; i < (array.length); i++) {
		changedArray.push(array[i].replace('#', opacity));
	}
	return changedArray;
}

function getDataFromTable(table, columnInTable) {
	let array = new Array();
	let i;
	let row = table.rows;
	for (i = 1; i < (row.length); i++) {
		let tableElements = row[i].getElementsByTagName("TD")[columnInTable];
		tableElementsValue = tableElements.innerText;
		array.push(tableElementsValue);
	}
	return array;
};

function sortStrings(table, columnInTable) {
	let row, switching, i, previousElement, nextElement, switchFlag, direction, switchDoneCount = 0;

	switching = true;
	direction = "ascending";
	while (switching) {
		switching = false;
		row = table.rows;
		for (i = 1; i < (row.length - 1); i++) {
			switchFlag = false;

			previousElement = row[i].getElementsByTagName("TD")[columnInTable];
			nextElement = row[i + 1].getElementsByTagName("TD")[columnInTable];
			if (direction == "ascending") {
				if (previousElement.innerHTML.toLowerCase() > nextElement.innerHTML.toLowerCase()) {
					switchFlag = true;
					break;
				}
			} else if (direction == "descending") {
				if (previousElement.innerHTML.toLowerCase() < nextElement.innerHTML.toLowerCase()) {
					switchFlag = true;
					break;
				}
			}
		}
		if (switchFlag) {
			row[i].parentNode.insertBefore(row[i + 1], row[i]);
			switching = true;
			switchDoneCount++;
		} else {
			if (switchDoneCount == 0 && direction == "ascending") {
				direction = "descending";
				switching = true;
			}
		}
	}
	setProperNO(table);
}

function sortNumbers(table, columnInTable) {
	let row, switching, i, previousElement, nextElement, switchFlag, direction, switchDoneCount = 0;

	switching = true;
	direction = "ascending";
	while (switching) {
		switching = false;
		row = table.rows;
		for (i = 1; i < (row.length - 1); i++) {
			switchFlag = false;

			previousElement = row[i].getElementsByTagName("TD")[columnInTable];
			nextElement = row[i + 1].getElementsByTagName("TD")[columnInTable];
			if (direction == "ascending") {
				if (Number(previousElement.innerHTML) > Number(nextElement.innerHTML)) {
					switchFlag = true;
					break;
				}
			} else if (direction == "descending") {
				if (Number(previousElement.innerHTML) < Number(nextElement.innerHTML)) {
					switchFlag = true;
					break;
				}
			}
		}
		if (switchFlag) {
			row[i].parentNode.insertBefore(row[i + 1], row[i]);
			switching = true;
			switchDoneCount++;
		} else {
			if (switchDoneCount == 0 && direction == "ascending") {
				direction = "descending";
				switching = true;
			}
		}
	}
	setProperNO(table);
}

function calculateBalance(tableWithRecords, tableSummary) {
	let rowsInRecordsTable = tableWithRecords.rows;
	let rowsInSummaryTable;
	let no = 0;
	for (i = 1; i < (rowsInRecordsTable.length); i++) {
		rowsInSummaryTable = tableSummary.rows;
		let categoryCellRecords = rowsInRecordsTable[i].getElementsByTagName("TD")[2];

		let amountCellRecords = rowsInRecordsTable[i].getElementsByTagName("TD")[3];

		let positionOfCategoryInSummaryTable = iteratorCategoryInSummaryTable(rowsInSummaryTable, categoryCellRecords);

		if (positionOfCategoryInSummaryTable != 0) {

			let amountCellSummary = rowsInSummaryTable[positionOfCategoryInSummaryTable].getElementsByTagName("TD")[2];

			let amountCellSummaryValue = amountCellSummary.innerText;
			let amountCellRecordsValue = amountCellRecords.innerText;
			let sum = Number(amountCellSummaryValue) + Number(amountCellRecordsValue);

			amountCellSummary.innerText = sum;
		} else {
			let newRow = document.createElement("TR");

			let newNO = ++no;
			let newNOCell = document.createElement("TD");
			let newCategoryCell = document.createElement("TD");
			let newAmountCell = document.createElement("TD");

			newNOCell.innerText = newNO;
			newCategoryCell.innerText = categoryCellRecords.innerText;
			newAmountCell.innerText = amountCellRecords.innerText;

			newRow.appendChild(newNOCell);
			newRow.appendChild(newCategoryCell);
			newRow.appendChild(newAmountCell);

			let placeToAdd = tableSummary.querySelector("tbody");
			placeToAdd.appendChild(newRow);
		}
	}
	sortNumbers(tableSummary, 2);
	setProperNO(tableSummary);
}

function iteratorCategoryInSummaryTable(rowsInSummaryTable, categoryCellRecords) {

	for (let i = 1; i < (rowsInSummaryTable.length); i++) {

		let categoryCellSummary = rowsInSummaryTable[i].getElementsByTagName("TD")[1];

		if (categoryCellSummary.innerText == categoryCellRecords.innerText) {
			return i;
		}
	}
	return 0;
}

function setProperNO(table)
{
	let rowsInTable = table.rows;
	for (i = 1; i < (rowsInTable.length); i++) 
	{
	let cellRecords = rowsInTable[i].getElementsByTagName("TD")[0];
	cellRecords.innerText = i;

	}

}

function sum(table, id, sign) {
	let sum = 0;
	rowsInTable = table.rows;
	for (i = 1; i < (rowsInTable.length); i++) {
		let amountCell = rowsInTable[i].getElementsByTagName("TD")[2];
		amountCellvalue = amountCell.innerText;
		sum += Number(amountCellvalue);
	}
	let cellWithResult = document.getElementById(id);
	id.innerText = sign + sum;
}

function balance() {

	let totalIncomes = document.getElementById("totalIncomes");
	let totalExpenses = document.getElementById("totalExpenses");

	let sum = 0;
	sum = Number(totalIncomes.innerText) + Number(totalExpenses.innerText);
	sum = parseFloat(sum).toFixed(2);
	let totalBalance = document.getElementById("totalBalance");
	let comment = document.getElementById("comment");

	if (sum > 0) {
		totalBalance.innerText = '+' + sum + '$';
		comment.innerText = ("You are doing great! Keep going!");
		comment.style.color = "green";
	} else {
		totalBalance.innerText = sum + '$';
		comment.innerText = ("You are in the red!");
		comment.style.color = "red";
	}
}