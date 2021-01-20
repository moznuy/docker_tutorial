let messages = [];
let messagesContainer = document.querySelector('#messages');
let inputUser = document.querySelector('#user');
let inputText = document.querySelector('#text');
let submitButton = document.querySelector('#submit');
let clearButton = document.querySelector('#clear');


async function loaded() {
  const resp = await fetch("//127.0.0.1:8000/api/message/");
  const payload = await resp.json();

  messages = payload;
  console.log(messages);
  updateDom();
}

async function delete_message(id) {
  const resp = await fetch(`//127.0.0.1:8000/api/message/${id}/`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
  });

  messages = messages.filter(item => item.id !== id);

  updateDom();
}

function updateDom() {
  messagesContainer.innerHTML = '';

  const newElements = messages.map(item => {
    const elem = document.createElement("p");
    const {id, posted, text, user} = item;
    elem.innerHTML = `${id} ${posted} ${text} ${user} <button onclick="delete_message(${id})">X</button>`;
    return elem;
  });

  newElements.forEach(item => messagesContainer.appendChild(item));
}

async function post(ev) {
  console.log(inputUser.value);
  console.log(inputText.value);

    const resp = await fetch("//127.0.0.1:8000/api/message/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        text: inputText.value,
        user: inputUser.value,
      })
    });
  const payload = await resp.json();
  messages = [payload ,...messages];

  // loaded();
  updateDom();
}

async function clear(ev) {
    const resp = await fetch("//127.0.0.1:8000/api/message/clear/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // 204
    messages = [];
    updateDom();
}

document.addEventListener("DOMContentLoaded", loaded);
submitButton.addEventListener("click", post);
clearButton.addEventListener("click", clear);
