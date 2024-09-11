class recinto {

    constructor(numero, tamanhoTotal, biomas, animais) {
        this.numero = numero;
        this.tamanhoTotal = tamanhoTotal;
        this.biomas = biomas;
        this.animais = animais;

    }

    setEspacoDisponivel(espacoDisponivel) {
        this.espacoDisponivel = espacoDisponivel;
        return


    }
}

export { recinto };