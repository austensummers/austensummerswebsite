
/*function updateFinalCost() {
  const baseCost = parseInt(
    $("#immersion-length-select input:checked").prop("dataset")["cost"]
  );
  const selectedAddonCards = $(".addon-card").filter(function (i, e) {
    return $(e).css("background-color") === "rgb(255, 204, 102)";
  });
  const cardTitleElementsOfSelectedAddons = selectedAddonCards
    .children()
    .children(".card-title");
  const selectedAddonCosts = cardTitleElementsOfSelectedAddons
    .map(function (i, e) {
      return parseInt($(e).prop("dataset")["cost"]);
    })
    .toArray();
  const addonSubtotal = selectedAddonCosts.reduce(function (a, b) {
    return a + b;
  }, 0);
  const finalCost = baseCost + addonSubtotal;
  const finalCostString = "$" + finalCost.toLocaleString("en-US");
  $("#final-cost").text(finalCostString);
}

function updateInputStyling(chosenInput) {
  $("#immersion-length-select label").css("background-color", "");
  $("#immersion-length-select label").css("border-color", "");
  $(chosenInput).parent().css("background-color", "#ffcc66");
  $(chosenInput).parent().css("border-color", "#ffcc66");
}

$(document).ready(function () {
  $(".addon-card").on("click", function () {
    // css value is returned in rgb format, not in input format
    if ($(this).css("background-color") === "rgb(255, 204, 102)") {
      $(this).css("background-color", "");
      $(this).css("border-color", "");
    } else {
      $(this).css("background-color", "#ffcc66");
      $(this).css("border-color", "#ffcc66");
    }
    updateFinalCost();
  });

  $("#immersion-length-select input").change(function () {
    updateInputStyling(this);
    updateFinalCost();
  });

  $("#immersion-length-select input").first().attr("checked", true);
  updateInputStyling($("#immersion-length-select input")[0]);
  updateFinalCost();
});

*/

$(document).ready(function () {

  $(".addon-card.3d-immersion").on("click", function () {
    if($(this).hasClass("addon-selected")) {
      $(this).removeClass("addon-selected");
      let currentPrice = parseInt($("#final-cost-3d").text().replace("$","").replace(",","").trim());
      currentPrice -= $(this).data("cost");
      $("#final-cost-3d").text("$" + currentPrice.toLocaleString("en-US"));
    }
    else {
      $(this).addClass("addon-selected");
      let currentPrice = parseInt($("#final-cost-3d").text().replace("$","").replace(",","").trim());
      currentPrice += $(this).data("cost");
      $("#final-cost-3d").text("$" + currentPrice.toLocaleString("en-US"));
    }
  })

  $(".addon-card.7d-immersion").on("click", function () {
    if($(this).hasClass("addon-selected")) {
      $(this).removeClass("addon-selected");
      let currentPrice = parseInt($("#final-cost-7d").text().replace("$","").replace(",","").trim());
      currentPrice -= $(this).data("cost");
      $("#final-cost-7d").text("$" + currentPrice.toLocaleString("en-US"));
    }
    else {
      $(this).addClass("addon-selected");
      let currentPrice = parseInt($("#final-cost-7d").text().replace("$","").replace(",","").trim());
      currentPrice += $(this).data("cost");
      $("#final-cost-7d").text("$" + currentPrice.toLocaleString("en-US"));
    }
  })

  

  

});