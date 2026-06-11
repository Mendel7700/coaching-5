/* =========================================================================
   Dina Nejar — interactions
   Mouvement lent : reveal, lignes qui se dessinent, parallax léger,
   header compact, accordéons FAQ, formulaire de contact.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header compact on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-compact');
      else header.classList.remove('is-compact');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var scrim = document.querySelector('.nav-scrim');
  if (toggle && nav) {
    var setNav = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (scrim) scrim.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    if (scrim) scrim.addEventListener('click', function () { setNav(false); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- Reveal on scroll (slow) ---------- */
  var revealEls = [].slice.call(document.querySelectorAll('[data-reveal],[data-line]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // stagger sequential children (e.g. editorial phrases)
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var step = parseInt(group.getAttribute('data-stagger'), 10) || 140;
      [].slice.call(group.children).forEach(function (child, i) {
        if (child.hasAttribute('data-reveal')) {
          child.style.setProperty('--d', (i * step) + 'ms');
        }
      });
    });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Light parallax ---------- */
  var parallaxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduceMotion && parallaxEls.length) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        var scene = el.querySelector('.media__scene') || el;
        scene.style.transform = 'translate3d(0,' + (-offset).toFixed(2) + 'px,0) scale(1.08)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- FAQ accordions ---------- */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) {
        if (expanded) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    });
  });

  /* ---------- Contact form ----------
     Envoi réel via fetch vers l'endpoint défini dans l'attribut action
     (ex. Formspree). Si l'action contient encore "VOTRE_ID", l'endpoint
     n'est PAS configuré : le formulaire est bloqué (bouton désactivé,
     notice visible) et aucun message de succès ne peut s'afficher. */
  var form = document.querySelector('.form');
  if (form) {
    var success = form.querySelector('.form__success');
    var errorBox = form.querySelector('.form__error');
    var notice = form.querySelector('.form__notice');
    var submitBtn = form.querySelector('button[type="submit"]');
    var endpoint = form.getAttribute('action') || '';
    var isConfigured = endpoint.indexOf('http') === 0 && endpoint.indexOf('VOTRE_ID') === -1;

    if (!isConfigured) {
      /* Configuration manquante : envoi impossible, jamais de faux succès. */
      if (submitBtn) submitBtn.setAttribute('disabled', 'disabled');
      if (notice) notice.removeAttribute('hidden');
      form.addEventListener('submit', function (e) { e.preventDefault(); });
    } else {
      if (notice) notice.setAttribute('hidden', 'hidden');

      var setDisabled = function (disabled) {
        form.querySelectorAll('input,textarea,select,button').forEach(function (el) {
          if (disabled) el.setAttribute('disabled', 'disabled');
          else el.removeAttribute('disabled');
        });
      };
      var showSuccess = function () {
        setDisabled(true);
        if (errorBox) errorBox.classList.remove('is-visible');
        if (success) {
          success.classList.add('is-visible');
          success.setAttribute('tabindex', '-1');
          success.focus();
          success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
      };
      var showError = function () {
        setDisabled(false);
        if (errorBox) {
          errorBox.classList.add('is-visible');
          errorBox.setAttribute('tabindex', '-1');
          errorBox.focus();
        }
      };

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        setDisabled(true);
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (res) {
          /* Succès uniquement sur réponse HTTP réellement positive */
          if (res.ok) showSuccess();
          else showError();
        }).catch(showError);
      });
    }
  }

  /* ---------- Footer year ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
