const infoCodeBlock = `
class Student {
    constructor() {
        this.name = "Boukerram Khadidja";
        this.country = "Algeria";
        this.university = "University of Béjaia";
        this.major = "Computer Science";
        this.about = \`I am a computer science student who is passionate about web development and software engineering.
                      I am always eager to learn new technologies and improve my skills.
                      I am a hardworking and dedicated person who is always looking for new challenges and opportunities to grow.\`;
        this.skills = ["HTML", "CSS", "JavaScript", "C", "Java", "MATLAB", "MIPS R3000"];
    }
}

`;

const codeBlock = document.getElementById("code");
codeBlock.textContent = infoCodeBlock;
window.Prism.highlightElement(codeBlock);

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}
function validateEmail(email) {
  //This is a simple email validation function, j'ai utlise les experssion reguliere pour valider l'email
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateName(name) {
  var re = /^[a-zA-Z ]{2,30}$/;
  return re.test(String(name)) && name.length > 0 && name.length <= 30;
}
function sendEmail() {
  //coordonnées de l'api emailjs
  let serviceId = "service_vdvpy5i";
  let templateId = "template_wxm136q";

  //recuperation des valeurs des inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!validateEmail(email)) {
    alert("Invalid email address");
    return;
  }

  if (!validateName(name)) {
    alert("Invalid name");
    return;
  }

  const emailPayload = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
  };

  emailjs
    .send(serviceId, templateId, emailPayload)
    .then((res) => {
      alert("Email sent successfully");
    })
    .catch((err) => {
      alert("Failed to send email");
    });
}
