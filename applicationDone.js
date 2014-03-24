// Write our base functions
function showProduct(productId) {

  var product = Robots[productId];

  $(".overlay").fadeIn();
  $("#detail-title").text(product.title);
  $("#detail-image").attr("src",product.image);
  $("#detail-description").text(product.description);
  $("#detail-price").text("$" + product.price);

  $(".details").show();

  $("#add-to-cart").click(function() {
    var quantity = $("#detail-quantity").val();
    addToCart(productId,quantity);
    hideProduct();
  });
}

function hideProduct() {
  $(".overlay").fadeOut();
  $(".details").hide();

  $("#add-to-cart").off("click");
}

var Cart = {};

function addToCart(productId, quantity) {
  Cart[productId] = Cart[productId] || 0;
  Cart[productId] += parseInt(quantity);
  totalCart();
}

function totalCart() {
  var items = 0;
  var total = 0;

  for(var productId in Cart) {
    var product = Robots[productId]

    var unitPrice = product.price;
    var quantity = Cart[productId];

    items += quantity;
    total += unitPrice * quantity;
  }

  if(items > 0) {
    $("#cart").text(items + " items: $" + total.toFixed(2));
  } else {
    $("#cart").text("Cart Empty");
  }
}


// When the page loads, add in our event handlers
$(function() {

  $(".overlay").click(function() { hideProduct(); });

  $(".product").click(function() {
    var productId = $(this).data("product-id");
    showProduct(productId);
  });

});
