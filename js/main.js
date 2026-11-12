const wa = (m) => `https://wa.me/${CFG.wa}?text=${encodeURIComponent(m + CFG.suffix)}`;
function hook(a, label) {
  a.href = wa(a.dataset.g);
  a.target = "_blank";
  a.rel = "noopener";
  a.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "wa_click",
      item: label || a.dataset.g.slice(0, 60),
    }); /* gtag('event','conversion',{send_to:'AW-XXXXXXXXX/LABEL'}); */
  });
}
document.querySelectorAll("a.wa[data-g]").forEach((a) => hook(a));
document.querySelectorAll("[data-yt]").forEach((a) => {
  if (CFG.yt) {
    a.href = CFG.yt;
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.classList.add("soon");
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.title = "Segera hadir";
  }
});
document.querySelectorAll("a[data-dl]").forEach((a) =>
  a.addEventListener("click", () => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "download_click", item: a.dataset.dl });
  }),
);
const mbtn = document.getElementById("mbtn"),
  nav = document.getElementById("nav");
if (mbtn) {
  mbtn.onclick = () => {
    const o = nav.classList.toggle("open");
    mbtn.setAttribute("aria-expanded", o);
    mbtn.setAttribute("aria-label", o ? "Close menu" : "Open menu");
  };
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) nav.classList.remove("open");
  });
}
document.querySelectorAll("[data-tel]").forEach((a) => (a.href = "tel:" + CFG.tel));
document.querySelectorAll("[data-ig]").forEach((a) => {
  a.href = CFG.ig;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-mail]").forEach((a) => {
  if (CFG.email) {
    a.href = "mailto:" + CFG.email;
    a.textContent = CFG.email;
  } else a.textContent = "sales@insightfitness.idn";
});
document.querySelectorAll("[data-maps]").forEach((a) => {
  a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CFG.mapQuery);
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll(".yr").forEach((e) => (e.textContent = new Date().getFullYear()));
const cats = document.getElementById("cats");
if (cats)
  cats.innerHTML = CATS.map(
    (c) =>
      `<a class="cat wa" data-g="${c.g}"><img loading="lazy" src="assets/kategori/${c.img}" alt="${c.n}"><span>${c.n}</span></a>`,
  ).join("");
const pr = document.getElementById("promos");
function draw(f) {
  pr.innerHTML = PROMOS.filter((p) => f === "all" || p.type === f)
    .map(
      (p) =>
        `<article class="card"><div class="ph"><span class="tag">${p.tag}</span><img loading="lazy" src="assets/promo/${p.img}" alt="${p.n}"></div><div class="b"><h3>${p.n}</h3><small>${p.sub}</small><div class="pr"><b>${p.price}</b></div><a class="btn b-y wa" data-g="${p.g}">Ask Sales</a></div></article>`,
    )
    .join("");
  pr.querySelectorAll("a.wa").forEach((a) => hook(a));
}
if (pr) {
  draw("all");
  document.getElementById("chips").onclick = (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document
      .querySelectorAll("#chips button")
      .forEach((b) => b.classList.toggle("on", b === e.target));
    draw(e.target.dataset.f);
  };
}
if (cats) cats.querySelectorAll("a.wa").forEach((a) => hook(a));
const fab = document.querySelector(".fab");
if (fab)
  addEventListener("scroll", () => fab.classList.toggle("s", scrollY > 400), { passive: true });
const mb = document.getElementById("mapbtn");
if (mb)
  mb.onclick = () => {
    const f = document.createElement("iframe");
    f.title = "Showroom location";
    f.loading = "lazy";
    f.src = "https://maps.google.com/maps?q=" + encodeURIComponent(CFG.mapQuery) + "&output=embed";
    mb.parentNode.replaceChildren(f);
  };

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
} else document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));

/* counting angka statistik */
(function () {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = (el) => {
    const to = +el.dataset.count,
      suf = el.dataset.suf || "",
      t0 = performance.now(),
      dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur),
        e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (reduce || !("IntersectionObserver" in window)) return;
  els.forEach((el) => (el.textContent = "0" + (el.dataset.suf || "")));
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
})();
