import { db } from '../db/db.js'

class Lista {
  static atualizarLista(db) {
    const lista = document.getElementById('lista-de-alunos')
    lista.innerHTML = ''

    db.forEach((e) => {
      const li = document.createElement('li')
      li.innerHTML = `<div>${e._nome} ${e._sobrenome}</div><div>${e._email}</div><div>${e._cargo}</div>`
      lista.appendChild(li)
    })
  }

  static filtros(evt) {
    const listaCargos = document.getElementById('cargoOption')

    if (evt.target.tagName === 'BUTTON') {
      switch (listaCargos.value) {
        case 'Aluno':
          const alunos = db.filter((e) => {
            if (e._cargo === 'Aluno') {
              return e
            }
          })

          Lista.atualizarLista(alunos)
          break
        case 'Facilitador':
          const facilitador = db.filter((e) => {
            if (e._cargo === 'Facilitador') {
              return e
            }
          })

          Lista.atualizarLista(facilitador)
          break
        case 'Instrutor':
          const instrutor = db.filter((e) => {
            if (e._cargo === 'Instrutor') {
              return e
            }
          })

          Lista.atualizarLista(instrutor)
          break
        default:
          Lista.atualizarLista(db)
      }
    }
  }
}

export { Lista }
