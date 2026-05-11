let numero = localStorage.getItem("numeroComprobante");

if (!numero) {
  numero = 1;
} else {
  numero = Number(numero);
}

document.getElementById("numeroComprobante").innerText = numero;

// ==========================
// NOMBRE EMPRESA
// ==========================
document
  .getElementById("empresaInput")
  .addEventListener("input", function () {

    let nombre = this.value.trim();

    if (nombre === "") {
      nombre = "NiceFix";
    }

    document.getElementById("nombreEmpresa").innerText = nombre;
  });

// ==========================
// LOGO
// ==========================
document
  .getElementById("logoInput")
  .addEventListener("change", function (e) {

    let archivo = e.target.files[0];
    if (!archivo) return;

    let reader = new FileReader();

    reader.onload = function (event) {
      document.getElementById("logoPreview").src = event.target.result;
    };

    reader.readAsDataURL(archivo);
  });

// ==========================
// GENERAR COMPROBANTE
// ==========================
function generarComprobante() {

  let cliente = document.getElementById("cliente").value;
  let telefono = document.getElementById("telefono").value;
  let marca = document.getElementById("marca").value;
  let modelo = document.getElementById("modelo").value;
  let imei = document.getElementById("imei").value;
  let problema = document.getElementById("problema").value;
  let estado = document.getElementById("estado").value;

  let total = Number(document.getElementById("total").value) || 0;
  let sena = Number(document.getElementById("sena").value) || 0;

  let restante = total - sena;

  document.getElementById("c_cliente").innerText = cliente;
  document.getElementById("c_telefono").innerText = telefono;
  document.getElementById("c_marca").innerText = marca;
  document.getElementById("c_modelo").innerText = modelo;
  document.getElementById("c_imei").innerText = imei;
  document.getElementById("c_problema").innerText = problema;
  document.getElementById("c_estado").innerText = estado;

  document.getElementById("c_total").innerText = total;
  document.getElementById("c_sena").innerText = sena;
  document.getElementById("c_restante").innerText = restante;

  let fecha = new Date();

  document.getElementById("fecha").innerText =
    fecha.toLocaleDateString();
}

// ==========================
// DESCARGAR PDF (ARREGLADO)
// ==========================
function descargarPDF() {

  const comprobante = document.getElementById("comprobante");

  // 🔥 importante: asegurar render completo antes del PDF
  comprobante.style.transform = "scale(1)";

  let opciones = {
    margin: 0,
    filename: "comprobante_" + numero + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0
    },
    jsPDF: {
      unit: "px",
      format: [comprobante.scrollWidth, comprobante.scrollHeight],
      orientation: "portrait"
    }
  };

  html2pdf()
    .set(opciones)
    .from(comprobante)
    .save();

  numero++;

  localStorage.setItem("numeroComprobante", numero);

  document.getElementById("numeroComprobante").innerText = numero;
}

// ==========================
// WHATSAPP
// ==========================
function enviarWhatsapp() {

  let telefono = document.getElementById("telefono").value;
  let cliente = document.getElementById("cliente").value;
  let marca = document.getElementById("marca").value;
  let modelo = document.getElementById("modelo").value;
  let total = document.getElementById("total").value;

  if (!telefono) {
    alert("Falta el número de teléfono");
    return;
  }

  let mensaje =
`Hola ${cliente}, tu comprobante de reparación ya fue generado.

Equipo: ${marca} ${modelo}
Total: $${total}

Gracias por confiar en nosotros.`;

  let url = `https://wa.me/54${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}