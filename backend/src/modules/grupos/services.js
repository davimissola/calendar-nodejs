import grupos from "./models.js"



// usar quando fizer funçao de entrar em grupo
export async function podeEntrarGrupo(id_user, id_grupo) {
    const resposta = await grupos.listarGruposUser(id_user)
    
    for (let i=0; i < resposta.length; i++) {
        if (resposta[i].id == id_grupo) {
            return false
        }
    }

    return true
}