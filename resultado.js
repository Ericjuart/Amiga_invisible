const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const assigned = urlParams.get("assigned");

const participants = [
  { name: "Ana", image: "Amigas/Ana.jpg" },
  { name: "Laura", image: "laura.jpg" },
  { name: "María", image: "maria.jpg" },
];

const startButton = document.getElementById("startAnimation");
const carousel = document.getElementById("carousel");
const groupImage = document.getElementById("groupImage");
const currentImage = document.getElementById("currentImage");

startButton.addEventListener("click", () => {
  groupImage.style.display = "none";
  carousel.style.display = "block";

  const images = participants.map((p) => p.image);
  let index = 0;
  let cycles = 0;

  const interval = setInterval(() => {
    currentImage.src = images[index];
    index = (index + 1) % images.length;

    // Parar en el asignado después de 3 ciclos
    if (index === 0) cycles++;
    if (cycles === 3 && images[index] === participants.find((p) => p.name === assigned).image) {
      clearInterval(interval);
      alert(`Tu amigo invisible es: ${assigned}`);
    }
  }, 500);
});
