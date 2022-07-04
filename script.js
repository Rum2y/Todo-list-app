'use strict';

//Initializing Classes
const noTask = document.querySelector('.no-task');
const noTaskText = document.querySelector('.no-task-text');
const todos = document.querySelector('.todos');
const list = document.querySelectorAll('.list');
const modal = document.querySelector('.modal-task');
const modalInput = document.querySelector('.modal-input');
const enterTask = document.querySelector('.enter-task');
const input = document.querySelector('.input');
const links = document.querySelectorAll('.links');
const mainContainer = document.querySelector('.main');
const overlay = document.querySelector('.overlay');
const add = document.querySelector('.add');
const date = document.querySelector('.date');
const set = document.querySelector('.set');
const action = document.querySelectorAll('.actions');
const actionD = document.querySelector('.actions-d');
const dateTime = document.querySelector('.date-time');
const category = document.querySelector('.categories');
const timeSet = document.querySelector('.time');
const option = document.querySelector('.options');
const item = document.querySelectorAll('.items');
const btnDiv = document.querySelector('.btn-div');
const smallNav = document.querySelector('.nav-2');
const newNav = document.querySelector('.new-nav');
const closeModal = document.querySelector('.close-modal');

let val = [];
let index = 0;
let t = [];
let d = [];
let completeText;
let dueText;
let itemIndex;
let linkIndex = 0;
let every = [];

links.forEach(function (n) {
  every.push(n.innerHTML);
});

// Starting Screen
function initial() {
  list.forEach(l => {
    l.remove();
  });
  height();
  actionD.classList.remove('date-time');
}
initial();

//Responsove Height
function height() {
  let bottom = todos.getBoundingClientRect().bottom;
  let top = enterTask.getBoundingClientRect().top;
  let nav = option.getBoundingClientRect().bottom;

  if (top - bottom > 0 || top - bottom < 0) {
    todos.style.height = `${top - nav}px`;
  }
}

window.onresize = height;

//Adding a task
function addATask() {
  if (input.value !== '') {
    noTask.style.display = 'none';
    noTaskText.classList.add('hidden');
    todos.classList.remove('hidden');
    val.push(input.value);

    if (linkIndex === 0) {
      todos.insertAdjacentHTML(
        'beforeend',
        ` <div class="p-2 list my-1 All">
    <div class="tasks">
      <span class="checks me-3"></span>
      <span class="event">${val[val.length - 1]}</span>
      <i class="fa-solid fa-trash ms-auto me-2 trash"></i>
    </div>
    <div class = "due ms-4 ps-2 mb-2"></div>
  </div>`
      );
    } else if (linkIndex !== 0) {
      todos.insertAdjacentHTML(
        'beforeend',
        ` <div class="p-2 list my-1 All grouped ${
          links[linkIndex].textContent
        }">
    <div class="tasks">
      <span class="checks me-3"></span>
      <span class="event">${val[val.length - 1]}</span>
      <i class="fa-solid fa-trash ms-auto me-2 trash"></i>
    </div>
    <div class = "due ms-4 ps-2 mb-2"></div>
  </div>`
      );
    }

    const todo = todos.querySelectorAll('.list');
    categoryDisplay(todo);
    input.value = '';
    d.push('');
    t.push('');
  }
}

//Inputing tasks
function inputATask() {
  add.addEventListener('click', addATask);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addATask();
    }
  });
}
inputATask();

//Completing Task, Selecting Due date and Categories
function task() {
  todos.addEventListener('click', function (e) {
    const newList = this.querySelectorAll('.list');
    newList.forEach(function (l, i) {
      if (e.target.closest('.list') === l) {
        index = i;
      }
    });
    if (e.target.classList.contains('checks')) {
      e.target.style.backgroundColor = '#1597BB';

      if (e.target.closest('.list').classList.contains('Completed')) {
        e.target.style.backgroundColor = 'inherit';
        e.target.closest('.list').style.opacity = '1';
        e.target.closest('.list').classList.add('anim');
        setTimeout(function () {
          e.target.closest('.list').classList.add('hidden');
          e.target.closest('.list').classList.remove('Completed');
        }, 500);
      } else {
        e.target.closest('.list').classList.add('anim');
        if (e.target.closest('.due')) {
          dueText = e.target.closest('.due').innerHTML;
        }
        setTimeout(function () {
          e.target.closest('.list').classList.add('hidden');
          e.target.closest('.list').classList.add('Completed');
        }, 500);
      }
    } else if (e.target.classList.contains('trash')) {
      e.target.closest('.list').remove();
    } else if (e.target.closest('.list')) {
      overlay.classList.remove('hidden');
      modal.classList.remove('hidden');
    }
  });
}
task();

//Task Change
function taskChange() {
  document.addEventListener('keypress', function (e) {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Enter') {
        todos.querySelectorAll('.event')[index].textContent = modalInput.value;
      }
    }
  });
}
taskChange();

//Category Display in modal
function categoryDisplay(todo) {
  todo.forEach(function (m) {
    m.addEventListener('click', function (e) {
      item.forEach(function (n) {
        if (!e.target.closest('.list').classList.contains(`grouped`)) {
          action[1].querySelector('span').innerHTML = 'Category';
        } else if (
          e.target.closest('.list').classList.contains(`${n.innerHTML}`) &&
          e.target.closest('.list').classList.contains(`grouped`)
        ) {
          action[1].querySelector('span').innerHTML = `${n.innerHTML}`;
        }
      });

      const eve = e.target.closest('.list').querySelector('.event');
      modalInput.value = eve.innerHTML;
    });
  });
}

//Exit Modal
function exitMmodal() {
  const spanCat = action[1].querySelector('span').innerHTML;
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
  category.classList.add('hidden');
  todos.querySelectorAll('.event')[index].textContent = modalInput.value;
}

overlay.addEventListener('click', exitMmodal);
closeModal.addEventListener('click', exitMmodal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    exitMmodal();
  }
});

//Setting Date
function dateSet() {
  set.addEventListener('click', function () {
    let currentTime = new Date();
    let day = currentTime.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let timeInterval;
    let timeVal = timeSet.value;
    t[index] = `${timeVal}:00`;
    let dateVal = date.value;
    let splitDate = dateVal.slice(5);
    d[index] = splitDate;

    for (let i = 2; i <= 7; i++) {
      if (Number(splitDate.slice(3)) === Number(day)) {
        timeInterval = 'Today';
      } else if (Number(splitDate.slice(3)) === day - 1) {
        timeInterval = 'Yesterday';
      } else if (Number(splitDate.slice(3)) === day - i) {
        timeInterval = `${i} days ago`;
        break;
      } else {
        timeInterval = splitDate;
      }
    }

    let duse = todos.querySelectorAll('.due');
    duse.forEach(function (r, s) {
      if (r.innerHTML && s === index) {
        r.innerHTML = `${timeInterval}  ${timeVal}`;
      } else if (
        modalInput.value ===
          todos.querySelectorAll('.event')[index].innerHTML &&
        s === index
      ) {
        r.innerHTML = `${timeInterval}  ${timeVal}`;
      }
    });
  });
}

dateSet();

//Date, time and Categories open
function disp() {
  modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('actions-1')) {
      actionD.classList.toggle('date-time');
    }
    if (e.target.classList.contains('actions-2')) {
      category.classList.toggle('hidden');
    }
    if (
      e.target.classList.contains('modal-task') &&
      !category.classList.contains('hidden')
    ) {
      category.classList.add('hidden');
    }
  });
}
disp();

//Over due
function overDue() {
  //Time
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let sec = currentTime.getSeconds();
  let day = currentTime.getDate();
  let month = currentTime.getMonth() + 1;

  todos.querySelectorAll('.list').forEach(function (li, listIndex, listArray) {
    if (listArray.length !== 0) {
      if (!li.classList.contains('Completed')) {
        if (minutes < 10) {
          minutes = '0' + minutes;
        }
        if (hours < 10) {
          hours = '0' + hours;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }

        let t_str = hours + ':' + minutes + ':' + sec;

        //Day
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        let d_str = `${month}-${day}`;

        d.forEach(function (n, i) {
          if (t[i] === t_str && n === d_str) {
            alert(`${todos.querySelectorAll('.event')[i].textContent} is due`);
          }
        });
      }
    }
  });

  //Color change
  let tstr = Number(hours) * 60 + Number(minutes);
  let c;
  d.forEach(function (k, i) {
    let mint = Number(t[i].slice(0, 2)) * 60 + Number(t[i].slice(3, 5));
    if (d === '') {
      c++;
      if (c == d.length) {
        d = d;
      }
    } else if (Number(k.slice(0, 2)) < Number(month)) {
      todos.querySelectorAll('.due')[i].style.color = '#CA3E47';
    } else if (Number(k.slice(0, 2)) === Number(month)) {
      if (Number(k.slice(-2)) < Number(day)) {
        todos.querySelectorAll('.due')[i].style.color = '#CA3E47';
      } else if (Number(k.slice(-2)) > Number(day)) {
        todos.querySelectorAll('.due')[i].style.color = '#29c7ac';
      }
      if (Number(k.slice(-2)) === Number(day)) {
        if (mint <= tstr) {
          todos.querySelectorAll('.due')[i].style.color = '#CA3E47';
        } else if (mint > tstr) {
          todos.querySelectorAll('.due')[i].style.color = '#29c7ac';
        }
      }
    } else if (Number(k.slice(0, 2)) > Number(month)) {
      todos.querySelectorAll('.due')[i].style.color = '#29c7ac';
    }
  });
}

setInterval(overDue, 1000);

//Grouping
function grouping() {
  category.addEventListener('click', function (e) {
    let group = todos.querySelectorAll('.list');
    if (e.target.classList.contains('items')) {
      item.forEach(function (n, i) {
        if (
          group[index].classList.contains(`${n.innerHTML}`) &&
          n.innerHTML !== 'All'
        ) {
          group[index].classList.remove(`${n.innerHTML}`);
          group[index].classList.add(`${e.target.innerHTML}`);
          group[index].classList.add('grouped');
        } else {
          group[index].classList.add(`${e.target.innerHTML}`);
          group[index].classList.add('grouped');
        }
        itemIndex = i;
      });
      category.classList.add('hidden');
      action[1].querySelector('span').innerHTML = `${e.target.innerHTML}`;
    }
  });
}

grouping();

//Category
function Viewgroup() {
  btnDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('links')) {
      noTask.style.display = 'none';
      noTaskText.classList.add('hidden');
      newNav.innerHTML = `${e.target.innerHTML}`;

      let catList = todos.querySelectorAll('.list');

      if (catList.length === 0) {
        noTask.style.display = 'flex';
        noTaskText.classList.remove('hidden');
      }

      catList.forEach(function (k, h) {
        k.classList.remove('anim');
        k.style.opacity = '1';
        if (k.classList.contains('Completed')) {
          if (e.target.innerHTML === 'Completed') {
            k.classList.remove('hidden');
            k.classList.remove('anim');
            k.style.opacity = '0.5';
          } else {
            k.classList.add('hidden');
          }
        } else {
          k.classList.remove('hidden');
        }
      });
      links.forEach(function (l, i) {
        if (e.target === l) {
          l.classList.remove('btn');
          linkIndex = i;
          for (let j = 0; j < links.length; j++) {
            if (links[j].classList.contains('link-active')) {
              links[j].classList.remove('link-active');
            }
          }
          l.classList.add('link-active');
          catList.forEach(function (p) {
            if (!p.classList.contains(`${every[i]}`)) {
              p.classList.add('hidden');
            }
          });
        }
      });
    }
  });
}

Viewgroup();

//Small Screens

function collapse() {
  smallNav.addEventListener('click', function (e) {
    if (e.target.closest('.nav-2')) {
      btnDiv.classList.toggle('fler');
      links.forEach(function (n) {
        n.classList.add('btn');
        n.classList.remove('link-active');
      });
    }
  });
  document.addEventListener('click', function (e) {
    if (btnDiv.classList.contains('fler') && !e.target.closest('.nav-2')) {
      btnDiv.classList.remove('fler');
    }
  });
}
collapse();
