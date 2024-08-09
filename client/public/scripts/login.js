


function validFormLoginRegister() {

let forGotPassa = document.querySelector('.forgot-pass-index');
forGotPassa.addEventListener('click', () => {
    document.querySelector('.wrapper-login').classList.remove('wrapper');
    document.querySelector('.wrapper-login').classList.add('wrapper-turn-off');
    document.querySelector('.return-pass').classList.add('wrapper');
    document.querySelector('.return-pass').classList.remove('wrapper-turn-off');
});
document.querySelector('.return-login').addEventListener('click', () => {
    document.querySelector('.return-pass').classList.add('wrapper-turn-off');
    document.querySelector('.return-pass').classList.remove('wrapper');
    document.querySelector('.wrapper-login').classList.add('wrapper');
    document.querySelector('.wrapper-login').classList.remove('wrapper-turn-off');
});


//FORM LOGIN-REGISTER
    let formLogin = document.getElementById('login-index');
    let RegisterNow = document.getElementById('now-register');
    let loginNow = document.getElementById('now-login');
    let formRegister = document.getElementById('register-index');


    RegisterNow.addEventListener('click', () => {
        formLogin.classList.remove('wrapper');
        formLogin.classList.add('wrapper-turn-off');

        formRegister.classList.remove('wrapper-turn-off');
        formRegister.classList.add('wrapper');
    });

    loginNow.addEventListener('click', () => {
        formRegister.classList.remove('wrapper');
        formRegister.classList.add('wrapper-turn-off');

        formLogin.classList.remove('wrapper-turn-off');
        formLogin.classList.add('wrapper');
    });
}
