class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }
    isSequencia() {
        return this.cpfLimpo.charAt(0)
            .repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

    geraNovoCpf() {
        const cpfSemOs2UltimosDigitos = this.cpfLimpo.slice(0, -2)

        const digito1 = ValidaCPF.calculo(cpfSemOs2UltimosDigitos)
        const digito2 = ValidaCPF.calculo(cpfSemOs2UltimosDigitos + digito1)

        this.novoCPF = cpfSemOs2UltimosDigitos + digito1 + digito2
    }

    static calculo(cpfSemDigitos) {
        let total = 0
        let reverso = cpfSemDigitos.length + 1

        for (let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica)
            reverso--
        }
        const digito = 11 - (total % 11)
        return digito <= 9 ? digito : String(0)
    }

    valida() {
        if (!this.cpfLimpo) return false
        if (typeof this.cpfLimpo !== 'string') return false
        if (this.cpfLimpo.length !== 11) return false
        if (this.isSequencia()) return false
        this.geraNovoCpf()

        return this.novoCPF === this.cpfLimpo
    }

}