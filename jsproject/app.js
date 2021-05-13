const form = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')


loadEventListeners()

function loadEventListeners(){

  //Dom load event

  document.addEventListener('DOMContentLoaded', getTasks)

  form.addEventListener('submit', addTask)

  taskList.addEventListener('click', removeTask)

  clearBtn.addEventListener('click', clearTasks)

  filter.addEventListener('keyup', filterTask)
}

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(task))

    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i <i class="fa fa-remove"></i>'

    li.appendChild(link)
    taskList.appendChild(li)
    taskInput.value = ''

  })

}


function addTask(e){
  if (taskInput.value === '') {
    alert('please enter a value')

  }else{

  const li = document.createElement('li')
  li.className = 'collection-item'
  li.appendChild(document.createTextNode(taskInput.value))

  const link = document.createElement('a')
  link.className = 'delete-item secondary-content'
  link.innerHTML = '<i <i class="fa fa-remove"></i>'

  li.appendChild(link)
  taskList.appendChild(li)
  storeTaskInLocalStorage(taskInput.value)
  taskInput.value = ''
  }


  e.preventDefault()
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}




function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('are you sure?')) {
      e.target.parentElement.parentElement.remove()

      //remove from lS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


// remove from lS function

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

}


function clearTasks(){
  if(localStorage.getItem('tasks') === null){
    alert('There are no task to delete')
  }else{
    if (confirm('delete all?')) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
      }
      clearTasksFromLocalStorage();
    }
  }
}



function clearTasksFromLocalStorage() {
  localStorage.clear()
}

function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block'
      }else {
        task.style.display = 'none'
      }
    })
  }
