// This array keeps every loot item between button clicks.
let lootItems = [];

// Get the page elements that the program needs to read or update.
let lootNameInput = document.getElementById("loot-name");
let lootValueInput = document.getElementById("loot-value");
let lootForm = document.getElementById("loot-form");
let lootList = document.getElementById("loot-list");
let totalValueDisplay = document.getElementById("total-value");
let validationMessage = document.getElementById("validation-message");

// Run this code whenever the user submits the Add Loot form.
lootForm.addEventListener("submit", function(event) {
    // Keep the browser from refreshing the page when the form is submitted.
    event.preventDefault();

    // Read the current values from the form.
    let name = lootNameInput.value.trim();
    let value = Number(lootValueInput.value);

    // Check the name before adding anything to the array.
    if (name === "") {
        validationMessage.textContent = "Please enter a loot item name.";
        lootNameInput.focus();
        return;
    }

    // Check that a value was entered and that it is a valid number.
    if (lootValueInput.value.trim() === "" || isNaN(value)) {
        validationMessage.textContent = "Please enter a valid number for the loot value.";
        lootValueInput.focus();
        return;
    }

    // Loot values cannot be negative.
    if (value < 0) {
        validationMessage.textContent = "Loot value cannot be negative.";
        lootValueInput.focus();
        return;
    }

    // The input is valid, so clear any previous validation message.
    validationMessage.textContent = "";

    // Create an object and store it in the array.
    let lootItem = {
        name: name,
        value: value
    };
    lootItems.push(lootItem);

    // Clear the old list before drawing the updated list.
    lootList.innerHTML = "";

    // Add each item from the array to the page.
    for (let i = 0; i < lootItems.length; i++) {
        let listItem = document.createElement("li");
        listItem.textContent = lootItems[i].name + " - " + lootItems[i].value;
        lootList.appendChild(listItem);
    }

    // Calculate the total by adding each item's value.
    let total = 0;
    for (let i = 0; i < lootItems.length; i++) {
        total = total + lootItems[i].value;
    }

    // Show the new total on the page.
    totalValueDisplay.textContent = total;

    // Clear the form fields so another item can be entered.
    lootForm.reset();
    lootNameInput.focus();
});

/*
Debugging reflection:
When I paused at the breakpoint inside the submit event handler, the lootItems
array contained the items that had already been added. After a valid item was
created and pushed into the array, the array's state changed immediately.
The screen did not update at the moment the array changed. It updated later,
when the rendering loop changed the loot list in the DOM and the total was
written to the total-value element. Invalid input returned before the array
was changed.
*/
