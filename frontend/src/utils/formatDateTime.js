const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
};

export default formatDateTime;
