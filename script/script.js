 (function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var links = [].slice.call(document.querySelectorAll('.tabs a'));
    var reveals = [].slice.call(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (s) { s.classList.add('in'); });
      return;
    }
 
    /* Pestaña activa al bajar */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    links.forEach(function (a) {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t) io.observe(t);
    });
 
    /* Aparición de las secciones */
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        ro.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (s) {
      if (reduce) s.classList.add('in'); else ro.observe(s);
    });
  })();