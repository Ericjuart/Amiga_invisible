const participants = [
    { name: "Ana", contact: "ana@example.com" },
    { name: "Laura", contact: "laura@example.com" },
    { name: "María", contact: "maria@example.com" },
  ];
  
  const participantsDiv = document.getElementById("participants");
  
  // Crear campos dinámicos para cada participante
  participants.forEach((participant, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>${participant.name} regaló a:</label>
      <select id="select-${index}" class="participant-select">
        <option value="">Seleccione...</option>
        ${participants
          .map((p) =>
            p.name !== participant.name
              ? `<option value="${p.name}">${p.name}</option>`
              : ""
          )
          .join("")}
      </select>
    `;
    participantsDiv.appendChild(div);
  });
  
  // Añadir lógica para validar y bloquear opciones ya seleccionadas
  document.querySelectorAll(".participant-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
  
      // Deshabilitar la opción seleccionada en los otros desplegables
      document.querySelectorAll(".participant-select").forEach((otherSelect) => {
        if (otherSelect !== e.target) {
          const options = otherSelect.querySelectorAll("option");
          options.forEach((option) => {
            if (option.value === selectedValue) {
              option.disabled = true;
            } else {
              // Verificar si aún debe estar habilitada
              const isStillSelected = [...document.querySelectorAll(".participant-select")]
                .filter((s) => s !== otherSelect)
                .some((s) => s.value === option.value);
              option.disabled = isStillSelected;
            }
          });
        }
      });
    });
  });
  
  // Botón para iniciar el sorteo
  document.getElementById("startDraw").addEventListener("click", () => {
    const assignments = [...document.querySelectorAll(".participant-select")].map(
      (select, index) => ({
        giver: participants[index].name,
        receiver: select.value,
      })
    );
  
    // Validar que todos los campos estén completos
    if (assignments.some((assignment) => !assignment.receiver)) {
      alert("Por favor, selecciona a quién regaló cada participante.");
      return;
    }
  
    // Mostrar resultados en consola (o enviar los datos por WhatsApp en el futuro)
    console.log(assignments);
    alert("Las elecciones se han guardado correctamente.");
  });
  