/* ==========================================================================
   Birchline Studio — Site Script
   No dependencies. Progressive enhancement over plain HTML.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  //var toggle = document.querySelector(".nav-toggle");
  //var panel = document.querySelector(".nav-panel");
  //if (toggle && panel) {
  //  toggle.addEventListener("click", function () {
  //    var open = panel.classList.toggle("open");
  //    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  //  });
  //  panel.querySelectorAll("a").forEach(function (link) {
  //    link.addEventListener("click", function () {
  //      panel.classList.remove("open");
  //      toggle.setAttribute("aria-expanded", "false");
  //    });
  //  });
  //}
	const toggle = document.querySelector('.nav-toggle');
	const panel = document.getElementById('nav-panel');
	const nav = document.querySelector('.nav');
	const navLinks = document.getElementById('nav-links');
	const langSwitch = document.getElementById('lang-switch');

	toggle.addEventListener('click', () => {
	  const isOpen = panel.classList.toggle('open');
	  toggle.setAttribute('aria-expanded', isOpen);

	  if (isOpen) {
		panel.appendChild(navLinks);
		panel.appendChild(langSwitch);
	  } else {
		nav.insertBefore(navLinks, toggle.nextSibling);
		nav.appendChild(langSwitch);
	  }
	});

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Portfolio image loading ---------- */
  const portfolioItems = [
	/* categorys:
			lasercut
			laserengrave
			svg
			dxf
			3dprint
			kidsbook
			other
	*/
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Photo frame",
      description: "with personalized text.",
      img: "../assets/img/1.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Wooden treasure box",
      description: "",
      img: "../assets/img/2.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Robot - piggy bank",
      description: "",
      img: "../assets/img/3.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cutting board",
      description: "with a wish and an engraved image.",
      img: "../assets/img/4.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Photo frame",
      description: "with a wish.",
      img: "../assets/img/5.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Medal holder/stand",
      description: "with personalized text.",
      img: "../assets/img/6.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Tree of hearts",
      description: "with personalized texts.",
      img: "../assets/img/7.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Medal holder/stand",
      description: "with personalized text.",
      img: "../assets/img/8.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cutting board",
      description: "with a wish and an engraved image.",
      img: "../assets/img/9.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Bottle box",
      description: "with personalized text.",
      img: "../assets/img/10.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Photo album",
      description: "with personalized text.",
      img: "../assets/img/11.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Photo album",
      description: "with personalized text.",
      img: "../assets/img/12.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Wooden tasklist",
      description: "with personalized tasks.",
      img: "../assets/img/13.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Money box with list of amounts",
      description: "with a wish and a personalized text.",
      img: "../assets/img/14.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cutting board",
      description: "with a wish and an engraved image.",
      img: "../assets/img/15.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Coin game",
      description: "- dice game for young and old.",
      img: "../assets/img/16.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "3dprint",
      catLabel: "3D Print",
      title: "Night lamp",
      description: "with a favorite character.",
      img: "../assets/img/17.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "3dprint",
      catLabel: "3D Print",
      title: "Clothes hanger",
      description: "with a favorite character.",
      img: "../assets/img/18.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/19.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/20.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/21.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/22.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/23.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/24.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/25.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/26.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/27.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/28.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/29.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/30.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Cup Coaster",
      description: "",
      img: "../assets/img/31.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Wooden Flower",
      description: "with a wish.",
      img: "../assets/img/32.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Engraving on canvas",
      description: "",
      img: "../assets/img/33.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Engraving on canvas",
      description: "",
      img: "../assets/img/34.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "laserengrave",
      catLabel: "Laser-engrave",
      title: "Engraving on canvas",
      description: "",
      img: "../assets/img/35.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Medal holder/stand",
      description: "with personalized text.",
      img: "../assets/img/36.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Christmas tree",
      description: "with personalized text.",
      img: "../assets/img/37.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Bookmark",
      description: "with personalized text.",
      img: "../assets/img/38.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Bookmark",
      description: "with personalized text.",
      img: "../assets/img/39.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Photo frame",
      description: "with personalized text.",
      img: "../assets/img/40.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Photo frame",
      description: "with personalized text.",
      img: "../assets/img/41.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Bookmark",
      description: "",
      img: "../assets/img/42.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Christmas ornament",
      description: "- wolf.",
      img: "../assets/img/43.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Perpetual calendar",
      description: "- with pencil slots.",
      img: "../assets/img/44.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Photo album",
      description: "for newborn.",
      img: "../assets/img/45.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Photo frame",
      description: "",
      img: "../assets/img/46.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Christmas ornament",
      description: "- letter.",
      img: "../assets/img/47.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Christmas ornament",
      description: "- hat.",
      img: "../assets/img/48.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Christmas ornament",
      description: "- dwarf.",
      img: "../assets/img/49.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Bookmark",
      description: "with engraved image on it.",
      img: "../assets/img/50.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Bookmark",
      description: "with engraved image on it.",
      img: "../assets/img/51.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut",
      catLabel: "SVG | DXF | Laser-cut",
      title: "Easter Egg Holder",
      description: "",
      img: "../assets/img/52.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Easter Egg Holder",
      description: "",
      img: "../assets/img/53.jpg",
      alt: "Image loading  failed..."
    },
    {
      category: "svg dxf lasercut laserengrave",
      catLabel: "SVG | DXF | Laser-cut | Laser-engrave",
      title: "Easter Egg Holder",
      description: "",
      img: "../assets/img/54.jpg",
      alt: "Image loading  failed..."
    },
    // ...new elements here
  ];

  const PAGE_SIZE = 6;
  let visibleCount = PAGE_SIZE;
  let activeFilter = "all";

  const grid = document.getElementById("portfolio-grid");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function createCard(item) {
    const article = document.createElement("article");
    article.className = "card reveal";
    article.dataset.category = item.category;
    article.dataset.description = item.description;

    article.innerHTML = `
      <div class="card-media">
        <img src="${item.img}" data-full="${item.img}" alt="${item.alt}" loading="lazy" width="400" height="300">
      </div>
      <div class="card-body">
        <span class="card-cat">${item.catLabel}</span>
        <h3 class="card-title">${item.title}</h3>
      </div>
    `;
    return article;
  }

  function render() {
    const filtered = activeFilter === "all"
      ? portfolioItems
      //: portfolioItems.filter(i => i.category === activeFilter);
      : portfolioItems.filter(i => i.category.includes(activeFilter));

    const toShow = filtered.slice(0, visibleCount);

    grid.innerHTML = "";
    toShow.forEach(item => grid.appendChild(createCard(item)));

    // покажи/скрий бутона в зависимост дали има още елементи
    loadMoreBtn.style.display = visibleCount < filtered.length ? "inline-flex" : "none";

    initReveal();       // "включва" анимацията за новите карти
    initLightboxCards(); // ако имаш lightbox логика, свързана с .card — виж бележката долу
  }

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    render();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      activeFilter = btn.dataset.filter;
      visibleCount = PAGE_SIZE; // рестартираме пагинацията при смяна на филтъра
      render();
    });
  });

  // проста reveal-анимация чрез IntersectionObserver
  function initReveal() {
    const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }

  // placeholder — свържи с твоята съществуваща lightbox логика, ако има такава
  function initLightboxCards() {
	  
	  /* ---------- Portfolio filtering ---------- */
	  //var filterBar = document.querySelector(".filter-bar");
	  var cards = document.querySelectorAll(".card");
	  //if (filterBar && cards.length) {
		//filterBar.addEventListener("click", function (e) {
		//  var btn = e.target.closest(".filter-btn");
		//  if (!btn) return;
		//  filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
		//	b.setAttribute("aria-pressed", "false");
		//  });
		//  btn.setAttribute("aria-pressed", "true");
		//  var category = btn.dataset.filter;
		//  cards.forEach(function (card) {
		//	var match = category === "all" || card.dataset.category === category;
		//	card.style.display = match ? "" : "none";
		//  });
		//});
	  //}

	  /* ---------- Lightbox ---------- */
	  var lightbox = document.querySelector(".lightbox");
	  if (lightbox && cards.length) {
		var lbImg = lightbox.querySelector("img");
		var lbCat = lightbox.querySelector(".lightbox-caption .card-cat");
		var lbTitle = lightbox.querySelector(".lightbox-caption h3");
		var lbDesc = lightbox.querySelector(".lightbox-caption p");
		var closeBtn = lightbox.querySelector(".lightbox-close");
		var prevBtn = lightbox.querySelector(".lightbox-prev");
		var nextBtn = lightbox.querySelector(".lightbox-next");
		var cardList = Array.prototype.slice.call(cards);
		var currentIndex = 0;
		var lastFocused = null;

		function openLightbox(index) {
		  currentIndex = index;
		  var card = cardList[currentIndex];
		  var img = card.querySelector("img");
		  lbImg.src = img.getAttribute("data-full") || img.src;
		  lbImg.alt = img.alt;
		  lbCat.textContent = card.querySelector(".card-cat").textContent;
		  lbTitle.textContent = card.querySelector(".card-title").textContent;
		  lbDesc.textContent = card.dataset.description || "";
		  lastFocused = document.activeElement;
		  lightbox.classList.add("open");
		  lightbox.setAttribute("aria-hidden", "false");
		  closeBtn.focus();
		  document.body.style.overflow = "hidden";
		}

		function closeLightbox() {
		  lightbox.classList.remove("open");
		  lightbox.setAttribute("aria-hidden", "true");
		  document.body.style.overflow = "";
		  if (lastFocused) lastFocused.focus();
		}

		function step(dir) {
		  var visible = cardList.filter(function (c) { return c.style.display !== "none"; });
		  var pos = visible.indexOf(cardList[currentIndex]);
		  if (pos === -1) pos = 0;
		  var next = (pos + dir + visible.length) % visible.length;
		  openLightbox(cardList.indexOf(visible[next]));
		}

		cardList.forEach(function (card, i) {
		  card.setAttribute("tabindex", "0");
		  card.setAttribute("role", "button");
		  card.addEventListener("click", function () { openLightbox(i); });
		  card.addEventListener("keydown", function (e) {
			if (e.key === "Enter" || e.key === " ") {
			  e.preventDefault();
			  openLightbox(i);
			}
		  });
		});

		closeBtn.addEventListener("click", closeLightbox);
		prevBtn.addEventListener("click", function () { step(-1); });
		nextBtn.addEventListener("click", function () { step(1); });
		lightbox.addEventListener("click", function (e) {
		  if (e.target === lightbox) closeLightbox();
		});
		document.addEventListener("keydown", function (e) {
		  if (!lightbox.classList.contains("open")) return;
		  if (e.key === "Escape") closeLightbox();
		  if (e.key === "ArrowRight") step(1);
		  if (e.key === "ArrowLeft") step(-1);
		});
	  }
	  
  }

  render();
  
  
  
  

  /* ---------- Contact form (no backend: builds a mailto fallback) ---------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();
      var status = form.querySelector(".form-status");
      var to = form.dataset.email || "";

      if (!name || !email || !message) {
        status.textContent = form.dataset.msgIncomplete || "Please fill in every field.";
        return;
      }

      var subject = encodeURIComponent("Website inquiry from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      status.textContent = form.dataset.msgSent || "Opening your email client…";
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
