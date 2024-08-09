let userAPI = "http://localhost:3000/users";
let productAPI = "http://localhost:3000/products";
let categoryAPI = "http://localhost:3000/categories";
let cartAPI = "http://localhost:3000/cart";
let orderAPI = "http://localhost:3000/orders";
let orderDetailAPI = "http://localhost:3000/order_detail";
let commentAPI = "http://localhost:3000/comment";
let API = "http://localhost:3000/";

//CHECK TOTAL CART SHOW ON HEADER
function checkTotalCart(userid) {
  return fetch(`${cartAPI}?userid=${userid}`)
    .then((response) => response.json())
    .then((cart) => {
      let total = 0;
      for (let item of cart) {
        total += parseInt(item.quantity);
      }
      return total;
    });
}

//PRODUCTS
function startProducts() {
  getProductByID(renderProducts, 2);
}
function startProductsIndex1() {
  getProductByID(renderProductsIndex1, 1);
}
function getProducts(callback) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function getProductByID(callback, id) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      // Lọc ra các products có categoryId = 1,2,3
      const filteredProducts = products.filter(
        (product) => product.categoryid === id
      );
      callback(filteredProducts);
    });
}
function renderProducts(products) {
  let listproducts = document.getElementById("models-sale");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <div class="sale-model">
                <div class="model-sl">
                    <a href="detail.html?data-id=${product.id}">
                        <img src="${product.image}" alt="">
                    </a>
                    <div class="name-model">
                        <h5>
                            ${product.price.toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })} VND
                        </h5>
                        <a href="detail.html?data-id=${product.id}">
                            <h4>${product.name}</h4>
                        </a>
                        <button><a href="detail.html?data-id=${
                          product.id
                        }">Hot New Product</a></button>
                    </div>

                </div>
            </div>  
      `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products element not found");
  }
}
function renderProductsIndex1(products) {
  let listproducts = document.getElementById("models-slid");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <div class="img-model">
                <a href="detail.html?data-id=${product.id}">
                    <img src="${product.image}" alt="">
                </a>
                <div class="name-model">
                    <a href="detail.html?data-id=${product.id}">
                        <h3>${product.name}</h3>
                    </a>
                </div>
            </div>
      `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products element not found");
  }
}


//SHOW LIST CATEGORY ON products
function startCategories() {
  getCategories(renderCategories);
}
function startProductId1() {
  getProductByID(renderProduct1, 1);
}
function startProductId2() {
  getProductByID(renderProduct2, 2);
}
function startProductId3() {
  getProductByID(renderProduct3, 3);
}
function getCategories(callback) {
  fetch(categoryAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderCategories(categories) {
  let listcategories = document.getElementById("categories-id");
  if (listcategories) {
    let htmls = categories.map(function (category) {
      return `
            <li class="menu-item active-title-product">${category.name}</li>
      `;
    });
    listcategories.innerHTML = htmls.join("");
  } else {
    console.error("list-categories element not found");
  }
}

//SHOW LIST PRODUCT BY CATEGORY
function renderProduct1(products) {
  let listproducts = document.getElementById("products-a");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <div class="pro-item">
                <div class="model-sl">
                    <div class="img-sell">
                        <a href="detail.html?data-id=${product.id}">
                            <img src="${product.image}" alt="">
                        </a>
                    </div>
                    <div class="name-product-item">
                        <a href="detail.html?data-id=${product.id}">
                            <h5>
                                ${product.price.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })} VND
                            </h5>
                        </a>
                        <span>${product.name}</span>
                    </div>
                </div>
            </div>
      `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products in category 1 element not found");
  }
}
function renderProduct2(products) {
  let listproducts = document.getElementById("products-b");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <div class="pro-item">
                <div class="model-sl">
                    <div class="img-sell">
                        <a href="detail.html?data-id=${product.id}">
                            <img src="${product.image}" alt="">
                        </a>
                    </div>
                    <div class="name-product-item">
                        <a href="detail.html?data-id=${product.id}">
                            <h5>
                                ${product.price.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })} VND
                            </h5>
                        </a>
                        <span>${product.name}</span>
                    </div>
                </div>
            </div>
      `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products in category 1 element not found");
  }
}
function renderProduct3(products) {
  let listproducts = document.getElementById("products-c");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <div class="pro-item">
                <div class="model-sl">
                    <div class="img-sell">
                        <a href="detail.html?data-id=${product.id}">
                            <img src="${product.image}" alt="">
                        </a>
                    </div>
                    <div class="name-product-item">
                        <a href="detail.html?data-id=${product.id}">
                            <h5>
                                ${product.price.toLocaleString("en-US", {
                                  style: "decimal",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })} VND
                            </h5>
                        </a>
                        <span>${product.name}</span>
                    </div>
                </div>
            </div>
      `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products in category 1 element not found");
  }
}

//DETAIL
function startDetail(id, callback) {
  getProducts(renderDetail(id));
  callback();
}
function startAddCart(userid) {
  handleAddCart(userid);
}
function addToCart(product) {
  fetch(cartAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then(function (response) {
      response.json();
    })
    .then(function (data) {
      // Xử lý kết quả thành công, như cập nhật giao diện người dùng
      alert("Sản phẩm đã được thêm vào giỏ hàng");
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    });
}
async function checkProductInCart(userid, productid) {
  // Thực hiện API call để lấy danh sách sản phẩm trong giỏ hàng của người dùng
  const response = await fetch(`${cartAPI}?userid=${userid}`);
  const cartItems = await response.json();

  // Kiểm tra xem sản phẩm có trong giỏ hàng chưa
  const existingCartItem = cartItems.find(
    (item) => item.productid === productid
  );
  return existingCartItem;
}
async function handleAddCart(userid) {
  let form = document.getElementById("form-add-cart");
  console.log(form);

  // Add an event listener to the form's submit event
  form.addEventListener("submit", async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    const productid = formData.get("id");

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingCartItem = await checkProductInCart(userid, productid);

    if (existingCartItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
      existingCartItem.quantity += 1;
      await updateCartItem(existingCartItem);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới
      const uniqueId = await generateUniqueIdCart();
      const cartItem = {
        id: uniqueId.toString(),
        productid: productid,
        userid: parseInt(userid),
        quantity: parseInt(formData.get("number-detail")),
      };
      await addToCart(cartItem);
    }
  });
}
function renderDetail(id) {
  let productElement = document.getElementById("detail-product");
    fetch(`${productAPI}/${id}`)
      .then((response) => response.json())
      .then((product) => {
        let productHTML = `
          <div class="img-first-content">
                <img src="${product.image}" alt="">
            </div>
            <div class="infor-first-content">
                <form id="form-add-cart" action="" method="POST">
                    <div class="title-detail">
                        <div class="name-detail"></div>
                        <input type="hidden" name="name_product" value="${
                          product.name
                        }">
                        <input type="hidden" name="id" value="${product.id}">
                        <div class="name-detail title-name">${
                          product.name
                        }</div>
                        <input id="userid" type="hidden" name="userid">
                    </div>
                      <div class="vote-star">
                        <div class="star">
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star-half'></i>
                         </div>
                        <div class="vote">
                            50 đánh giá
                        </div>
                    </div>
                    <div class="img-right-detail">
                        <div class="price">
                          ${product.price.toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })} VND
                        </div>
                        <input type="hidden" value="${
                          product.price
                        }" name="price-add">
                        <div class="VAT">(Giá trên đã bao gồm VAT)</div>
                        <input type="hidden" name="img_product" value="${
                          product.image
                        }">
                    </div>
                    <div class="content-detail">
                         <p>${product.description}</p>
                    </div>
                    <div class="btn-detail">
                         <div class="views-and-sales">
                             <div class="views-count">
                                 <span>Lượt xem: ${product.view}</span>
                            </div>
                            <div class="views-count">
                                 <span>Số lượng: 50</span>
                            </div>
                         </div>
                        <input class="numberProduct" type="hidden" value="1" name="number-detail">
                        <button class="addcart">Thêm vào giỏ hàng</button>
                        <span class="favourite"><i class='bx bxs-phone-call'></i> Hoặc liên hệ qua số điện
                            thoại: 036.293.1719 </span>

                     </div>
                </form>
            </div>
        `;
        productElement.innerHTML = productHTML;
      })
}
function updateViewProduct(id) {
  // Kiểm tra xem đã cập nhật lượt xem trong phiên làm việc chưa
  if (!sessionStorage.getItem(`updated_view_${id}`)) {
    let API = `${productAPI}/${id}`;
    fetch(API)
      .then(response => response.json())
      .then(data => {
        // Cập nhật lượt xem
        fetch(API, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ view: data.view + 1 })
        })
        .then(response => response.json())
        .then(() => {
          // Lưu trạng thái đã cập nhật lượt xem vào sessionStorage
          sessionStorage.setItem(`updated_view_${id}`, true);
        });
      });
  }
}



//COMMENT
function addComment(userid,id) {
  let sendCmt = document.querySelector("#send-comment");
  sendCmt.addEventListener("click", (e) => {
    e.preventDefault();
    let text = document.querySelector('textarea[name="comment"]').value;
    let idproduct = id;
    let currentDate = new Date();
    let date = currentDate.toLocaleString();
    let data = {
      text: text.toString(),
      productid: idproduct,
      userid: userid,
      date: date
    }
    handleAddComment(data);
  });
}
function handleAddComment(listdata) {
  fetch(commentAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listdata),
  })
    .then(function (response) {
      response.json();
    })
    .then(function (data) {
      console.log('ok');
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.error("Lỗi khi bình luận:", error);
    });
}
function showComment(userid, productid) {
  getComment(productid, userid, handleShowComment);
}
function getComment(productid, userid, callback) {
  Promise.all([
    fetch(`${commentAPI}?productid=${productid}`).then(response => response.json()),
    fetch(userAPI).then(response => response.json())
  ])
  .then(([comments, users]) => {
    const userMap = new Map(users.map(user => [user.id, user.name]));

    const commentsWithNames = comments.map(comment => {
      const name = userMap.get(comment.userid);
      return { ...comment, name };
    });
    callback(userid, commentsWithNames);
  });
}
function getCommentById(id) {
  return fetch(`${commentAPI}/${id}`)
    .then(response => response.json())
    .then(comment => {
      let text = comment.text;
      document.querySelector('#editedCommentText').value = text;
    })
    .catch(error => console.error('Error fetching comment:', error));
}
function handleShowComment(currentUserId, comments) {
  let listCmts = document.getElementById('list-comments');
  
  let htmls = comments.map(function(comment) {
    let isCurrentUser = comment.userid === currentUserId;
    let editCommentClass = isCurrentUser ? '' : 'none-open';
    return `
      <div class="comment">
          <div class="name-user">
              <h6>
                  ${comment.name} <i class='bx bxs-check-circle'></i>
              </h6>
          </div>
          <div class="content-cmt">
              <span>${comment.text}</span>
              <div class="edit-cmt ${editCommentClass}" data-comment-id="${comment.id}">
                <i>
                  <button onclick="showEditComment('${comment.id}')">Chính sửa</button>
                </i>
              </div>
              <div class="${editCommentClass}">
                <i><button onclick="deleteComment('${comment.id}')">Xóa</button></i>
              </div>
          </div>
          <div class="date-cmt">
              <i>${comment.date}</i>
          </div>
      </div>
    `;
  });
  listCmts.innerHTML = htmls.join("");
}
function handleUpdateComment() {
  let btnUpdateCmt = document.querySelector('#btn-update-comment');
  btnUpdateCmt.addEventListener('click', (e) => {
    e.preventDefault();
    let id = document.querySelector('input[name="commentID"]').value;
    let text = document.querySelector('input[name="editedCommentText"]').value;
    let formData = {
      id: id.toString(),
      text: text.toString()
    }
    updateComment(formData,id);
  })
}
function updateComment(formData, id) {
  return fetch(`${commentAPI}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
}
function handleDeleteComment(id) {
  let btnDelete = document.querySelector('.delete-cmt-now');
  btnDelete.addEventListener('click', () => {
    fetch(`${commentAPI}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  })
}

//CART
function showCart(idUser) {
  getCart(idUser, handleShowCart);
}
async function updateCartItem(cartItem) {
  // Thực hiện API call để cập nhật số lượng sản phẩm trong giỏ hàng
  const response = await fetch(`${cartAPI}/${cartItem.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
  });
  const updatedCartItem = await response.json();
  alert("Sản phẩm đã được thêm vào giỏ hàng");
  return updatedCartItem;
}
async function callUpdateQuantityCart(cartItem) {
  // Thực hiện API call để cập nhật số lượng sản phẩm trong giỏ hàng
  const response = await fetch(`${cartAPI}/${cartItem.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
  });
  const callUpdateQuantityCart = await response.json();
  return callUpdateQuantityCart;
}
function startAddOrder(userid) {
  handleAddOrder(userid);
}
function addToOrder(product) {
  fetch(orderAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert("Đặt hàng thành công");
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    });
}
function addToOrderDetail(product, userid) {
  fetch(orderDetailAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let idUser = parseInt(userid);

      // Lấy tất cả các id của giỏ hàng tương ứng với userid
      fetch(`${cartAPI}?userid=${idUser}`)
        .then((response) => response.json())
        .then((data) => {
          // Nếu có nhiều hơn 1 id, xóa tất cả
          if (data.length > 1) {
            data.forEach((cart) => {
              cleanCartAfterOrder(cart.id);
            });
          } else if (data.length === 1) {
            // Nếu chỉ có 1 id, truyền id đó vào hàm cleanCartAfterOrder
            cleanCartAfterOrder(data[0].id);
          }
          window.location.href = "order.html";
        })
        .catch((error) => {
          console.error("Lỗi khi lấy id của giỏ hàng:", error);
        });
    })
    .catch(function (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    });
}
async function handleAddOrder(userid) {
  let form = document.getElementById("form-pay");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Get the form data
    const formData = new FormData(form);
    let address = `${formData.get("street")}, ${formData.get(
      "ward"
    )}, ${formData.get("district")}, ${formData.get("city")}`;
    let currentDate = new Date();
    let date = currentDate.toLocaleString();

    const orderId = generateShortId();
    const orderItem = {
      id: orderId,
      fullname: formData.get("fullname"),
      address: address,
      phone: formData.get("phone"),
      total: parseInt(formData.get("sum_price")),
      userid: parseInt(userid),
      status: "Chờ xử lý",
      note: formData.get("note"),
      date: date,
    };
    await addToOrder(orderItem);

    const productids = formData.getAll("productid[]");
    const quantities = formData.getAll("quantity[]");
    for (let i = 0; i < productids.length; i++) {
      const orderDetail = {
        id: uuidv4(),
        orderid: orderId,
        productid: productids[i],
        quantity: parseInt(quantities[i]),
      };
      await addToOrderDetail(orderDetail, parseInt(userid));
    }
  });
}
function getCart(idUser, callback) {
  fetch(`${cartAPI}?userid=${idUser}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (carts) {
      // Lấy danh sách productId từ bảng cart
      const productIds = carts.map((cart) => cart.productid);

      // Gọi API để lấy dữ liệu từ bảng product
      fetch(`${productAPI}?id_in=${productIds.join(",")}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (products) {
          // Tạo một object map để lưu trữ thông tin sản phẩm
          const productMap = {};
          products.forEach((product) => {
            productMap[product.id] = product;
          });

          // Trả về dữ liệu carts và productMap
          callback({ carts, productMap });
        });
    });
}
function handleShowCart(data) {
  const { carts, productMap } = data;
  let listCart = document.getElementById("list-carts");
  let htmls = carts.map(function (cart) {
    const product = productMap[cart.productid];
    return `
      <tr>
        <td><button class="btn-remove-cart" onclick="handleDeleteCart('${
          cart.id
        }')" value="${cart.id}"><i class='bx bx-x-circle'></i></button></td>
        <input class="numbera" type="hidden" value="${
          cart.id
        }" name="productid[]" data-product-id="${cart.id}">
        <td><img src="${product.image}" alt="${product.name}"></td>
        <td class="name-shoe">${product.name}</td>
        <td class="price-checkout price-index">
            ${product.price.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })} VND
        </td>
        <input type="hidden" name="price-check[]" value="${product.price}">
        <td class="number">
            <div class="soluong">
                <span type="text" class="minus-numbercart">-</span>
                <input class="numberProduct" type="text" value="${
                  cart.quantity
                }" name="totalItem[]">
                <span type="text" class="plus-numbercart">+</span>
            </div>
        </td>
        <td class="price-checkout price-num"><input type="hidden" style="border: none;background:transparent;">
          ${(product.price * cart.quantity).toLocaleString("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })} VND
        </input></td>
      </tr>
    `;
  });
  listCart.innerHTML = htmls.join("");
}
//PAY
function showPay(idUser) {
  getCart(idUser, handleShowPay);
}
function handleShowPay(data) {
  const { carts, productMap } = data;
  let listCart = document.getElementById("list-pays");
  let htmls = carts.map(function (cart) {
    const product = productMap[cart.productid];
    return `
      <tr>  
          <td class="name-shoe"><img src="${product.image}" alt=""></td>
          <input type="hidden" name="productname[]" value="${product.name}">
          <input type="hidden" name="productid[]" value="${product.id}">
          <td class="name-shoe">${product.price}</td>
          <td style="text-align:center">${cart.quantity}</td>
          <input type="hidden" name="quantity[]" value="${cart.quantity}">
          <td class="price-checkout" style="text-align: right;">
            ${(product.price * cart.quantity).toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })} VND
          </td>
          <input type="hidden" name="price-a[]" value="${
            product.price * cart.quantity
          }">
      </tr>
    `;
  });
  listCart.innerHTML = htmls.join("");
}

//ORDER
function showOrder(userid) {
  getOrder(handleShowOrder(userid));
}
function getOrder(callback) {
  fetch(orderAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleShowOrder(userid) {
  let listOrders = document.getElementById("list-orders");
  const orderUrl = `${orderAPI}?userid=${userid}`;
  console.log("Order URL:", orderUrl);
  fetch(orderUrl)
    .then((response) => response.json())
    .then((orders) => {
      let htmls = orders.map(function (order) {
        return `
          <div class="order-contai">
            <h1>Thông tin đơn hàng</h1>
            <div class="title-your-order">
                                        
                <div class="your-address">
                                            
                    <div class="title-adress">
                        <strong>Xem thêm:</strong>
                        <div class="edit-title-adress"><a href="orderitem.html?data-id=${
                          order.id
                        }">Chi tiết đơn hàng</a></div>
                    </div>
                    <div class="phone-number"><strong>Mã đơn hàng: ${
                      order.id
                    }</strong></div>
                    <div class="note"><strong>Ghi chú: </strong>${
                      order.note
                    }</div>
                </div>
                <span class="color-order">${order.status}</span>
            </div>
            <div class="end-your-order">
                <div class="date-order">
                    <span style="font-weight:550;">Ngày đặt hàng:</span>
                    <span style="font-style: italic;color: rgb(75, 75, 75); font-size: 14px;">${
                      order.date
                    }</span>
                </div>
                    
                <div class="sum-price-order">
                    <span>Số tiền phải trả: <strong class="color-order">
                      ${order.total.toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} VND
                    </strong></span>
                    <div class="btn-cancel">
                        <button class=""><a href="">Hủy đơn hàng</a></button>
                        <button class="none-active none-open"><a href="">Xóa đơn hàng</a></button>
                    </div>
                </div>
            </div>
        </div>
      `;
      });
      listOrders.innerHTML = htmls.join("");
    });
}

//ORDER DETAIL
function showOrderItem(id) {
  getOrderItem(id, handleShowOrderItem(id));
}
function getOrderItem(id) {
  const orderUrl = `${orderDetailAPI}?orderid=${id}`;
  const orderPromise = fetch(orderUrl).then((response) => response.json());
  const productPromise = fetch(`${productAPI}`).then((response) =>
    response.json()
  );
  const orderInfoPromise = fetch(`${orderAPI}?id=${id}`).then((response) =>
    response.json()
  );

  Promise.all([orderPromise, productPromise, orderInfoPromise])
    .then(([orderDetails, products, orderInfo]) => {
      const orderItems = orderDetails.map((order) => {
        const product = products.find((p) => p.id === order.productid);
        const orderData = orderInfo.find((o) => o.id === id);
        return {
          ...order,
          price: product.price,
          fullname: orderData.fullname,
          address: orderData.address,
          phone: orderData.phone,
          productname: product.name,
          image: product.image,
        };
      });
      handleShowOrderItem(orderItems);
    })
    .catch((error) => {
      console.error(
        "Error fetching order, product and order info data:",
        error
      );
    });
}
function handleShowOrderItem(orders) {
  let listOrders = document.getElementById("list-order-items");

  if (Array.isArray(orders) && orders.length > 0) {
    let htmls = orders.map(function (order) {
      return `
        <div class="your-order">
          <div class="title-your-order">
            <div class="your-address">
              <div class="title-adress">
                <strong>Thông tin người nhận</strong>
              </div>
              <div class="name"><strong>Tên: </strong> ${order.fullname}</div>
              <div class="phone-number"><strong>Sđt:</strong> ${
                order.phone
              }</div>
              <div class="address-detail"><strong>Địa chỉ: </strong> ${
                order.address
              }</div>
            </div>
          </div>
          <div class="content-your-order">
            <div class="img-order">
              <img src="${order.image}" alt="">
            </div>
            <div class="name-size-order">
              <strong>${order.productname}</strong>
              <div class="quantity-order"><small>Số lượng: ${
                order.quantity
              }</small></div>
            </div>
            <div class="price-order">
              <span class="color-order">
                ${order.price.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })} VND
              </span>
            </div>
          </div>
          <div class="end-your-order">
            <div class="sum-price-order">
              <span>Số tiền phải trả: <strong class="color-order">
                ${(order.price * order.quantity).toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })} VND
              </strong></span>
            </div>
          </div>
        </div>
      `;
    });
    listOrders.innerHTML = htmls.join("");
  } else {
    listOrders.innerHTML = "No orders found.";
  }
}

//GET ID = ID + 1 FROM CART OR ORDER
async function generateUniqueIdCart() {
  try {
    // Lấy danh sách sản phẩm từ API
    const response = await fetch(cartAPI);
    const carts = await response.json();

    // Tìm ID lớn nhất trong danh sách sản phẩm
    const maxId =
      carts.length > 0
        ? Math.max(...carts.map((cart) => parseInt(cart.id)))
        : 0;

    // Tăng ID lên 1
    const newId = maxId + 1;

    // Trả về ID mới dưới dạng số nguyên
    return newId;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
async function generateUniqueIdOrder() {
  try {
    // Lấy danh sách sản phẩm từ API
    const response = await fetch(orderAPI);
    const orders = await response.json();

    // Tìm ID lớn nhất trong danh sách sản phẩm
    const maxId =
      orders.length > 0
        ? Math.max(...orders.map((order) => parseInt(order.id)))
        : 0;

    // Tăng ID lên 1
    const newId = maxId + 1;

    // Trả về ID mới dưới dạng số nguyên
    return newId;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
async function generateUniqueIdOrderDetail() {
  try {
    // Lấy danh sách sản phẩm từ API
    const response = await fetch(orderDetailAPI);
    const orders = await response.json();

    // Tìm ID lớn nhất trong danh sách sản phẩm
    const maxId =
      orders.length > 0
        ? Math.max(...orders.map((order) => parseInt(order.id)))
        : 0;

    // Tăng ID lên 1
    const newId = maxId + 1;

    // Trả về ID mới dưới dạng số nguyên
    return newId;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
//random ID FOR ORDER
function generateShortId() {
  // Tạo một ID ngắn gồm 8 ký tự bao gồm chữ và số, tất cả in hoa
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}
// Use a UUID library to generate unique IDs FOR ORDER DETAIL
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//DELETE CART
function handleDeleteCart(id) {
  fetch(cartAPI + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      response.json();
    })
    .then(function () {
      window.location.href = "cart.html";
    });
}

//DELETE CART AFTER ORDER
function cleanCartAfterOrder(cartId) {
  fetch(`${cartAPI}/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Xóa dữ liệu thành công
        console.log("Đã xóa dữ liệu trong giỏ hàng");
      } else {
        // Xảy ra lỗi khi xóa dữ liệu
        console.error("Không thể xóa dữ liệu trong giỏ hàng");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi xóa dữ liệu trong giỏ hàng:", error);
    });
}
