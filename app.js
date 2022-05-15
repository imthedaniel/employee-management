import { PessoaController } from './assets/js/controllers/PessoaController.js'
import { InterfaceController } from './assets/js/controllers/InterfaceController.js'
import { Lista } from './assets/js/models/Lista.js'
import { db } from './assets/js/db/db.js'

const form = document.querySelector('form')
const aside = document.querySelector('aside')
const modal = document.querySelector('.app__popUp')

form.addEventListener('submit', PessoaController.criarPessoa)
aside.addEventListener('click', Lista.filtros)
modal.addEventListener('click', InterfaceController.closeModal)

Lista.atualizarLista(db)
InterfaceController.atualizarContador()
