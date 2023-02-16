const socket = io.connect();

const avatar = "avatar" + getRandomInt(1, 8) + ".png";
let usuario = "XnobodyX_";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enviarMensaje(evt) {
  if (evt.key === "Enter") {
    const frase = input_msg.value.trim();
    if (frase.length > 0) {
      let today = new Date();
      let ahora = today.toLocaleString();
      if (frase.substring(0, 1) === "/") {
        if (usuario === "XnobodyX_") {
          let texto = frase.substring(1);
          let campos = texto.split(" ");
          if (campos.length > 1) {
            if (campos[0] === "join") {
              usuario = campos[1];
            }
          }
        }
        input_msg.value = "";
      } else if (usuario !== "XnobodyX_") {
        input_msg.value = "";
        const mensaje = {
          user: usuario,
          date: ahora,
          message: frase,
          avatar: avatar,
        };
        fetch("/api/messages", {
          method: "POST",
          body: JSON.stringify({ msg: mensaje }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            res
              .json()
              .then((response) => {
                console.log("Success:", response);
                socket.emit("new-message");
              })
              .catch((e) => console.log(e));
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  }
}

const input_msg = document.getElementById("msg_input_text");
const msg_textarea = document.getElementById("msg_textarea");
input_msg?.addEventListener("keyup", enviarMensaje);

socket.on("all_mensajes", (mensajes) => {
  let html = "";
  if (mensajes.length > 0) {
    mensajes.forEach((m) => {
      if (m.user === usuario) {
        html += `
        <div class="chat-message-right mb-4">
          <div>
              <img src="./images/${m.avatar}"
                  class="rounded-circle mr-1" alt="usuario" width="40" height="40">
              <div class="text-muted small text-nowrap mt-2">${m.date}</div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
              <div class="font-weight-bold mb-1">${usuario}</div>
              ${m.message}
          </div>
        </div>`;
      } else {
        html += `
          <div class="chat-message-left pb-4">
            <div>
                <img src="./images/${m.avatar}"
                    class="rounded-circle mr-1" alt="usuario" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${m.date}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">${m.user}</div>
                ${m.message}
            </div>
          </div>`;
      }
    });
    msg_textarea.innerHTML = html;
  }
});
