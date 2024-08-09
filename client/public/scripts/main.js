//SCROLL MENU HEADER
window.onscroll = function () {
  let menuHeader = document.querySelector(".second-hd-contai");
  // console.info(document.documentElement.scrollTop);

  if (document.documentElement.scrollTop > 100) {
    menuHeader.classList.add("second-hd-contai-scroll");
  } else {
    menuHeader.classList.remove("second-hd-contai-scroll");
  }
};

//HÀM CHANGE SLIDER
let changeSlider = () => {
  let listIcons = document.querySelectorAll(".item-icon");
  document.getElementById("list-slider-sp").appendChild(listIcons[0]);
};

let timeChangeSlider = setInterval(changeSlider, 1000);

//CLICK ICON SUPPORT SHOW INFOR
let iconSupport = document.querySelector(".list-icon-support");
let closeSupport = document.querySelector(".close-support");
iconSupport.addEventListener("click", () => {
  iconSupport.classList.add("none-open");
  closeSupport.classList.remove("none-open");
  document.querySelector(".open-support").classList.remove("none-open");
});
closeSupport.addEventListener("click", () => {
  iconSupport.classList.remove("none-open");
  closeSupport.classList.add("none-open");
  document.querySelector(".open-support").classList.add("none-open");
});

//IN RA SỐ LƯỢNG GIỎ HÀNG TRÊN MENU GIỎ HÀNG
async function displaycheckTotalCart(userid) {
  const totalQuantity = await checkTotalCart(userid);
  let totalCart = document.getElementById("total-cart");
  totalCart.innerText = totalQuantity;
}


function checkStatusLogin() {
  // Check if a user is logged in
  const user = JSON.parse(sessionStorage.getItem("user"));
  const loginLogoutElement = document.getElementById("login-logout");
  if (user) {
    // Create the dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    const logoutLink = document.createElement("a");
    logoutLink.textContent = "Đăng xuất";
    logoutLink.addEventListener("click", () => {
      // Xóa thông tin người dùng khỏi sessionStorage
      sessionStorage.removeItem("user");
    
      // Xóa các session liên quan đến lượt xem sản phẩm
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("updated_view_")) {
          sessionStorage.removeItem(key);
        }
      }
    
      // Chuyển hướng người dùng về trang đăng nhập
      window.location.href = "../index.html";
    });
    if (user.role == "user") {
      let linkadmin = document.getElementById("link-admin");
      // if(linkadmin) {
      //   linkadmin.style.display = 'none';
      // }
      linkadmin.style.display = "none";
    }

    dropdownMenu.appendChild(logoutLink);

    loginLogoutElement.textContent = user.name;
    loginLogoutElement.appendChild(dropdownMenu);
    return user.id;
  } else {
    login = document.getElementById("login-logout");
    login.innerHTML = '<a href="../index.html">Đăng nhập</a>';
  }
}
