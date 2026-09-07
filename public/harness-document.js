const links = [...document.querySelectorAll(".doc-toc a")];
const sections = [...document.querySelectorAll(".document-body > section")];
const mobileToc = document.querySelector(".mobile-toc");
let frame = 0;

function updateCurrentSection() {
  frame = 0;
  let current = "";
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 200) current = section.id;
  }
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 4
  ) {
    current = sections.at(-1)?.id;
  }
  for (const link of links) {
    if (link.hash === `#${current}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateCurrentSection);
}

for (const link of links) {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.hash.slice(1));
    mobileToc.open = false;
    target?.focus({ preventScroll: true });
  });
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
scheduleUpdate();
