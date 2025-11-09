function decodeBase64(str) {
  try {
    return atob(str);
  } catch {
    return "(desconocido)";
  }
}

// Obtener parámetros y decodificar nombres
function getDecodedNames() {
  const params = new URLSearchParams(window.location.search);
  const data = params.get("data");

  if (!data) return { dador: null, receptor: null };

  const [userEncoded, toEncoded] = data.split(".");
  const dador = decodeBase64(userEncoded);
  const receptor = decodeBase64(toEncoded);
  return { dador, receptor };
}

const { dador, receptor } = getDecodedNames();
const countdownEl = document.getElementById("countdown");
const revealEl = document.getElementById("reveal");
const nombreEl = document.getElementById("nombre");
const imagenEl = document.getElementById("imagen");
const titempEl = document.getElementById("titemp");
const audioEl = document.getElementById("sonido");
//const introEl = document.getElementById("intro");

// Si los datos son inválidos, muestra error y corta
if (!dador || !receptor) {
  document.body.innerHTML = "<h2>⚠️ Enlace inválido o corrupto.</h2>";
} else {

  let count = 5; // cuenta atrás en segundos

  window.addEventListener("load", () => {
    titempEl.classList.add("hidden");
    setTimeout(() => {
      //introEl.classList.add("hidden");
      countdownEl.classList.remove("hidden");
      titempEl.classList.add("hidden");
      const timer = setInterval(() => {
        countdownEl.textContent = count;
        count--;
        if (count < 0) {
          clearInterval(timer);
          setTimeout(() => {
            audioEl.muted = false;
            audioEl.volume = 1;
          }, 300);
          titempEl.classList.remove("hidden");
          countdownEl.classList.add("hidden");
          revealEl.classList.remove("hidden");
          nombreEl.textContent = receptor;
          imagenEl.src = `./Amigas/${receptor}.jpg`;
        }
      }, 1000);
    }, 3000); // espera 2s antes de iniciar la cuenta atrás (puedes ajustar)
  });
}
