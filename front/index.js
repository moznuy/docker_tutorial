
let messages = [];
const container = document.querySelector("#messages");

async function loaded() {
    const resp = await fetch("/api/message/");
    const data = await resp.json();
    messages = data;

    update_dom();
};

function update_dom() {
    const message_elements = messages.map((message) => {
        const {id, user, text, posted} = message;
        const el = document.createElement("p");
        el.innerText = `${id} ${posted} by: ${user} :: ${text}`;
        return el;
    })
    container.innerHTML = '';
    message_elements.forEach(element => {
        container.appendChild(element);
    });
    
}

document.addEventListener("DOMContentLoaded", loaded);
