// import axios from 'axios';
let userAPI = "http://localhost:3000/users";
let categoryAPI = "http://localhost:3000/categories";
let productAPI = "http://localhost:3000/products";
let orderAPI = "http://localhost:3000/orders";
let orderDetailAPI = "http://localhost:3000/order_detail";
let commentAPI = "http://localhost:3000/comment";

//DASHBOARD
function countUsers() {
  return fetch(userAPI)
    .then(response => response.json())
    .then(users => {
      document.querySelector('.countUser').innerText = users.length;
    });
}
function countProducts() {
  return fetch(productAPI)
    .then(response => response.json())
    .then(products => {
      document.querySelector('.countProducts').innerText = products.length;
    })
}
function countOrders() {
  return fetch(orderAPI)
    .then(response => response.json())
    .then(orders => {
      document.querySelector('.countOrders').innerText = orders.length;
    })
}
function countViewProduct() {
  return fetch(productAPI)
    .then(response => response.json())
    .then(products => {
      let totalViews = 0;
      products.forEach(product => {
        totalViews += product.view;
      });
      document.querySelector('.countViews').innerText = totalViews;    
    })
}
function chartOrders() {
  return fetch(orderAPI)
    .then(response => response.json())
    .then(orders => {
      // Khởi tạo mảng để lưu trữ kết quả
      const orderCounts = [0, 0, 0, 0, 0];

      // Duyệt qua từng đơn hàng và đếm số lượng theo trạng thái
      orders.forEach(order => {
        switch (order.status) {
          case "Chờ xử lý":
            orderCounts[0]++;
            break;
          case "Đã xác nhận":
            orderCounts[1]++;
            break;
          case "Đang vận chuyển":
            orderCounts[2]++;
            break;
          case "Đã giao":
            orderCounts[3]++;
            break;
          case "Đã hủy đơn":
            orderCounts[4]++;
            break;
        }
      });
      return orderCounts;
    })
}
function chartPriceProductByCategory() {
  return fetch(categoryAPI)
    .then(response => response.json())
    .then(categories => {
      // Tạo mảng kết quả
      const result = [];

      // Lặp qua từng category
      return Promise.all(categories.map(category =>
        fetch(`${productAPI}?categoryid=${category.id}`)
          .then(response => response.json())
          .then(products => {
            // Tính toán giá trị min, max và trung bình
            const minPrice = Math.min(...products.map(product => product.price));
            const maxPrice = Math.max(...products.map(product => product.price));
            const avgPrice = Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length);
            // Thêm thông tin vào mảng kết quả
            result.push({
              name: category.name,
              minPrice,
              maxPrice,
              avgPrice
            });
          })
      ))
      .then(() => result);
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu:', error);
      return [];
    });
}
function chartViewProduct() {
  return fetch(productAPI)
    .then(response => response.json())
    .then(data => {
      // Sắp xếp sản phẩm theo lượt xem từ cao đến thấp
      const sortedProducts = data.sort((a, b) => b.view - a.view);

      // Lấy 5 sản phẩm có lượt xem cao nhất
      const topProducts = sortedProducts.slice(0, 5);

      // Tạo mảng chứa tên sản phẩm và lượt xem
      const chartData = topProducts.map(product => {
        return {
          name: product.name,
          view: product.view
        };
      });

      return chartData;
    })
}
//USERS
function startUsers() {
  getUsers(renderUsers);
}
function getUsers(callback) {
  fetch(userAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderUsers(users) {
  let listusers = document.getElementById("list-users");
  if (listusers) {
    let htmls = users.map(function (user) {
      return `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td>${user.date}</td>
                <td><button onclick="updateStatusUser('${user.id}')" class="btn-update" value="">Update Status</button></td>
            </tr>
        `;
    });
    listusers.innerHTML = htmls.join("");
  } else {
    console.error("list-users element not found");
  }
}
function handleUpdateStatusUser(id) {
  let btnUpdate = document.getElementById('btn-update-status');
  btnUpdate.addEventListener('click', (e) => {
    e.preventDefault();
    let statusNew = document.querySelector('#status-new').value;
    console.log(statusNew);
    if(statusNew == 1) {
      let status = "active"
      startUpdateStatusUser(id, status);
    } else if(statusNew == 0) {
      let status = "Passive"
      startUpdateStatusUser(id, status);
    }
  });
}

function startUpdateStatusUser(id, newStatus) {
  fetch(`${userAPI}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: newStatus })
  })
  .then(response => response.json())
}

//CATEGORIES
function startCategories() {
  getCategories(renderCategories);
}
function startCreateCategories() {
  getCategories(renderCreateCategories);
}
function getCategories(callback) {
  fetch(categoryAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderCategories(categories) { 
  let listcategories = document.getElementById("list-categories");
  if (listcategories) {
    let htmls = categories.map(function (category) {
      return `
            <tr>
                <th scope="row"><button class="id-product" value="${category.id}">${category.id}</button></th>
                <td>${category.name}</td>
                <td>${category.date}</td>
                <td class="more"><button class="btn-update" value="">Update</button></td>
                <td class="more">
                    <button class="btn-delete-category" value="${category.id}">Delete</button>
                </td>
            </tr>
        `;
    });
    listcategories.innerHTML = htmls.join("");
  } else {
    console.error("list-categories element not found");
  }
}
function renderCreateCategories(categories) { //show list category to create product
  let listcategories = document.getElementById("list-categories");
  if (listcategories) {
    let htmls = categories.map(function (category) {
      return `
             <option value="${category.id}">${category.name}</option>
        `;
    });
    listcategories.innerHTML = htmls.join("");
  } else {
    console.error("list-categories element not found");
  }
}
function startUpdateCategories() {
  getCategories(renderUpdateCategories);
}
function renderUpdateCategories(categories) { //show list category to create product
  let listcategories = document.getElementById("list-categories-update");
  if (listcategories) {
    let htmls = categories.map(function (category) {
      return `
             <option value="${category.id}">${category.name}</option>
        `;
    });
    listcategories.innerHTML = htmls.join("");
  } else {
    console.error("list-categories element not found");
  }
}
function createCategory() {
  handleCreateCategory();
}
function createNewCategory(data, callback) {
  fetch(categoryAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      response.json();
    })
    .then(callback);
}
function handleCreateCategory() {
  let createBtn = document.getElementById('create');
  createBtn.addEventListener('click', async () => {
    let name = document.querySelector('input[name="category-name"]').value;
    let currentDate = new Date();
    let date = currentDate.toLocaleString();
    let formData = {
      id: (await generateUniqueId(categoryAPI)).toString(),
      name: name,
      isdelete: true,
      date: date
    }
    createNewCategory(formData);
  })
}
function updateCategory(idcategory) {
  handleUpdateCategory(idcategory);
}
async function handleUpdateCategory(idcategory) {
  // Lấy thông tin sản phẩm hiện tại
  let product = await getCategoryById(idcategory);
  
  // Hiển thị form với thông tin sản phẩm hiện tại
  document.querySelector('input[name="name-update"]').value = product.name;

  // Thêm sự kiện khi click vào nút "Cập nhật"
  let updateBtn = document.getElementById('update-category');
  updateBtn.addEventListener('click', async () => {
      let id = document.querySelector('input[name="id-update-product"]').value;
      let name = document.querySelector('input[name="name-update"]').value.trim();
      let currentDate = new Date();
      let formattedDate = currentDate.toLocaleString();

      let data = {
          name: name,
          date: formattedDate
      }
      // console.log(data);
      
      await updateNewCategory(data, id);
  });
}
async function getCategoryById(id) {//get id to show form update product
  try {
      let response = await fetch(`${categoryAPI}/${id}`);
      if (response.ok) {
          return await response.json();
      } else {
          throw new Error(`Failed to get product with ID ${id}`);
      }
  } catch (error) {
      console.error('Error getting product:', error);
  }
}
async function updateNewCategory(data, id) {
  try {
    const response = await fetch(`${categoryAPI}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Update product successful');
    } else {
      throw new Error('Failed to update product');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
}
function handleDeleteCategory(id) {
  fetch(categoryAPI + '/' + id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
  })
}

//PRODUCTS
function startProducts() {
  getProducts(renderProducts);
}
function createProduct() {
    handleCreateProduct();
}
function updateProduct(idproduct) {
    handleUpdateProduct(idproduct);
}
function create(data, callback) {
    fetch(productAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function(response) {
            response.json();
        }) 
        .then(callback);
}
function getProducts(callback) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderProducts(products) {
  let listproducts = document.getElementById("list-products");
  if (listproducts) {
    let htmls = products.map(function (product) {
      return `
            <tr>
                <th scope="row"><button class="id-product" value="${product.id}">${product.id}</button></th>
                <td>${product.name}</td>
                <td class="image">
                    <img src="${product.image}" alt="">
                </td>
                <td>
                    ${product.price.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })} VND
                </td>
                <td>${product.categoryid}</td>
                <td class="more"><button class="btn-update" value="">Update</button></td>
                <td class="more">
                    <button class="btn-delete-category" value="${product.id}">Delete</button>
                </td>
            </tr> 
        `;
    });
    listproducts.innerHTML = htmls.join("");
  } else {
    console.error("list-products element not found");
  }
}
function handleCreateProduct() {
  let createBtn = document.getElementById('create');
  createBtn.addEventListener('click', async () => {
      let name = document.querySelector('input[name="product-name"]').value;
      let image = document.querySelector('input[name="image"]').value;
      let price = parseInt(document.querySelector('input[name="price"]').value);
      let description = document.querySelector('input[name="description"]').value;
      let categoryid = parseInt(document.querySelector('select[name="categoryid"]').value);
      let currentDate = new Date();
      let date = currentDate.toLocaleString(); // Định dạng ngày và giờ
      let formData = {
          id: (await generateUniqueId(productAPI)).toString(),
          name: name,
          image: image,
          price: price,
          description: description,
          categoryid: categoryid,
          date: date
      }
      console.log(formData);
      create(formData);
  })
}
async function handleUpdateProduct(productId) {
  // Lấy thông tin sản phẩm hiện tại
  let product = await getProductById(productId);

  // Hiển thị form với thông tin sản phẩm hiện tại
  document.querySelector('input[name="name-update"]').value = product[0].name;
  document.querySelector('input[name="image-update"]').value = product[0].image;
  document.querySelector('input[name="price-update"]').value = product[0].price;
  document.querySelector('input[name="description-update"]').value = product[0].description;
  document.querySelector('select[name="categoryid-update"]').value = product[0].categoryid;

  // Thêm sự kiện khi click vào nút "Cập nhật"
  let updateBtn = document.getElementById('update');
  console.log(updateBtn);
  updateBtn.addEventListener('click', async () => {
      let id = parseInt(document.querySelector('input[name="id-update-product"]').value);
      let name = document.querySelector('input[name="name-update"]').value;
      let image = document.querySelector('input[name="image-update"]').value;
      let price = parseInt(document.querySelector('input[name="price-update"]').value);
      let description = document.querySelector('input[name="description-update"]').value;
      let categoryid = parseInt(document.querySelector('select[name="categoryid-update"]').value);
      let currentDate = new Date();
      let formattedDate = currentDate.toLocaleString();

      let data = {
          id: id,
          name: name,
          image: image,
          price: price,
          description: description,
          categoryid: categoryid,
          date: formattedDate
      }
      // console.log(updatedData);
      await update(data, id);
  });
}
async function getProductById(id) {//get id to show form update product
  try {
      let response = await fetch(`${productAPI}?id=${id}`);
      if (response.ok) {
          return await response.json();
      } else {
          throw new Error(`Failed to get product with ID ${id}`);
      }
  } catch (error) {
      console.error('Error getting product:', error);
  }
}
async function update(data, id) {
  
  console.log(data);
  console.log(id);
  try {
    const response = await fetch(`${productAPI}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Update product successful');
    } else {
      throw new Error('Failed to update product');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }

}
function handleDeleteProduct(id) {
  fetch(productAPI + '/' + id, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
  })
}


//USE TO CREATE NEW ID FOR CREATE PRODUCT OR CATEGORY
let lastId = 0;
async function generateUniqueId(API) {
    try {
        // Lấy danh sách sản phẩm từ API
        const response = await fetch(API);
        const products = await response.json();

        // Tìm ID lớn nhất trong danh sách sản phẩm
        const maxId = products.length > 0 ? Math.max(...products.map(product => product.id)) : 0;

        // Tăng ID lên 1
        lastId = maxId + 1;

        return lastId;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

//ORDER MANAGER
function getOrders(callback,API) {
  fetch(API)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
}

function showOrders() {
  getOrders(handleShowOrder,orderAPI);
}
function handleShowOrder(orders) {
  let listOrders = document.getElementById('list-orders');
  let htmls = orders.map(function(order) {
    return `
        <tr>
              <th scope="row">${order.id}</th>
              <td>${order.date}</td>
              <td>
                ${order.total.toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
              })} VND
                </td>
              <td>${order.userid}</td>
              <td>${order.note}</td>
              <td style="color: #db0000">${order.status}</td>
              <input class="status" type="hidden" value="${order.status}">
              <td class="more">
                  <button class="btn-delete-category" onclick="showEdit('${order.id}', '${order.status}')" value="${order.id}">
                      Edit 
                  </button>
                  <button class="btn-delete-category" onclick="showOrderDetail('${order.id}')" value="${order.id}">
                      View more 
                  </button>

              </td>
          </tr>
    `
  })
  listOrders.innerHTML = htmls.join("");
}
function updateOrder() {
  handleUpdateOrder();
}
async function handleUpdateOrder() {
  let btnUpdateOrder = document.getElementById('btn-update-status');
  
  btnUpdateOrder.addEventListener('click', async (e) => {
    e.preventDefault();
    let status = document.querySelector('select[name="status"]').value;
    let id = document.querySelector('input[name="id"]').value;
    let formData = {
      id: id.toString(),
      status: status
    }
    
    await updateStatusOrder(formData, id);
  })
}
async function updateStatusOrder(data,id) {
  const response = await fetch(`${orderAPI}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log('Update order successful');
  } else {
    throw new Error('Failed to update product');
  }
}
async function handleShowOrderDetail(orderid) {
  try {
    // Gọi API để lấy dữ liệu order detail
    const orderDetailResponse = await fetch(`${orderDetailAPI}?orderid=${orderid}`);
    const orderDetailData = await orderDetailResponse.json();

    // Gọi API để lấy dữ liệu product
    const productResponse = await fetch(productAPI);
    const productData = await productResponse.json();

    // Tạo một object chứa name và price của mỗi product
    const productInfo = {};
    productData.forEach(product => {
      productInfo[product.id] = {
        image: product.image,
        price: product.price
      };
    });

    // Gộp dữ liệu order detail và thông tin product
    const resultData = orderDetailData.map(item => {
      const product = productInfo[item.productid];
      return {
        ...item,
        image: product ? product.image : 'Unknown',
        price: product ? product.price : 0
      };
    }).filter(item => productInfo[item.productid]); // Thêm điều kiện này
    
    renderOrderDetail(resultData);

  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
}
function renderOrderDetail(orderDetails) {
  let listOrderDetail = document.querySelector('#list-order-details')
  let htmls = orderDetails.map(function(orderDetail) {
    return `
      <tr>
        <td class="img-order">
            <img src="${orderDetail.image}" alt="">
        </td>
        <td>
          ${orderDetail.price.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })} VND
        </td>
        <td>${orderDetail.quantity}</td>
        <td>
          ${(orderDetail.price * orderDetail.quantity).toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })} VND
        </td>
      </tr>
    `
  })
  listOrderDetail.innerHTML = htmls.join("")
}
function getNameOrder(id) {
  fetch(`${orderAPI}/${id}`)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      document.querySelector('.name-order').innerText = data.id
      document.querySelector('#fullname').innerText = data.fullname
      document.querySelector('#phone-number').innerText = data.phone
      document.querySelector('#address').innerText = data.address
    })
}


//COMMENT MANAGER
async function showComment() {
  try {
    // Gọi API để lấy dữ liệu comment
    const commentResponse = await fetch(commentAPI);
    const commentData = await commentResponse.json();

    // Gọi API để lấy dữ liệu product
    const productResponse = await fetch(productAPI);
    const productData = await productResponse.json();

    // Tạo một mảng chứa dữ liệu comment và product
    const resultData = commentData.map(comment => {
      const product = productData.find(p => p.id == comment.productid);
      return {
        ...comment,
        image: product ? product.image : 'Unknown'
      };
    });

    // return resultData;
    console.log(resultData);
    
    handleShowComment(resultData)
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
}
function handleShowComment(comments) {
  let listcomments = document.getElementById('list-comments');
  let htmls = comments.map(function(comment) {
    return `
      <tr>
          <td scope="row"><img src="${comment.image}" alt=""></td>
          <td scope="row" style="text-align: left">${comment.text}</td>
          <td>${comment.userid}</td>
          <td>${comment.date}</td>
          <td class="more">
            <button class="btn-delete-category" onclick="confirmDeleteComment('${comment.id}')">Delete</button>
          </td>
      </tr>
    `
  })
  listcomments.innerHTML = htmls.join("")
}
function handleDeleteComment(id) {
  fetch(`${commentAPI}/${id}`, {
    method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}