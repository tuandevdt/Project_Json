let userAPI = "http://localhost:3000/users";

function registerUser() {
  handleRegisterUser();
}

async function generateUniqueUserId() {
  try {
    // Lấy danh sách sản phẩm từ API
    const response = await fetch(userAPI);
    const users = await response.json();

    // Tìm ID lớn nhất trong danh sách sản phẩm
    const maxId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;

    // Tăng ID lên 1
    lastId = maxId + 1;

    return lastId;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

// function handleRegisterUser() {
//     let registerBtn = document.getElementById('form-login-register');
//     registerBtn.addEventListener('submit', async (event) => {
//         event.preventDefault();
//         let name = document.querySelector('input[name="username"]').value;
//         let email = document.querySelector('input[name="email"]').value;
//         let password = document.querySelector('input[name="password-re"]').value;
//         let confirmpass = document.querySelector('input[name="confirmpass"]').value;
//         let currentDate = new Date();
//         let date = currentDate.toLocaleString();
//         let formData = {
//             id: (await generateUniqueUserId()).toString(),
//             name: name,
//             email: email,
//             password: password,
//             status: "active",
//             role: "user",
//             date: date
//         }
//         console.log(formData);
//         if(password === confirmpass) {
//             register(formData);
//         } else {
//             registerUser();
//         }

//     })
// }

async function handleRegisterUser() {
  let registerForm = document.getElementById("form-login-register");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Cập nhật lại các biến sau mỗi lần submit
    let name = document.querySelector('input[name="username"]').value.trim();
    let email = document.querySelector('input[name="email"]').value.trim();
    let password = document.querySelector('input[name="password-re"]').value.trim();
    let confirmpass = document.querySelector('input[name="confirmpass"]').value.trim();
    
    console.log("name:",name,"email: ",email,"pass: ",password,"confirmpass: ",confirmpass);
    // Kiểm tra xem các trường bắt buộc đã được điền đầy đủ chưa
    if (!name || !email || !password || !confirmpass) {
      // Hiển thị thông báo lỗi hoặc xử lý validation
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra xem email đã tồn tại chưa
    let existingUser = await checkEmailExists(email);
    if (existingUser) {
      document.querySelector(".error-mail-register").textContent =
        "Email đã tồn tại trong hệ thống!";
      return;
    }

    document.querySelector(".error-mail-register").textContent = "";

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmpass) {
      // Hiển thị thông báo lỗi hoặc xử lý validation
      alert("Mật khẩu không khớp!");
      return;
    }

    let currentDate = new Date();
    let date = currentDate.toLocaleString();
    let formData = {
      id: (await generateUniqueUserId()).toString(),
      name: name,
      email: email,
      password: password,
      status: "active",
      role: "user",
      date: date,
    };

    await register(formData);

    // Hiển thị thông báo thành công và chuyển hướng
    alert("Đăng ký thành công!");
    window.location.href = "index.html";
  });
}

async function checkEmailExists(email) {
  try {
    const response = await fetch(userAPI);
    const users = await response.json();
    return users.some((user) => user.email === email);
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}

function register(data) {
  return fetch(userAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.error("Error registering user:", error);
    });
}
