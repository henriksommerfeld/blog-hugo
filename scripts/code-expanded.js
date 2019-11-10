"use strict";

import $ from "jquery";

export default class CodeExpanded {
  constructor() {
    console.log("%c 👨‍💻 Code expanded module loaded", "font-size:1.5em");

    if (
      window.screen.availWidth < 1024 ||
      (window.matchMedia && window.matchMedia("print").matches)
    )
      return;

    this.addExpander();
    this.addExpanderOpenEvent();
    this.addExpanderCloseEvent();
    this.addCloseOnEscEvent();
  }

  addExpander() {
    $(".highlight").each(function () {
      const expanderMarkup =
        '<div class="code-expanded-controls"><a title="Expand" aria-expanded="false" href="javascript:void(\'Expand/collapse code view\')"><i class="fa fa-expand"></i></a></div>';
      const highlightElement = $(this);
      const codeElement = highlightElement.find("code:first");
      codeElement.attr("tabindex", 0);
      const code = codeElement.text();
      const lines = code.split("\n");

      if (lines.length > 4) {
        highlightElement.prepend(expanderMarkup);
        highlightElement
          .find("pre")
          .css("margin-top", "-54px")
          .css("padding-right", "60px");
      }
    });
  }

  addExpanderOpenEvent() {
    $("#content").on("click", ".code-expanded-controls a", evt => {
      const scrollTop = $(window).scrollTop();
      const codeToExpand = $(evt.target).closest(".highlight");
      const topOffset = $(codeToExpand).offset().top + ($(codeToExpand).outerHeight() / 2) - scrollTop;
      const leftOffset = $(codeToExpand).offset().left + ($(codeToExpand).outerWidth() / 2);
      const clonedElement = codeToExpand.clone();

      clonedElement
        .find(".fa-expand")
        .addClass("fa-compress")
        .removeClass("fa.expand");
      clonedElement
        .find("a")
        .attr("aria-expanded", true)
        .attr("title", "Close (Esc)");
      $('body').addClass('modal-open');
      $("#code-placeholder").html(clonedElement);
      $("#code-placeholder code:first").focus();
      $("#code-container-inner").css('transform-origin', leftOffset + 'px ' + topOffset + 'px');
      $("#code-container, #code-container-inner")
        .removeClass("close")
        .addClass("open");
    });
  }

  addExpanderCloseEvent() {
    $("#code-container").on("click", ".code-expanded-controls a", evt => {
      this.closeExpandedView();
    });
  }

  addCloseOnEscEvent() {
    $(document).keyup(e => {
      if (
        e.key === 'Escape' &&
        $("#code-container").hasClass("open")
      ) {
        this.closeExpandedView();
      }
    });
  }

  closeExpandedView() {
    $("#code-container, #code-container-inner")
      .removeClass("open")
      .addClass("close");
    $('body').removeClass('modal-open');
  }
}
