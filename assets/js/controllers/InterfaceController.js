import { db } from '../db/db.js'

const msgError = document.createElement('p')
const body = document.querySelector('body')

class InterfaceController {
  static closeModal(e) {
    if (e.target.innerText == 'x') {
      e.target.closest('div').classList.remove('show')
      body.classList.remove('scrollStop')
      msgError.innerText = ''
    }
  }

  static showMsgError(msg) {
    const popUp = document.querySelector('.app__popUp')
    const containerMsg = document.querySelector('.containerMsg')

    msgError.innerText = msg
    msgError.style.textAlign = 'center'
    containerMsg.appendChild(msgError)
    popUp.classList.add('show')
    body.classList.add('scrollStop')
  }

  static atualizarContador() {
    const contador = document.querySelector('#total-alunos')
    contador.innerText = db.length
  }
}

export { InterfaceController }
