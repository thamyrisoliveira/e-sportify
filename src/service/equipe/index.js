import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc, query, where, updateDoc} from 'firebase/firestore/lite';

const salvar = async (equipe) => {
    try {
        let document = {
            nome: equipe.nome,
            gerente: equipe.gerente ? doc(getFirestore(), "usuarios", equipe.gerente.id) : null,
            membros: equipe.membros.map(membro => doc(getFirestore(), "usuarios", membro.id))
        }
        const docRef = await addDoc(collection(getFirestore(), "equipes"), document);
        equipe.id = docRef.id
        return equipe
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const atualizar = async (equipe) => {
    try {
        let document = {
            membros: equipe.membros.map(membro => doc(getFirestore(), "usuarios", membro.id))
        }
        const docRef = await updateDoc(doc(getFirestore(), "equipes", equipe.id), document);
        return document
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

const listar = async () => {
    let equipes = [];
    const docRef = collection(getFirestore(), "equipes");
    const q = query(docRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let equipe = {
            ...doc.data(),
            id: doc.id
        }
        equipes.push(equipe)
    });
    return equipes
}

const carregaJogadoresEquipe = async (equipe) => {
    let jogadores = [];
    equipe.membros.forEach(async(ref) => {
        const docSnap = await getDoc(ref);

        if (docSnap.exists()) {
            jogadores.push(docSnap.data())
        }
    })
    return jogadores
}

export default {
    salvar: salvar,
    listar: listar,
    atualizar: atualizar,
    carregaJogadoresEquipe: carregaJogadoresEquipe
}