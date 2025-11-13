function decodeBase64(str) {
  try {
    return atob(str);
  } catch {
    return "(desconocido)";
  }
}
const sentidos = ["OLFATO", "TACTO", "GUSTO", "VISTA", "OIDO"];

function getSentidoAleatorio() {
  const indice = Math.floor(Math.random() * sentidos.length);
  return sentidos[indice];
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
// 👉 Guardar o recuperar el sentido asignado
let sentido;
const key = `sentido_${receptor}`; // clave única por persona
const sentidoGuardado = localStorage.getItem(key);

if (sentidoGuardado) {
  sentido = sentidoGuardado; // ya tiene uno asignado
} else {
  sentido = getSentidoAleatorio(); // genera uno nuevo
  localStorage.setItem(key, sentido); // lo guarda para la próxima
}


const countdownEl = document.getElementById("countdown");
const revealEl = document.getElementById("reveal");
const nombreEl = document.getElementById("nombre");
const imagenEl = document.getElementById("imagen");
const titempEl = document.getElementById("titemp");
const sentidoEl = document.getElementById("sentido");
//const introEl = document.getElementById("intro");

// Si los datos son inválidos, muestra error y corta
if (!dador || !receptor) {
  document.body.innerHTML = "<h2>⚠️ Enlace inválido o corrupto.</h2>";
} else {

  let count = 5; // cuenta atrás en segundos

  window.addEventListener("load", () => {
    setTimeout(() => {
      //introEl.classList.add("hidden");
      titempEl.classList.add("hidden");
      countdownEl.classList.remove("hidden");
      titempEl.classList.add("hidden");
      const timer = setInterval(() => {
        countdownEl.textContent = count;
        count--;
        if (count < 0) {
          clearInterval(timer);
          countdownEl.classList.add("hidden");
          revealEl.classList.remove("hidden");
          nombreEl.textContent = "!!!!!  "+receptor+"  !!!!!";
          sentidoEl.textContent = "EL "+sentido;
          imagenEl.src = `./Amigas/${receptor}.jpg`;
        }
      }, 1000);
    }, 2000); // espera 2s antes de iniciar la cuenta atrás (puedes ajustar)
  });
}
