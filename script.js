const inputsForm = document.querySelectorAll('#input_element')
const btnSubmit = document.querySelector('.btn_submit')
const listTodoElement = document.querySelector('.lists_todo')
const listTodoDoingElement = document.querySelector('.lists_todo.doing')
const listTodoFinishedElemnt = document.querySelector('.lists_todo.finished')
const formTodoElement = document.querySelector('.newtask_form')
const overlayElement = document.querySelector('.overlay')
const btnOpenFormElement = document.querySelector('.header_newtask')
const iconClose = document.querySelector('.icon_close')
const statusTodo = document.querySelectorAll('input[name=status]')

const titleForm = document.querySelector('.newtask_form .title')
const btnSubmitForm = document.querySelector('.newtask_form .btn_submit')
const status = document.querySelector('.status')

const countTodos = document.querySelectorAll('.todo_item .count_todo')

let isEdit = false

let todos = JSON.parse(localStorage.getItem('todo')) || []
let todo = {
    id: '',
    category: '',
    title: '',
    content: '',
    status: '',
    date: '',
}

const TODO_TYPE = 'TODO_TYPE'
const TODO_DOING_TYPE = 'TODO_DOING_TYPE'
const TODO_FINISHED_TYPE = 'TODO_FINISHED_TYPE'

const callAPI = async (url, method, data = null) => {
    const parameter = {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        ...(method !== 'DELETE' && {
            headers: {
                'Content-Type': 'application/json',
            },
        }),

        ...(method !== 'GET' && { body: JSON.stringify(data) }),
    }

    const res = await fetch(url, parameter)
    const result = await res.json()
    return result
}

const handleChangeInput = (e) => {
    const parentElement = e.target.parentElement
    todo[e.target.name] = e.target.value

    if (!e.target.value) {
        parentElement.style.borderColor = 'black'
    } else {
        parentElement.style.borderColor = '#00e64d'
    }
}
inputsForm.forEach((inputItem) => {
    inputItem.addEventListener('change', handleChangeInput)
})

const validTodo = () => {
    let count = 0
    inputsForm.forEach((inputItem) => {
        if (inputItem.value == '') {
            const parentElement = inputItem.parentElement
            parentElement.style.borderColor = 'red'
            count += 1
        }
    })
    return !count ? true : false
}

const clearFormTodoValue = () => {
    inputsForm.forEach((inputItem) => {
        const parentElement = inputItem.parentElement
        inputItem.value = ''
        parentElement.style.borderColor = 'black'
    })
}

const getCurrentDate = () => {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    today = mm + '/' + dd + '/' + yyyy
    return today
}

const generateTodoHTML = (todo) => {
    return `
        <div class="todo_card">
            <p class="todo_card_category">${todo.category}</p>
            <h2 class="title">
                ${todo.title}
            </h2>
            <p class="description">
                ${todo.content}
            </p>
            <p class="date">
                <i class="fas fa-clock"></i>
                ${todo.date}
            </p>
            <div class="todo_card_action" >
                <i class="fas fa-edit" onclick="handleEdit(${todo.id})"></i>
                <i class="fas fa-trash-alt" onclick="handleDelete(${todo.id})"></i>
            </div>
        </div>
    `
}

const handleEdit = (id) => {
    displayForm(true)
    isEdit = true

    titleForm.innerText = 'Edit Todo'
    btnSubmitForm.innerText = 'Edit'
    status.style.display = 'flex'
    const todoFinded = todos.find((todo) => todo.id == id)
    todo = todoFinded
    inputsForm.forEach((inputForm) => {
        inputForm.value = todoFinded[inputForm.name]
    })
    statusTodo.forEach((st) => {
        if (st.value == todoFinded.status) {
            st.checked = true
        }
    })
}

