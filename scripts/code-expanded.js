"use strict";

export default class CodeExpanded {
  constructor() {
    const hasCode = document.querySelector('#code-container');
        if (!hasCode) return;

    console.log("%c 👨‍💻 Code expanded module loaded", "font-size:1.5em");

    if (
      window.screen.availWidth < 1024 ||
      (window.matchMedia && window.matchMedia("print").matches)
    )
      return;

    this.addExpander();
    this.addExpanderOpenEvent();
    this.addCloseOnEscEvent();
  }

  addExpander() {
    document.querySelectorAll(".highlight").forEach(highlightElement => {
      const expanderMarkup = document.createElement('div');
      expanderMarkup.setAttribute('class', 'code-expanded-controls');
      expanderMarkup.innerHTML = 
        '<a title="Expand" aria-expanded="false" href="javascript:void(\'Expand/collapse code view\')"><svg class="icon icon-expand"><use xlink:href="#icon-expand"></use></svg></a>';
      const codeElement = highlightElement.querySelector("code");
      codeElement.setAttribute("tabindex", 0);
      const code = codeElement.textContent;
      const lines = code.split("\n");

      if (lines.length > 4) {
        highlightElement.prepend(expanderMarkup);
        highlightElement
          .querySelector("pre")
          .style.cssText = "margin-top: -54px; padding-right: 60px";
      }
    });
  }

  addExpanderOpenEvent() {
    const expanders = document.querySelectorAll("#content .code-expanded-controls a");
    expanders.forEach(expander => {
      expander.addEventListener("click", evt => {
        const codeToExpand = evt.target.closest(".highlight");
        const topOffset = codeToExpand.offsetTop + (codeToExpand.clientHeight / 2) - window.pageYOffset;
        const leftOffset = codeToExpand.offsetLeft + (codeToExpand.clientWidth / 2);
        const clonedElement = codeToExpand.cloneNode(true);
  
        const expander = clonedElement.querySelector(".icon-expand");
        expander.innerHTML = `<svg class="icon icon-collapse"><use xlink:href="#icon-collapse"></use></svg>`;

        const anchor = clonedElement.querySelector("a");
        anchor.setAttribute("aria-expanded", true);
        anchor.setAttribute("title", "Close (Esc)");
        anchor.addEventListener("click", this.closeExpandedView);
        document.querySelector('body').classList.add('modal-open');
        const codePlaceholder = document.getElementById("code-placeholder");
        codePlaceholder.innerHTML = "";
        codePlaceholder.appendChild(clonedElement);
        codePlaceholder.querySelector('code').focus();
        const codeContainerInner = document.getElementById("code-container-inner");
        codeContainerInner.style.cssText = `transform-origin: ${leftOffset}px ${topOffset}px`;
        document.querySelectorAll("#code-container, #code-container-inner").forEach(element => {
          element.classList.remove("close");
          element.classList.add("open");
        });
      });
    });    
  }

  addCloseOnEscEvent() {
    document.addEventListener("keyup", e => {
      if (
        e.key === 'Escape' && document.getElementById("code-container").classList.contains("open")
      ) {
        this.closeExpandedView();
      }
    });
  }

  closeExpandedView() {
    document.querySelectorAll("#code-container, #code-container-inner").forEach(element => {
      element.classList.remove("open");
      element.classList.add("close");
    });

    document.querySelector('body').classList.remove("modal-open");
  }
}
