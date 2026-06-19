import React from "react";

export default function CarrouselSSG({ productos }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", gap: "1rem" }}>
      {productos.map((pr, index) => (
        <div key={index} style={{ minWidth: "250px", textAlign: "center" }}>
          <img
            src={pr.imagen}
            alt={pr.título}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>{pr.título}</h3>
          <p>{pr.texto_precio}</p>
        </div>
      ))}
    </div>
  );
}
