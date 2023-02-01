$(document).ready(function () {
  //Give them a height and opacity of zero initially, then hide.
  $(".faq-content").each((i, x) => {
    let content = $(x);
    content.height(0);
    content.css("opacity", 0);
    content.hide();
  });

  //When FAQ Buttons are clicked
  $(document).on("click", ".faq-btn", function () {
    $(this).children().find(".faq-icon").toggleClass("show");
    let content = $(this).parent().find(".faq-content");

    if (content.hasClass("show")) {
      //Already visible, let's hide it
      content.animate({ height: 0, opacity: 0 }, 250, function () {
        content.hide();
      });
    } else {
      //Already hidden, lets show it
      content.show();
      //Unfortunately jQuery does not allow animating height to auto
      //So this is a little trick to calculate auto height
      let tempHeight = content.height();
      let autoHeight = content.css("height", "auto").height();
      content.height(tempHeight);
      //Now we can animate height to auto
      content.animate({ height: autoHeight, opacity: 1 }, 250, function () {});
    }
    //Let's toggle show class to remember
    content.toggleClass("show");
  });
});
