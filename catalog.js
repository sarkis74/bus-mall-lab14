/* global Product, Cart */

'use strict';
// Set up an empty cart for use on this page.
var cart = new Cart([]);
// Array for adding up quantities
var cartSum = [];
// Set up localStorage
localStorage.setItem('items', JSON.stringify(cart.items));
var data = JSON.parse(localStorage.getItem('items'));
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var newOption = document.createElement('option');
    document.getElementsByTagName('option').value = Product.allProducts[i].name;
    newOption.value = Product.allProducts[i].name;
    var optionText = document.createTextNode(Product.allProducts[i].name);
    newOption.appendChild(optionText);
    selectElement.appendChild(newOption);
    
  }

}


// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.

function handleSubmit(event) {

  
  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
// TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
function addSelectedItemToCart() {
  var selectProduct = document.getElementById('items').value;
  var selectQuantity = document.getElementById('quantity').value;
  cartSum.push(selectQuantity);
  console.log(cartSum);
  var currentItem = new CartItem(selectProduct, selectQuantity);
  var newItem = currentItem.product + " " + currentItem.quantity;
  cart.items.push(newItem); //this is the array inside the object declared above
  
  updateCounter();
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
// TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information

function updateCounter() {
  var cartCounter = 0;
  var update = document.getElementById('itemCount'); //itemCountis the span element inside the list item
  for(var i in cartSum) {
    if(cartSum.length !== 0) {
      cartCounter += parseInt(cartSum[i]);
    }
  }
  update.textContent = " " + cartCounter; //cart array has only quantities
}
var tableEl = document.getElementById('cartContents');
function updateCartPreview() {
  for(var i in cart.items) {
    var tabRowEl = document.createElement('tr');
    var tabHeadEl = document.createElement('th');
    tabHeadEl.textContent = cart.items[i];
    tabRowEl.appendChild(tabHeadEl);
  }
  tableEl.appendChild(tabRowEl);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
