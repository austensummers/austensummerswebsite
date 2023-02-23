$(document).ready(function () {
    var stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

    $("#pay-custom").click(function () {
      const inputPrice = Math.ceil($("#stripe-input-price").val() * 1.03);
      $("#stripe-input-price").val(inputPrice + " with %3 fee");
      if (!isNaN(inputPrice) && Number(inputPrice) > 0 && Number(inputPrice) <= 999999) {
	      $(this).text("Redirecting...").prop("disabled", true);
	      const inputPriceData = {
	        price: inputPrice,
	      };
	      fetch("/bill/custom", {
	        method: "POST",
	        body: JSON.stringify(inputPriceData),
	        headers: {
	          'Content-Type': 'application/json'
	        },
	      })
	        .then(function (response) {
	          return response.json();
	        })
	        .then(function (session) {
	          return stripe.redirectToCheckout({ sessionId: session.id });
	        })
	        .then(function (result) {
	          if (result.error) {
	            alert(result.error.message);
	          }
	        })
	        .catch(function (error) {
            //There is an error with stripe session, let's reload the page
            location.reload();
	        });
    	} else {
        $("#stripe-input-price").val("");
    		alert("Please enter a valid price.");
    	}
    });
      
      $("#pay-bootcamp").click(function() {
          $(this).text("Redirecting...").prop("disabled", true);
          fetch("/bill/bootcamp", {
            method: "POST",
          })
          .then(function (response) {
            return response.json();
          })
          .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
          })
          .then(function (result) {
            if (result.error) {
              alert(result.error.message);
            }
          })
          .catch(function (error) {
            console.error("Error:", error);
          });
      });

      $("#pay-immersion").click(function() {
      $(this).text("Redirecting...").prop("disabled", true);
        fetch("/bill/immersion", {
          method: "POST",
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
      });

      $("#pay-mentorship").click(function() {
      $(this).text("Redirecting...").prop("disabled", true);
      fetch("/bill/mentorship", {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
      });

    


});
