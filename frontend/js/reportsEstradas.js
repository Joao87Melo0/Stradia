document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const lista = document.getElementById("lista-reports");

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "../login/index.html";
      return;
    }

    try {
      const querySnapshot = await db.collection("reportsEstradas").orderBy("timestamp", "desc").get();

      if (querySnapshot.empty) {
        lista.innerHTML = "<p style='color:white'>Nenhum relatório encontrado.</p>";
        return;
      }

      querySnapshot.forEach((doc) => {
        const report = doc.data();

        const bloco = document.createElement("div");
        bloco.className = "bloco-historico expandable";

        const info = document.createElement("div");
        info.className = "info-historico";

        const estrada = report.estrada || "Desconhecida";
        const img = document.createElement("img");
        img.src = `../../../img/${estrada.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;

        img.alt = estrada;

        const divTexto = document.createElement("div");
        const h2 = document.createElement("h2");
        h2.textContent = estrada;

        const data = report.timestamp?.toDate?.();
        const dataFormatada = data ? `${data.toLocaleDateString()} - ${data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Data desconhecida";
        const h3 = document.createElement("h3");
        h3.textContent = dataFormatada;

        divTexto.appendChild(h2);
        divTexto.appendChild(h3);
        info.appendChild(img);
        info.appendChild(divTexto);

        const detalhes = document.createElement("div");
        detalhes.className = "descricao-report";
        detalhes.textContent = `Km ${report.km} - ${report.descricao}`;
        detalhes.style.display = "none";

        bloco.appendChild(info);
        bloco.appendChild(detalhes);

        bloco.addEventListener("click", () => {
          detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
        });

        lista.appendChild(bloco);
      });

    } catch (error) {
      console.error("Erro ao carregar os reports:", error);
      lista.innerHTML = "<p style='color:white'>Erro ao carregar relatórios.</p>";
    }
  });
});
