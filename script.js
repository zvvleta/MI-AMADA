const stanzas = [
  "Mi amada, eres como un girasol entre los campos, que aun rodeado de flores parece guardar una luz diferente.",
  "Tus ojos tienen la calma de un amanecer, y tu sonrisa, la dulzura de un pequeño pedazo de cielo.",
  "Me recuerdas a los girasoles porque buscas la luz, y yo deseo que nuestra historia siempre busque a Cristo, porque sé que todo amor verdadero debe florecer primero en Él.",
  "A veces miro al cielo y recuerdo las oraciones que alguna vez hice en silencio, cuando le pedía a Dios que, si era Su voluntad, pusiera en mi camino a alguien especial.",
  "Y entonces te miro a ti y entiendo algo que antes no comprendía: no llegaste por casualidad.",
  "Después de tanto esperar, de tanto pedirle a Dios y de aprender a confiar en Sus tiempos, fuiste tú, la respuesta a esa oración que tanto esperaba."
];

const poem = document.querySelector("#poem");
const signature = document.querySelector("#signature");
const replay = document.querySelector("#replay");
const poemCard = document.querySelector(".poem-card");
const scene = document.querySelector(".scene");
let timers = [];
let animationFrame;

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function glideTo(target, duration = 1800) {
  cancelAnimationFrame(animationFrame);
  const start = poemCard.scrollTop;
  const distance = Math.max(0, Math.min(target, poemCard.scrollHeight - poemCard.clientHeight)) - start;
  const startedAt = performance.now();

  function move(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    poemCard.scrollTop = start + distance * easeInOutCubic(progress);
    if (progress < 1) animationFrame = requestAnimationFrame(move);
  }
  animationFrame = requestAnimationFrame(move);
}

function playPoem() {
  timers.forEach(clearTimeout);
  timers = [];
  cancelAnimationFrame(animationFrame);
  scene.classList.remove("show-thought");
  poem.innerHTML = "";
  poemCard.scrollTop = 0;
  signature.classList.remove("show");

  stanzas.forEach((text, index) => {
    const stanza = document.createElement("p");
    stanza.className = "stanza";
    stanza.textContent = text;
    poem.append(stanza);

    timers.push(setTimeout(() => {
      stanza.classList.add("show");
      glideTo(Math.max(0, stanza.offsetTop - poemCard.clientHeight * 0.24));
    }, 650 + index * 3600));
  });

  timers.push(setTimeout(() => {
    signature.classList.add("show");
    glideTo(poemCard.scrollHeight, 2200);
  }, 650 + stanzas.length * 3600));

  timers.push(setTimeout(() => {
    scene.classList.add("show-thought");
  }, 650 + stanzas.length * 3600 + 4000));
}

replay.addEventListener("click", playPoem);
document.querySelector(".scene").addEventListener("click", (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains("veil")) playPoem();
});

playPoem();
