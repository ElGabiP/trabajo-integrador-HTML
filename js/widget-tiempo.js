const recomendacion = document.getElementById("tiempoRecomendacion");

const fetchTiempo = async (ciudad) => {
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "5859ed33f8d1e4d0362dfbc480d0e1ab";
    const units = "metric";
    const lang = "es";

    const response = await fetch(
      `${url}?q=${ciudad}&appid=${apiKey}&units=${units}&lang=${lang}`
    );
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.log("Error en el fetch de datos del tiempo: ", error);
  }
};

const actulizarWidgetTiempo = async (ciudad) => {
  const datosTiempo = await fetchTiempo(ciudad);

  const tiempo = datosTiempo.weather[0].main;

  document.getElementById("ciudad").textContent = datosTiempo.name;
  document.getElementById("temperatura").textContent =
    datosTiempo.main.temp.toFixed(1);
  document.getElementById("tiempo").textContent =
    datosTiempo.weather[0].description;
  document.getElementById("humedad").textContent = datosTiempo.main.humidity;
  const iconCode = datosTiempo.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  document.getElementById("tiempoIcono").src = iconUrl;
  document.getElementById("tiempoIcono").alt =
    datosTiempo.weather[0].description;

  const recomendacionHTML =
    tiempo === "Rain" ||
    tiempo === "Thunderstorm" ||
    tiempo === "Snow" ||
    tiempo === "Drizzle"
      ? "<i class='fa-solid fa-umbrella'></i> Llevá paraguas."
      : datosTiempo.main.temp_max > 28
      ? "<i class='fa-solid fa-glass-water'></i> Recordá hidratarte."
      : datosTiempo.main.temp_min < 18
      ? "<i class='fa-solid fa-mitten'></i> Salí con un abrigo."
      : "<i class='fa-solid fa-face-smile'></i> Disfrutá tu día.";

  recomendacion.innerHTML = recomendacionHTML;
};

actulizarWidgetTiempo("Córdoba");
