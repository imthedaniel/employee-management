import { Pessoa } from '../models/Pessoa.js'
import { Lista } from '../models/Lista.js'
import { db } from '../db/db.js'
import { InterfaceController } from '../controllers/InterfaceController.js'

class PessoaController {
  static validarDados = (data) => {
    const tipoDeDados = {
      nome: 'string',
      sobrenome: 'string',
      dataNascimento: 'string',
      email: 'string',
      contato: 'number',
      telefone: 'number',
      cargo: ['Aluno', 'Facilitador', 'Instrutor'],
    }
    const camposIncorretos = {}
    let estaValido = true

    for (const key in tipoDeDados) {
      const tipoAtual = tipoDeDados[key]
      const valorAtual = Number(data[key]) ? parseInt(data[key]) : data[key]
      let tipoEstaErrado = false

      if (Array.isArray(tipoAtual)) {
        if (!tipoAtual.includes(valorAtual)) {
          tipoEstaErrado = true
        }
      } else if (typeof valorAtual !== tipoAtual) {
        tipoEstaErrado = true
      }

      if (tipoEstaErrado) {
        camposIncorretos[
          key
        ] = `O campo ${key} precisa ser do tipo ${tipoAtual}`
        estaValido = false
      }
    }

    const response = {
      validData: estaValido,
      camposIncorretos,
    }
    console.log(response)
    return response
  }

  static maiorDezoito(nasc) {
    let today = new Date()
    let birthDate = new Date(nasc)
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  static criarPessoa = (evt) => {
    evt.preventDefault()
    const inputs = evt.target

    const dadosPessoa = {}

    for (let i = 0; i < inputs.length; i++) {
      const { name, value } = inputs[i]

      if (name) {
        dadosPessoa[name] = value
      }
    }
    const validarPessoa = this.validarDados(dadosPessoa)
    const idadeCadastrada = this.maiorDezoito(dadosPessoa.dataNascimento)

    if (idadeCadastrada < 18) {
      InterfaceController.showMsgError(
        'Você precisa ser maior de 18 anos para cadastrar-se.'
      )
    }

    if (validarPessoa.validData && idadeCadastrada >= 18) {
      const {
        nome,
        sobrenome,
        dataNascimento,
        email,
        contato,
        telefone,
        cargo,
      } = dadosPessoa

      let novaPessoa = new Pessoa(
        nome,
        sobrenome,
        dataNascimento,
        email,
        contato,
        telefone,
        cargo
      )

      if (db.length === 0) {
        db.push(novaPessoa)
        Lista.atualizarLista(db)
        InterfaceController.atualizarContador()
        console.log(novaPessoa)
      } else if (!db.some((e) => e._email.includes(dadosPessoa.email))) {
        db.push(novaPessoa)
        Lista.atualizarLista(db)
        InterfaceController.atualizarContador()
        console.log(novaPessoa)
      } else {
        InterfaceController.showMsgError(
          'Este e-mail já está cadastrado em nosso sistema.'
        )
      }
    }
  }
}

export { PessoaController }
