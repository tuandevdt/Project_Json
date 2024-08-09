function user_manager() {
  let buttons = document.querySelectorAll(".btn-update");
  let idUpdateInput = document.getElementById("id-update");
  let closeForm = document.querySelector(".btn-close");
  buttons.forEach(function (button) {
    button.addEventListener("click", () => {
      document.querySelector(".form-edit").classList.remove("none-active");
      idUpdateInput.value = button.value;
    });
  });
  closeForm.addEventListener("click", () => {
    document.querySelector(".form-edit").classList.add("none-active");
  });
}

function category_manager() {
  let buttons = document.querySelectorAll(".btn-delete-category");
  let idUpdateInput = document.getElementById("id-update");
  buttons.forEach(function (button) {
    button.addEventListener("click", () => {
      document.querySelector(".form-edit").classList.remove("none-active");
      idUpdateInput.value = button.value;
      document.querySelector(".none").addEventListener("click", () => {
        document.querySelector(".form-edit").classList.add("none-active");
      });
    });
  });
}

function product_manager() {
  let buttons = document.querySelectorAll(".btn-delete-category");
  let idUpdateInput = document.getElementById("id-update");
  buttons.forEach(function (button) {
    button.addEventListener("click", () => {
      document.querySelector(".form-edit").classList.remove("none-active");
      idUpdateInput.value = button.value;
      document.querySelector(".none").addEventListener("click", () => {
        document.querySelector(".form-edit").classList.add("none-active");
      });
    });
  });
}

function clickOpenFormCreateProduct() {
  let btnClick = document.querySelector(".create-new");
  btnClick.addEventListener("click", () => {
    document
      .querySelector(".form-create-product")
      .classList.remove("none-active");
  });
  document.querySelector(".btn-close").addEventListener("click", () => {
    document.querySelector(".form-create-product").classList.add("none-active");
  });
}


function getIdProductWhenUpdate(callback) {
  let btnUpdates = document.querySelectorAll(".btn-update");
  let idProducts = document.querySelectorAll(".id-product");

  btnUpdates.forEach((button, index) => {
    button.addEventListener("click", () => {
      console.log(button);
      
      let idproduct = idProducts[index].value;
      callback(idproduct);
      document.querySelector('.form-update-product').classList.remove('none-active');
    });
  });
  document.querySelector('.btn-close-update').addEventListener("click", () => {
    document.querySelector(".form-update-product").classList.add("none-active");
  });
}

function checkStatusLogin() {

  // Check if a user is logged in
  const user = JSON.parse(sessionStorage.getItem('user'));
  const loginLogoutElement = document.getElementById('login-logout');
  if (user) {
    // Create the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    const logoutLink = document.createElement('a');
    logoutLink.textContent = 'Đăng xuất';
    logoutLink.addEventListener('click', () => {
      // Implement your logout functionality here
      sessionStorage.removeItem('user');
      window.location.href = "../../index.html";
    });

    dropdownMenu.appendChild(logoutLink);

    loginLogoutElement.textContent = user.name;
    loginLogoutElement.appendChild(dropdownMenu);
  } else {
    login = document.getElementById('login-logout');
    login.innerHTML = '<a href="../index.html">Đăng nhập</a>';
    
  }
}

