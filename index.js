const ArrayOfExpense = JSON.parse(localStorage.getItem("expense")) || [];
let TotalOfExpense = 0;

ArrayOfExpense.forEach((item) => {
  TotalOfExpense += item.amount;
});

function updateTotalDisplay() {
  const totalElement = document.getElementById("Total");
  if (totalElement) totalElement.textContent = `Total: ${TotalOfExpense}`;
}

function Send() {
  let Amount = parseInt(document.getElementById("Amount").value);
  let Label = document.getElementById("Label").value;

  if (isNaN(Amount) || Amount <= 0 || !Label) {
    alert("Please enter a valid amount and label.");
    return;
  }

  TotalOfExpense += Amount;
  updateTotalDisplay();

  let ObjectOfExpense = { label: Label, amount: Amount };
  ArrayOfExpense.push(ObjectOfExpense);
  localStorage.setItem("expense", JSON.stringify(ArrayOfExpense));
  Render();
}

function Render() {
  document.getElementById("TableBody").innerHTML = ArrayOfExpense.map(
    (item, index) => {
      return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.label}</td>
                        <td>${item.amount}</td>
                        <td><button class="edit" onclick="Edit(${index})">Edit</button></td>
                        <td><button class="delete" onclick="Delete(${index})">Delete</button></td>
                    </tr>
                `;
    }
  ).join("");
}

function Delete(index) {
  TotalOfExpense -= ArrayOfExpense[index].amount;
  ArrayOfExpense.splice(index, 1);
  localStorage.setItem("expense", JSON.stringify(ArrayOfExpense));
  updateTotalDisplay();
  Render();
}

function toggleTheme() {
  const body = document.body;
  const main = document.getElementById("main");
  const toggleButton = document.getElementById("themeToggle");
  const inputs = document.querySelectorAll("input");
  const table = document.querySelector("table");

  body.classList.toggle("dark-mode");
  main.classList.toggle("dark-mode");
  table.classList.toggle("dark-mode");
  inputs.forEach((input) => input.classList.toggle("dark-mode"));

  if (body.classList.contains("dark-mode")) {
    toggleButton.innerText = "Light Theme";
    toggleButton.classList.add("dark-mode");
  } else {
    toggleButton.innerText = "Dark Theme";
    toggleButton.classList.remove("dark-mode");
  }
}

window.onload = () => {
  updateTotalDisplay();
  Render();
};

// Placeholder for Edit function (if needed)
function Edit(index) {
  let newLabel = prompt("Edit label:", ArrayOfExpense[index].label);
  let newAmount = prompt("Edit amount:", ArrayOfExpense[index].amount);

  newAmount = parseInt(newAmount);

  if (newLabel && !isNaN(newAmount) && newAmount > 0) {
    TotalOfExpense -= ArrayOfExpense[index].amount;
    ArrayOfExpense[index].label = newLabel;
    ArrayOfExpense[index].amount = newAmount;
    TotalOfExpense += newAmount;

    localStorage.setItem("expense", JSON.stringify(ArrayOfExpense));
    updateTotalDisplay();
    Render();
  } else {
    alert("Invalid input for edit.");
  }
}
