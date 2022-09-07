class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const fieldValid = this.checkField()
        const passwdValid = this.passwdValid()
        if (fieldValid && passwdValid) {
            alert('Esta tudo okay')
            this.formulario.submit()
        }
    }

    //Checando os campos Valido
    checkField() {
        let valid = true

        //Se ja tiver a mensagem de erro, ela não aparecerá novamente
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText

            //Valida se os campos estao vazios
            if (!field.value) {
                this.createError(field, `Campo "${label}" não pode estar vazio!`)
                valid = false
            }

            //Valida se o CPF esta correto
            if (field.classList.contains('cpf')) {
                if (!this.validaCPF(field)) valid = false
            }

            //Valida o nome de Usuario
            if (field.classList.contains('usuario')) {
                if (!this.validaUsuario(field)) valid = false
            }
        }
        return valid
    }

    //Cria a mensagem de Erro
    createError(field, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend', div)
    }

    //Validação da senha
    passwdValid() {
        let valid = true
        const passwd = this.formulario.querySelector('.senha')
        const passwd2 = this.formulario.querySelector('.senha2')

        //Verificando se a senha e o repetir senha são iguais
        if (passwd.value !== passwd2.value) {
            this.createError(passwd, 'Campo "Senha" e "Repetir Senha" precisam ser iguais')
            this.createError(passwd2, 'Campo "Senha" e "Repetir Senha" precisam ser iguais')
            valid = false
        }

        //Verificando se o tamanho da senha bate com as regras
        if (passwd.value.length > 12 || passwd.value.length < 6) {
            this.createError(passwd, 'Campo "Senha" deve conter entre 6 e 12 caracteres')
            valid = false
        }
        return valid
    }

    //Verificando o CPF do ValidaCPF.js
    validaCPF(field) {
        const cpf = new ValidaCPF(field.value)
        if (!cpf.valida()) {
            this.createError(field, 'CPF Invalido')
        }
        return true
    }

    //Validação do Usuario
    validaUsuario(field) {
        const usuario = field.value
        let valid = true

        if (field.length > 12 || field.length < 3) {
            this.createError(field, 'Usuario precisa ter entre 3 e 12 caracteres')
            valid = false
        }
        
        if (!usuario.match(/[a-zA-Z0-9]+/g)) {
            this.createError(field, 'Usuario precisa conter apenas letras e/ou numeros')
            valid = false
        }
        return valid
    }
}
//Instanciando a validação
const valida = new ValidaFormulario()