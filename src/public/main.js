import $ from "jquery";

/*
图片放大
 */
let tableImgHtml =
  '<div class="tableImg-look">' +
  '<img src="" alt="" class="tableImg-look-img">' +
  "</div>";

$("#app")
  .on("mouseenter", ".fun-hover-img", function() {
    let othis = $(this);
    let src = othis.attr("data-src");

    if (src) {
      $("body").append(tableImgHtml);

      let box = $(".tableImg-look");
      let imgBox = $(".tableImg-look-img");
      let winHeight = $(window).height();
      let winWidth = $(window).width();
      let winScrollTop = $(window).scrollTop();
      let top = othis.offset().top - winScrollTop + othis.innerHeight();
      let left = othis.offset().left + othis.innerWidth();

      imgBox[0].onload = function() {
        let boxHeight = box.innerHeight();
        let boxWidth = box.innerWidth();

        if (top + boxHeight > winHeight) {
          top = winHeight - boxHeight;
        }
        if (left + boxWidth > winWidth) {
          left = 0;
        }

        box.css({
          top: top + "px",
          left: left + "px"
        });
        box.addClass("on");
      };
      imgBox[0].src = src;
    }
  })
  .on("mouseleave", ".fun-hover-img", function() {
    $(".tableImg-look").remove();
  });
