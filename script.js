
function composeMail(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name') || '');
  const email = encodeURIComponent(data.get('email') || '');
  const mode = encodeURIComponent(data.get('mode') || '');
  const message = encodeURIComponent(data.get('message') || '');
  const subject = encodeURIComponent('Intro Call Request');
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\nPreferred mode: ${decodeURIComponent(mode)}\n\nMessage:\n${decodeURIComponent(message)}`);
  window.location.href = `mailto:beraiaguram78@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}
