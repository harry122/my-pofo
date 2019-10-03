let frm = document.querySelector("#contactForm");
let messagePara = document.querySelector("#resp");
function forHandler(e) {
e.preventDefault();
    let data = {
        name : document.querySelector("input[name=name]").value,
        email : document.querySelector("input[name=email]").value,
        mobile :document.querySelector("input[name=mobile]").value,
        description:document.querySelector("textarea[name=desc]").value
    }
    console.log(data);

fetch("/contact",{
    method: 'POST',
    headers: {
        'content-type' : 'application/json'
    },
    body :JSON.stringify(data),
}).then(resp => resp.json())
.then(data => {
    messagePara.innerText = data.message;
    messagePara.style.backgroundColor = 'red';
}).catch(err =>{
    messagePara.innerText = data.message;
    messagePara.style.backgroundColor = 'red';
})

}

frm.addEventListener("submit", forHandler);

