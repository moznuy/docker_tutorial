async function load_messages(messagesContainer, messages, setMessages) {
  const resp = await fetch("//127.0.0.1:8000/api/message/", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access')}`
    },
  });

  const payload = await resp.json();
  if (resp.status !== 200) {
    console.error(resp.status);
    return
  }

  messages = setMessages(payload);
  updateDom(messagesContainer, messages);
}

async function login_post(username, password) {
  const resp = await fetch("//127.0.0.1:8000/auth/token/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  });

  if (resp.status !== 200) {
    console.error(resp.status);
    return
  }

  localStorage.setItem('access', (await resp.json()).access);
  drawPage()
}

function drawPage() {
  const body = document.querySelector('body');
  body.innerHTML = '';

  if (localStorage.getItem('access') === null) {
    body.innerHTML = `
      <input id="username" type="text" value="admin">
      <input id="password" type="text" value="lol">
      <button id="submit">Post</button>
    `
    const submitButton = document.querySelector('#submit');
    const inputUsername = document.querySelector('#username');
    const inputPassword = document.querySelector('#password');
    submitButton.addEventListener("click", () => login_post(inputUsername.value, inputPassword.value));
  } else {
    body.innerHTML = `
      <h1>Hello</h1>
      <button id="logout">Logout</button><br>
      <button id="clear">Clear</button><br>
      <input id="text" type="text">
      <button id="submit">Post</button>
      <div id="messages"></div>
    `
    let messages = [];
    const setMessages = function (value) {
      messages = value;
      return messages;
    }

    const messagesContainer = document.querySelector('#messages');
    const inputText = document.querySelector('#text');
    const submitButton = document.querySelector('#submit');
    const clearButton = document.querySelector('#clear');
    const logoutButton = document.querySelector('#logout');

    submitButton.addEventListener("click", () => post(messagesContainer, inputText.value, messages, setMessages));
    clearButton.addEventListener ("click", () => clear(messagesContainer, messages, setMessages));
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem('access');
      drawPage();
    });

    load_messages(messagesContainer, messages, setMessages);
  }
}

function loaded() {
  drawPage()
}

async function delete_message(messagesContainer, id, messages, setMessages) {
  const resp = await fetch(`//127.0.0.1:8000/api/message/${id}/`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
  });

    if (resp.status !== 204) {
    console.error(resp.status);
    return
  }

  messages = setMessages(messages.filter(item => item.id !== id));

  updateDom(messagesContainer, messages);
}

function updateDom(messagesContainer, messages) {
  messagesContainer.innerHTML = '';

  const newElements = messages.map(item => {
    const elem = document.createElement("p");
    const {id, posted, text, user} = item;
    elem.innerHTML = `${id} ${posted} ${text} ${user} <button onclick="">X</button>`;

    elem
      .querySelector('button')
      .addEventListener('click', () => {delete_message(messagesContainer, id)})
    return elem;
  });

  newElements.forEach(item => messagesContainer.appendChild(item));
}

async function post(messagesContainer, text, messages, setMessages) {
  console.log(text);

  const resp = await fetch("//127.0.0.1:8000/api/message/", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
    },
    body: JSON.stringify({
      text,
    })
  });

  if (resp.status !== 201) {
    console.error(resp.status);
    return
  }

  const payload = await resp.json();
  messages = setMessages([payload ,...messages]);

  updateDom(messagesContainer, messages);
}

async function clear(messagesContainer, messages, setMessages) {
    const resp = await fetch("//127.0.0.1:8000/api/message/clear/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    });
    // 204
    messages = setMessages([]);
    updateDom(messagesContainer, messages);
}

document.addEventListener("DOMContentLoaded", loaded);
