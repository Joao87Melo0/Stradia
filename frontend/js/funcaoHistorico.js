async function acessarEstrada(nomeEstrada, urlEstrada) {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = '../login/index.html';
        return;
    }

    const uid = user.uid;
    const firestore = firebase.firestore();
    const historicoRef = firestore.collection('users').doc(uid);

    const doc = await historicoRef.get();
let historico = doc.exists && doc.data().historico ? doc.data().historico : [];

// Se o campo historico não existir, inicialize-o
if (!doc.exists || !doc.data().historico) {
await historicoRef.set({ historico: [] }, { merge: true });
}


    const nomeArquivo = nomeEstrada.toLowerCase().replace('-', '') + '.png';
    const urlImagem = `../../../img/${nomeArquivo}`;

    try {
        const doc = await historicoRef.get();
        let historico = doc.exists && doc.data().historico ? doc.data().historico : [];

        // Adiciona nova entrada no topo (sem remover duplicatas)
        historico.unshift({
            nome: nomeEstrada,
            imagem: urlImagem,
            data: new Date().toISOString()
        });

        // Limita a 10 entradas
        if (historico.length > 10) historico = historico.slice(0, 10);

        await historicoRef.set({ historico }, { merge: true });

        window.location.href = urlEstrada;
    } catch (error) {
        console.error("Erro ao salvar histórico:", error);
    }
}