import { getFirestore, collection, getDocs, setDoc, getDoc, doc, query, where } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const salvar = async (usuario) => {
    try {
        let document = {
            id: usuario.id ? usuario.id : null,
            nome: usuario.nome,
            nickname: usuario.nickname,
            perfil: usuario.perfil,
            email: usuario.email,
            cpf: usuario.cpf,
            resumo: usuario.resumo,
            habilidades: usuario.habilidades,
            experiencias: usuario.experiencias,
            completo: usuario.completo
        }
        const docRef = await setDoc(doc(getFirestore(), "usuarios", usuario.id), document);
        return document
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const listar = async (perfil) => {
    let usuarios = [];
    const docRef = collection(getFirestore(), "usuarios");
    const q = query(docRef, where("perfil", "==", perfil));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuarios.push(doc.data())
    });
    return usuarios
}

const existeCPF = async (cpf) => {
    const usuariosRef = collection(getFirestore(), "usuarios");
    const q = query(usuariosRef, where("cpf", "==", cpf));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty
}

const buscarPorNome = async (nome) => {
    const usuariosRef = collection(getFirestore(), "usuarios");
    const q = query(usuariosRef, where("nome", ">=", nome), where("nome", "<=", nome+ "~"));
    const querySnapshot = await getDocs(q);
    const result = []
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result
}

const getUsuarioProfile = async (key) => {
    const docRef = doc(getFirestore(), "usuarios", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
}

const autenticar = async (usuario) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, usuario.email, usuario.senha);
}

export default {
    salvar: salvar,
    listar: listar,
    existeCPF: existeCPF,
    buscarPorNome: buscarPorNome,
    getUsuarioProfile: getUsuarioProfile,
    autenticar: autenticar
}