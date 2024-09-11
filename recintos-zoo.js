import { animal } from "./animal.js";
import { recinto } from "./recinto.js";

class RecintosZoo {

    constructor() {
        this.animaisPermitidos = [
            new animal("LEÃO", 3, ["savana"], true),
            new animal("LEOPARDO", 2, ["savana"], true),
            new animal("CROCODILO", 3, ["rio"], true),
            new animal("MACACO", 1, ["savana", "floresta"], false),
            new animal("GAZELA", 2, ["savana"], false),
            new animal("HIPOPOTAMO", 4, ["savana", "rio"], false)

        ]
        this.recintos = [
            new recinto(1, 10, ["savana"], [
                this.animaisPermitidos[3],
                this.animaisPermitidos[3],
                this.animaisPermitidos[3]
            ]),

            new recinto(2, 5, ["floresta"], []),

            new recinto(3, 7, ["savana", "rio"], [
                this.animaisPermitidos[4]
            ]),
            new recinto(4, 8, ["rio"], []),
            new recinto(5, 9, ["savana"], [
                this.animaisPermitidos[0]
            ])





        ]

    }



    analisaRecintos(animal, quantidade) {

        const animal1 = this.animaisPermitidos.find(item => item.especie == animal)


        if (!animal1) {
            return {
                erro: "Animal inválido"
            }
        }


        if (quantidade <= 0) {
            return {
                erro: "Quantidade inválida"
            }
        }


        const recintosViaveis = this.recintos.filter(recinto => {



            if (animal1.especie == "MACACO" && recinto.animais.length == 0 && quantidade <= 1) {
                return false
            }

            // VERIFICA SE EXISTE ALGUM ANIUMAL NO RECINTO E SE ALGUM DELES É DE ESPECIE DIFERENTE 
            const outrasEspecies = recinto.animais.length > 0 && recinto.animais.some(item => item.especie != animal)
            if (animal1.carnivoro && outrasEspecies) {
                
                return false
            }
            //VERIFICA QUAL E O ANIMAL E SE TEM DE OUTRA ESPECIE E SE O RECINTO NAO TEM SAVANA OU RIO

            if (animal1.especie == "HIPOPOTAMO" && outrasEspecies && !(recinto.biomas.includes("savana") && recinto.biomas.includes("rio"))) {
                return false

            }

            // VERIFICA SE OS ANIAMIS DO RECINTO E MAIOR Q ZERO E VERIFICA SE EXISTE ALGUMA ESPECIE DIFERENTE E CARNIVOERA
            const outrasEspeciesCarvivoras = recinto.animais.length > 0 && recinto.animais.some(item => item.especie != animal && item.carnivoro)

            if (outrasEspeciesCarvivoras) {
                return false
            }

            //VERIFICA SE EXISTE ALGUM BIOMA COMPATIVEL COM O ANIMAL ESCRITO, USANDO UMA PESQUISA DE STRING EM UM ARRAY

            const biomaCompativel = recinto.biomas.some(bioma => animal1.bioma.includes(bioma))

            if (!biomaCompativel) {
                return false
            }

            //PASSA POR TODOS OS ANIMAIS VERIFICANDO O TAMNHO TOTAL 

            const espacoOcupado = recinto.animais.reduce((total, a) => {
                return total + a.tamanho;
            }, 0);

            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado

            const espacoNecessario = animal1.tamanho * quantidade

            if (outrasEspecies) {
                espacoDisponivel = espacoDisponivel - 1;
            }

            recinto.setEspacoDisponivel(espacoDisponivel - espacoNecessario)

            return espacoDisponivel >= espacoNecessario
        })
        console.log(recintosViaveis)
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return {
            recintosViaveis: recintosViaveis.map(recinto => {
                return `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoDisponivel} total: ${recinto.tamanhoTotal})`
            }
            )
        };

    }



















}




export { RecintosZoo as RecintosZoo };
