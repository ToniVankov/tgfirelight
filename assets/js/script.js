/* ==========================================================================
   Birchline Studio — Site Script
   No dependencies. Progressive enhancement over plain HTML.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('nav-panel');
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('nav-links');
  const langSwitch = document.getElementById('lang-switch');

  if (toggle && panel && nav && navLinks && langSwitch) {
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
  }

  const lang = document.documentElement.lang || 'en';

  fetch(`tgfirelight/assets/data/portfolio-${lang}.json`)
	.then(r => r.json())
	.then(portfolioItems => {
		renderPortfolio(portfolioItems);
  });
  
  
  const PAGE_SIZE = 6;
  let visibleCount = PAGE_SIZE;
  let activeFilter = "all";

  const grid = document.getElementById("portfolio-grid");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  /* ---------- Scroll reveal: one observer, reused across renders ---------- */
  let revealObserver = null;
  function getRevealObserver() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    return revealObserver;
  }
  
  function observeReveals(root = document) {
    const observer = getRevealObserver();
  
    root.querySelectorAll(".reveal:not(.is-visible)")
        .forEach(el => observer.observe(el));
  };
  observeReveals();

  function renderPortfolio(portfolioItems) {
	  if (grid) {
		/* ---------- helpers ---------- */
		function escapeHtml(str) {
		  const div = document.createElement("div");
		  div.textContent = str == null ? "" : String(str);
		  return div.innerHTML;
		}

		function getFiltered() {
		  return activeFilter === "all"
			? portfolioItems
			: portfolioItems.filter(i => i.category.split(" ").includes(activeFilter));
		}

		function createCard(item) {
		  const article = document.createElement("article");
		  article.className = "card reveal";
		  article.dataset.category = item.category;
		  article.dataset.description = item.description;
		  article.setAttribute("tabindex", "0");
		  article.setAttribute("role", "button");

		  article.innerHTML = `
			<div class="card-media">
			  <img src="${escapeHtml(item.img)}" data-full="${escapeHtml(item.img)}" alt="${escapeHtml(item.alt)}" loading="lazy" width="400" height="300">
			</div>
			<div class="card-body">
			  <span class="card-cat">${escapeHtml(item.catLabel)}</span>
			  <h3 class="card-title">${escapeHtml(item.title)}</h3>
			</div>
		  `;
		  return article;
		}

		function appendItems(items) {
		  const frag = document.createDocumentFragment();
		  items.forEach(item => frag.appendChild(createCard(item)));
		  grid.appendChild(frag);
		  observeReveals(grid);
		}

		function updateLoadMoreVisibility(totalFiltered) {
		  if (loadMoreBtn) {
			loadMoreBtn.style.display = visibleCount < totalFiltered ? "inline-flex" : "none";
		  }
		}

		// Used on first render and whenever the filter changes: clears the grid.
		function renderReset() {
		  const filtered = getFiltered();
		  grid.innerHTML = "";
		  appendItems(filtered.slice(0, visibleCount));
		  updateLoadMoreVisibility(filtered.length);
		}

		// Used by "Load more": only appends the next page, keeps existing cards intact.
		function renderAppend() {
		  const filtered = getFiltered();
		  const prevCount = visibleCount - PAGE_SIZE;
		  appendItems(filtered.slice(prevCount, visibleCount));
		  updateLoadMoreVisibility(filtered.length);
		}

		if (loadMoreBtn) {
		  loadMoreBtn.addEventListener("click", () => {
			visibleCount += PAGE_SIZE;
			renderAppend();
		  });
		}

		filterButtons.forEach(btn => {
		  btn.addEventListener("click", () => {
			filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
			btn.setAttribute("aria-pressed", "true");
			activeFilter = btn.dataset.filter;
			visibleCount = PAGE_SIZE;
			renderReset();
		  });
		});

		/* ---------- Lightbox: listeners bound once, delegated on the grid ---------- */
		const lightbox = document.querySelector(".lightbox");
		if (lightbox) {
		  const lbImg = lightbox.querySelector("img");
		  const lbCat = lightbox.querySelector(".lightbox-caption .card-cat");
		  const lbTitle = lightbox.querySelector(".lightbox-caption h3");
		  const lbDesc = lightbox.querySelector(".lightbox-caption p");
		  const closeBtn = lightbox.querySelector(".lightbox-close");
		  const prevBtn = lightbox.querySelector(".lightbox-prev");
		  const nextBtn = lightbox.querySelector(".lightbox-next");
		  let currentCard = null;
		  let lastFocused = null;

		  function getVisibleCards() {
			return Array.prototype.slice.call(grid.querySelectorAll(".card"));
		  }

		  function openLightbox(card) {
			currentCard = card;
			const img = card.querySelector("img");
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
			currentCard = null;
			if (lastFocused) lastFocused.focus();
		  }

		  function step(dir) {
			const visible = getVisibleCards();
			let pos = visible.indexOf(currentCard);
			if (pos === -1) pos = 0;
			const next = (pos + dir + visible.length) % visible.length;
			openLightbox(visible[next]);
		  }

		  // Delegated listeners: work for cards that exist now AND cards added later
		  // by renderAppend(), with no need to rebind on every render.
		  grid.addEventListener("click", (e) => {
			const card = e.target.closest(".card");
			if (card) openLightbox(card);
		  });

		  grid.addEventListener("keydown", (e) => {
			const card = e.target.closest(".card");
			if (card && (e.key === "Enter" || e.key === " ")) {
			  e.preventDefault();
			  openLightbox(card);
			}
		  });

		  closeBtn.addEventListener("click", closeLightbox);
		  prevBtn.addEventListener("click", () => step(-1));
		  nextBtn.addEventListener("click", () => step(1));
		  lightbox.addEventListener("click", (e) => {
			if (e.target === lightbox) closeLightbox();
		  });
		  document.addEventListener("keydown", (e) => {
			if (!lightbox.classList.contains("open")) return;
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowRight") step(1);
			if (e.key === "ArrowLeft") step(-1);
		  });
		}

		renderReset();
	  }
  }

  /* ---------- Contact form (no backend: builds a mailto fallback) ---------- */
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameField = form.querySelector("#name");
      const emailField = form.querySelector("#email");
      const messageField = form.querySelector("#message");
      const status = form.querySelector(".form-status");
      const to = form.dataset.email || "";

      const name = nameField ? nameField.value.trim() : "";
      const email = emailField ? emailField.value.trim() : "";
      const message = messageField ? messageField.value.trim() : "";

      if (!name || !email || !message) {
        if (status) status.textContent = form.dataset.msgIncomplete || "Please fill in every field.";
        return;
      }

      const subject = encodeURIComponent("Website inquiry from " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      if (status) status.textContent = form.dataset.msgSent || "Opening your email client…";
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
