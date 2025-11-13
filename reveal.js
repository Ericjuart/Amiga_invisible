function decodeBase64(str) {
  try {
    return atob(str);
  } catch {
    return "(desconocido)";
  }
}

const sentidos = ["EL OLFATO", "EL TACTO", "EL GUSTO", "LA VISTA", "EL OIDO"];
const MAX_REPETICIONES = 2; // máximo número de veces que puede salir cada sentido

// Devuelve o inicializa el contador de usos
function getContadorSentidos() {
  const data = localStorage.getItem("contadorSentidos");
  return data ? JSON.parse(data) : {};
}

function setContadorSentidos(contador) {
  localStorage.setItem("contadorSentidos", JSON.stringify(contador));
}

// Obtiene un sentido aleatorio que no haya superado el máximo de repeticiones
function getSentidoDisponible() {
  const contador = getContadorSentidos();

  // Filtrar los sentidos que aún pueden usarse
  const disponibles = sentidos.filter(
    (s) => (contador[s] || 0) < MAX_REPETICIONES
  );

  if (disponibles.length === 0) {
    console.warn("⚠️ Todos los sentidos han alcanzado el máximo de repeticiones.");
    return "SIN SENTIDO 😅";
  }

  // Elegir uno al azar entre los disponibles
  const indice = Math.floor(Math.random() * disponibles.length);
  const elegido = disponibles[indice];

  // Actualizar el contador y guardarlo
  contador[elegido] = (contador[elegido] || 0) + 1;
  setContadorSentidos(contador);

  return elegido;
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
const key = `sentido_${receptor}`;
const sentidoGuardado = localStorage.getItem(key);

if (sentidoGuardado) {
  sentido = sentidoGuardado;
} else {
  sentido = getSentidoDisponible();
  localStorage.setItem(key, sentido);
}

const countdownEl = document.getElementById("countdown");
const revealEl = document.getElementById("reveal");
const nombreEl = document.getElementById("nombre");
const imagenEl = document.getElementById("imagen");
const titempEl = document.getElementById("titemp");
const sentidoEl = document.getElementById("sentido");

// Si los datos son inválidos, muestra error y corta
if (!dador || !receptor) {
  document.body.innerHTML = "<h2>⚠️ Enlace inválido o corrupto.</h2>";
} else {
  let count = 5;

  window.addEventListener("load", () => {
    setTimeout(() => {
      titempEl.classList.add("hidden");
      countdownEl.classList.remove("hidden");
      const timer = setInterval(() => {
        countdownEl.textContent = count;
        count--;
        if (count < 0) {
          clearInterval(timer);
          countdownEl.classList.add("hidden");
          revealEl.classList.remove("hidden");
          nombreEl.textContent = "!!!!!!!!!!  " + receptor + "  !!!!!!!!!!";
          sentidoEl.textContent = sentido;
          imagenEl.src = `./Amigas/${receptor}.jpg`;
        }
      }, 1000);
    }, 2000);
  });
}
