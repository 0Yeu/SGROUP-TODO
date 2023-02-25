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

const countTodos = document.querySelectorAll('.todo_item_inner .count_todo')

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