import { Student, Teacher, Customer } from "../modal/Person.js";
import { DOMAIN, DOMAINSTUDENT } from "../modal/Domain.js";
import { VALIDATION} from "../validation/validation.js";
export {getElement}
const getElement = (selector) => document.querySelector(selector);
const getElementAll = (selector) => document.querySelectorAll(selector);
const SetItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const GetItem = (key) => JSON.parse(localStorage.getItem(key));
const RemoveItem = (key) => localStorage.removeItem(key);
const getAPI = async () => {
  try {
    const result = await axios({
      url: DOMAIN,
      method: "GET",
    });
    const Result = result.data[0];
    SetItem("student", Result.student);
    SetItem("teacher", Result.teacher);
    SetItem("customer", Result.customer);
    render(Result);
  } catch (err) {
    console.log(err);
  }
};

const putAPI = async (type, value) => {
  try {
    const data = await axios({
      url: DOMAINSTUDENT,
      method: "PUT",
      data: {
        [type]: value,
      },
    });
    getAPI();
  } catch (err) {
    console.log(err);
  }
};

const render = (Data) => {
  // SetItem("student", Data.student);
  // SetItem("teacher", Data.teacher);
  // SetItem("customer", Data.customer);
  let student = new Student();
  let teacher = new Teacher();
  let customer = new Customer();
  let content = "";
  for (let i in Data) {
    Data[i].forEach((type) => {
      if ((Data[i] != 0) & (i === "student")) {
        for (let ob in type) {
          student[ob] = type[ob];
        }
        content += `
				  <tr>
					  <td>${student.id}</td>
					  <td>${student.name}</td>
					  <td>${student.adress}</td>
					  <td>${student.email}</td>
					  <td class="text-start">
					 <p class="m-0 ms-1">Điểm toán: ${student.toan}</p> 
					 <p class="m-0 ms-1">Điểm toán: ${student.ly}</p> 
					 <p class="m-0 ms-1">Điểm toán: ${student.hoa}</p> 
					 <p class="m-0 ms-1 d-none" name="student" id="${
             student.id
           }">Điểm trung bình: ${student.tinhTB()}</p> 
					  </td>
					  <td>
					  <button class="btn btn-success p-1" onclick="btnTinh(${
              student.id
            })">Tính</button>
					  <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              student.id
            })" >Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              student.id
            })">Xóa</button>
					  </td>
				  </tr>
				  `;
      } else if ((Data[i] != 0) & (i === "teacher")) {
        for (let ob in type) {
          teacher[ob] = type[ob];
        }
        content += `
				  <tr>
					  <td>${teacher.id}</td>
					  <td>${teacher.name}</td>
					  <td>${teacher.adress}</td>
					  <td>${teacher.email}</td>
					  <td class="text-start">
					 <p class="m-0 ms-1">Ngày làm việc: ${teacher.date}</p> 
					 <p class="m-0 ms-1">Lương ngày: ${teacher.sale}</p> 
					 <p class="m-0 ms-1 d-none" id="${teacher.id}">Tổng lương: ${teacher
          .calSale()
          .toLocaleString()} $</p> 
					  </td>
					  <td>
					  <button class="btn btn-success p-1" onclick="btnTinh(${
              teacher.id
            })">Tính</button>
					  <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              teacher.id
            })">Sửa</button>
					  <button class="btn btn-danger p-1" onclick="btnXoa(${
              teacher.id
            })">Xóa</button>
					  </td>
				  </tr>
				  `;
      } else if ((Data[i] != 0) & (i === "customer")) {
        for (let ob in type) {
          customer[ob] = type[ob];
        }
        content += `
				  <tr>
					  <td id="${customer.id}">${customer.id}</td>
					  <td>${customer.name}</td>
					  <td>${customer.adress}</td>
					  <td>${customer.email}</td>
					  <td class="text-start">
					 <p class="m-0 ms-1">Tên công ty: ${customer.nameCompany}</p> 
					 <p class="m-0 ms-1">Giá trị hóa đơn: ${customer.bill.toLocaleString()} $</p> 
					 <p class="m-0 ms-1">Đánh giá: ${customer.feedback}</p> 
					  </td>
					  <td>
					  <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              customer.id
            })">Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              customer.id
            })">Xóa</button>
					  </td>
				  </tr>
				  `;
      }
      getElement("#tbody").innerHTML = content;
    });
  }
};
getAPI();

//THÔNG TIN NHẬP MẶC ĐỊNH KHI NHẤN THÊM LÀ STUDENT
getElement("#btnAdd").onclick = () => {
  const typePerson = getElementAll(".form-group");
  const student = new Student();
  // getElement(".form-group #id").value="HS"
  typePerson.forEach((e) => {
    e.classList.add("d-none");
  });
  typePerson.forEach((e) => {
    const name = e.getAttribute("name");
    for (let i in student) {
      if (name === i) {
        e.classList.remove("d-none");
      }
    }
  });
};

// NHẬP THÔNG TIN THEO NHÓM ĐỐI TƯỢNG
getElement(".typePerson").onchange = () => {
  const typePerson = getElementAll(".form-group");
  const typeSelect = getElement(".typePerson").value;
  const student = new Student();
  const teacher = new Teacher();
  const customer = new Customer();
  typePerson.forEach((e) => {
    e.classList.add("d-none");
  });

  if (typeSelect === "student") {
    // getElement(".form-group #id").value="HS"
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in student) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  } else if (typeSelect === "teacher") {
    // getElement(".form-group #id").value="T"
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in teacher) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  } else if (typeSelect === "customer") {
    // getElement(".form-group #id").value="C"
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in customer) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  }
};

//Lấy thông tin từ người dùng nhập
const getInfo = () => {
  let data = {};
  const typeSelect = getElement(".typePerson").value;
  const ele = getElementAll(".form-group input,.form-group textarea");
  const student = new Student();
  const teacher = new Teacher();
  const customer = new Customer();
  if (typeSelect === "student") {
    ele.forEach((e) => {
      const { id, value } = e;
      for (let i in student) {
        if (id === i) {
          data[id] = value;
        }
      }
    });
  } else if (typeSelect === "teacher") {
    ele.forEach((e) => {
      const { id, value } = e;
      for (let i in teacher) {
        if (id === i) {
          data[id] = value;
        }
      }
    });
  } else if (typeSelect === "customer") {
    ele.forEach((e) => {
      const { id, value } = e;
      for (let i in customer) {
        if (id === i) {
          data[id] = value;
        }
      }
    });
  }
  return data;
};

// Thêm người
getElement("#btnThem").onclick = () => {
  const data = getInfo();
  const type = getElement(".typePerson").value;
  let student = GetItem("student");
  let teacher = GetItem("teacher");
  let customer = GetItem("customer");

  if(!valid){
    if (type === "student") {
      student.push(data);
      putAPI("student", student);
    } else if (type === "teacher") {
      teacher.push(data);
      putAPI("teacher", teacher);
    } else if (type === "customer") {
      customer.push(data);
      putAPI("customer", customer);
      
    }
    getElement("#btnDong").click();
  }else if(valid){
    alert("Nhập đầy đủ thông tin")
    return
  }
  };

// Nhấn nút tính điểm trung bình cho đối tượng học sinh
window.btnTinh = (id) => {
  getElement(`#${id.id}`).classList.remove("d-none");
};

// Xóa đối tượng
window.btnXoa = (id) => {
  const student = GetItem("student");
  const teacher = GetItem("teacher");
  const customer = GetItem("customer");
  const newStudent = student.filter((e) => e.id != id.id);
  const newTeacher = teacher.filter((e) => e.id != id.id);
  const newCustomer = customer.filter((e) => e.id != id.id);
  putAPI("student", newStudent);
  putAPI("teacher", newTeacher);
  putAPI("customer", newCustomer);
};

// Cập nhật đổi tượng
window.btnSua = (id) => {
  const student1 = GetItem("student");
  const teacher1 = GetItem("teacher");
  const customer1 = GetItem("customer");
  const newStudent = student1.filter((e) => e.id === id.id);
  const newTeacher = teacher1.filter((e) => e.id === id.id);
  const newCustomer = customer1.filter((e) => e.id === id.id);

  if (newStudent.length != 0) {
    getElement("form").setAttribute("name", id.id);
    getElement(".typePerson").value = "student";
    const ele = getElementAll(".form-group input,.form-group textarea");
    ele.forEach((e) => {
      getElement(`#${e.id}`).value = newStudent[0][e.id];
    });
  } else if (newTeacher.length != 0) {
    getElement("form").setAttribute("name", id.id);
    getElement(".typePerson").value = "teacher";
    const ele = getElementAll(".form-group input,.form-group textarea");
    ele.forEach((e) => {
      getElement(`#${e.id}`).value = newTeacher[0][e.id];
    });
  } else if (newCustomer.length != 0) {
    getElement("form").setAttribute("name", id.id);
    getElement(".typePerson").value = "customer";
    const ele = getElementAll(".form-group input,.form-group textarea");
    ele.forEach((e) => {
      getElement(`#${e.id}`).value = newCustomer[0][e.id];
    });
  }

  const typePerson = getElementAll(".form-group");
  const typeSelect = getElement(".typePerson").value;
  const student = new Student();
  const teacher = new Teacher();
  const customer = new Customer();
  typePerson.forEach((e) => {
    e.classList.add("d-none");
  });

  if (typeSelect === "student") {
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in student) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  } else if (typeSelect === "teacher") {
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in teacher) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  } else if (typeSelect === "customer") {
    typePerson.forEach((e) => {
      const name = e.getAttribute("name");
      for (let i in customer) {
        if (name === i) {
          e.classList.remove("d-none");
        }
      }
    });
  }
};

getElement("#btnCapNhat").onclick = () => {
  const data = getInfo();
  const type = getElement(".typePerson").value;
  let student = GetItem("student");
  let teacher = GetItem("teacher");
  let customer = GetItem("customer");
  if (type === "student") {
    student.forEach((e) => {
      if (e.id === getElement("form").getAttribute("name")) {
        for (let i in e) {
          e[i] = data[i];
        }
      }
    });
    getElement("form").removeAttribute("name");
    putAPI("student", student);
  } else if (type === "teacher") {
    teacher.forEach((e) => {
      if (e.id === getElement("form").getAttribute("name")) {
        for (let i in e) {
          e[i] = data[i];
        }
      }
    });
    getElement("form").removeAttribute("name");
    putAPI("teacher", teacher);
  } else if (type === "customer") {
    customer.forEach((e) => {
      if (e.id === getElement("form").getAttribute("name")) {
        for (let i in e) {
          e[i] = data[i];
        }
      }
    });
    getElement("form").removeAttribute("name");
    putAPI("customer", customer);
  }
  getElement("#btnDong").click();
};

// Tìm kiếm theo đối tượng
getElement("#search").onchange = () => {
  const type = getElement("#search").value;
  const person = GetItem(type);
  const student = new Student();
  const teacher = new Teacher();
  const customer = new Customer();
  let content = "";
  if (type === "student") {
    person.forEach((e) => {
      for (let i in student) {
        student[i] = e[i];
      }
      content += `
				  <tr>
					  <td>${student.id}</td>
					  <td>${student.name}</td>
					  <td>${student.adress}</td>
					  <td>${student.email}</td>
					  <td class="text-start">
					 <p class="m-0 ms-1">Điểm toán: ${student.toan}</p> 
					 <p class="m-0 ms-1">Điểm toán: ${student.ly}</p> 
					 <p class="m-0 ms-1">Điểm toán: ${student.hoa}</p> 
					 <p class="m-0 ms-1 d-none" name="student" id="${
             student.id
           }">Điểm trung bình: ${student.tinhTB()}</p> 
					  </td>
					  <td>
					  <button class="btn btn-success p-1" onclick="btnTinh(${
              student.id
            })">Tính</button>
					  <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              student.id
            })" >Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              student.id
            })">Xóa</button>
					  </td>
				  </tr>
				  `;
    });
  } else if (type === "teacher") {
    person.forEach((e) => {
      for (let i in teacher) {
        teacher[i] = e[i];
      }
      content += `
      <tr>
        <td>${teacher.id}</td>
        <td>${teacher.name}</td>
        <td>${teacher.adress}</td>
        <td>${teacher.email}</td>
        <td class="text-start">
       <p class="m-0 ms-1">Ngày làm việc: ${teacher.date}</p> 
       <p class="m-0 ms-1">Lương ngày: ${teacher.sale}</p> 
       <p class="m-0 ms-1 d-none" id="${teacher.id}">Tổng lương: ${teacher
        .calSale()
        .toLocaleString()} $</p> 
        </td>
        <td>
        <button class="btn btn-success p-1" onclick="btnTinh(${
          teacher.id
        })">Tính</button>
        <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
          teacher.id
        })">Sửa</button>
        <button class="btn btn-danger p-1" onclick="btnXoa(${
          teacher.id
        })">Xóa</button>
        </td>
      </tr>
      `;
    });
  } else if (type === "customer") {
    person.forEach((e) => {
      for (let i in customer) {
        customer[i] = e[i];
      }
      content += `
      <tr>
        <td id="${customer.id}">${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.adress}</td>
        <td>${customer.email}</td>
        <td class="text-start">
       <p class="m-0 ms-1">Tên công ty: ${customer.nameCompany}</p> 
       <p class="m-0 ms-1">Giá trị hóa đơn: ${customer.bill.toLocaleString()} $</p> 
       <p class="m-0 ms-1">Đánh giá: ${customer.feedback}</p> 
        </td>
        <td>
        <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
          customer.id
        })">Sửa</button>
        <button class="btn btn-danger p-1" onclick="btnXoa(${
          customer.id
        })">Xóa</button>
        </td>
      </tr>
      `;
    });
  } else if (type === "0") {
    getAPI();
  }
  getElement("#tbody").innerHTML = content;
};

// Sắp xếp theo tên
getElement("#sapXep").onchange = () => {
  const type = getElement("#sapXep").value;
  const student1 = GetItem("student");
  const teacher1 = GetItem("teacher");
  const customer1 = GetItem("customer");
  const merge = [...student1, ...teacher1, ...customer1];
  const tang = _.sortBy(merge, "name");
  const giam = _.sortBy(merge, "name").reverse();
  console.log(tang)
  let content = "";
  let student = new Student();
  let teacher = new Teacher();
  let customer = new Customer();
  if (type === "tang") {
    tang.forEach((e) => {
      for (let i in e) {
        if (i === "toan") {
          for (let b in student) {
            student[b] = e[b];
          }
          content += `
              <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.adress}</td>
                <td>${student.email}</td>
                <td class="text-start">
               <p class="m-0 ms-1">Điểm toán: ${student.toan}</p> 
               <p class="m-0 ms-1">Điểm toán: ${student.ly}</p> 
               <p class="m-0 ms-1">Điểm toán: ${student.hoa}</p> 
               <p class="m-0 ms-1 d-none" name="student" id="${
                 student.id
               }">Điểm trung bình: ${student.tinhTB()}</p> 
                </td>
                <td>
                <button class="btn btn-success p-1" onclick="btnTinh(${
                  student.id
                })">Tính</button>
                <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
                  student.id
                })" >Sửa</button>
                <button class="btn btn-danger p-1" onclick="btnXoa(${
                  student.id
                })">Xóa</button>
                </td>
              </tr>
              `;
        }else if (i === "date") {
          for (let b in teacher) {
            teacher[b] = e[b];
          }
          content += `
          <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.adress}</td>
            <td>${teacher.email}</td>
            <td class="text-start">
           <p class="m-0 ms-1">Ngày làm việc: ${teacher.date}</p> 
           <p class="m-0 ms-1">Lương ngày: ${teacher.sale}</p> 
           <p class="m-0 ms-1 d-none" id="${teacher.id}">Tổng lương: ${teacher
            .calSale()
            .toLocaleString()} $</p> 
            </td>
            <td>
            <button class="btn btn-success p-1" onclick="btnTinh(${
              teacher.id
            })">Tính</button>
            <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              teacher.id
            })">Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              teacher.id
            })">Xóa</button>
            </td>
          </tr>
          `;
        }else if (i === "bill") {
          for (let b in customer) {
            customer[b] = e[b];
          }
          content += `
          <tr>
            <td id="${customer.id}">${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.adress}</td>
            <td>${customer.email}</td>
            <td class="text-start">
           <p class="m-0 ms-1">Tên công ty: ${customer.nameCompany}</p> 
           <p class="m-0 ms-1">Giá trị hóa đơn: ${customer.bill.toLocaleString()} $</p> 
           <p class="m-0 ms-1">Đánh giá: ${customer.feedback}</p> 
            </td>
            <td>
            <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              customer.id
            })">Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              customer.id
            })">Xóa</button>
            </td>
          </tr>
          `;
        }
      }
    });
    getElement("#tbody").innerHTML = content;
  } else if (type === "giam") {
    giam.forEach((e) => {
      for (let i in e) {
        if (i === "toan") {
          for (let b in student) {
            student[b] = e[b];
          }
          content += `
              <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.adress}</td>
                <td>${student.email}</td>
                <td class="text-start">
               <p class="m-0 ms-1">Điểm toán: ${student.toan}</p> 
               <p class="m-0 ms-1">Điểm toán: ${student.ly}</p> 
               <p class="m-0 ms-1">Điểm toán: ${student.hoa}</p> 
               <p class="m-0 ms-1 d-none" name="student" id="${
                 student.id
               }">Điểm trung bình: ${student.tinhTB()}</p> 
                </td>
                <td>
                <button class="btn btn-success p-1" onclick="btnTinh(${
                  student.id
                })">Tính</button>
                <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
                  student.id
                })" >Sửa</button>
                <button class="btn btn-danger p-1" onclick="btnXoa(${
                  student.id
                })">Xóa</button>
                </td>
              </tr>
              `;
        }else if (i === "date") {
          for (let b in teacher) {
            teacher[b] = e[b];
          }
          content += `
          <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.adress}</td>
            <td>${teacher.email}</td>
            <td class="text-start">
           <p class="m-0 ms-1">Ngày làm việc: ${teacher.date}</p> 
           <p class="m-0 ms-1">Lương ngày: ${teacher.sale}</p> 
           <p class="m-0 ms-1 d-none" id="${teacher.id}">Tổng lương: ${teacher
            .calSale()
            .toLocaleString()} $</p> 
            </td>
            <td>
            <button class="btn btn-success p-1" onclick="btnTinh(${
              teacher.id
            })">Tính</button>
            <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              teacher.id
            })">Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              teacher.id
            })">Xóa</button>
            </td>
          </tr>
          `;
        }else if (i === "bill") {
          for (let b in customer) {
            customer[b] = e[b];
          }
          content += `
          <tr>
            <td id="${customer.id}">${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.adress}</td>
            <td>${customer.email}</td>
            <td class="text-start">
           <p class="m-0 ms-1">Tên công ty: ${customer.nameCompany}</p> 
           <p class="m-0 ms-1">Giá trị hóa đơn: ${customer.bill.toLocaleString()} $</p> 
           <p class="m-0 ms-1">Đánh giá: ${customer.feedback}</p> 
            </td>
            <td>
            <button class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnSua(${
              customer.id
            })">Sửa</button>
            <button class="btn btn-danger p-1" onclick="btnXoa(${
              customer.id
            })">Xóa</button>
            </td>
          </tr>
          `;
        }
      }
    });
    getElement("#tbody").innerHTML = content;
  }else if(type==="1"){
    getAPI()
  }
};

// Validation Student

// check mã

let valid=true
// if(valid){
//   getElement("#btnThem").addEventListener("submit", function(evt) {
//     evt.preventDefault();})
// }
getElement("#id").onblur=()=>{
  const type = getElement(".typePerson").value;
  let key, ob;
  if(type==="student"){
    key="HS"
    ob="học sinh"
  }else  if(type==="teacher"){
    key="T"
    ob="giảng viên"
  }else  if(type==="customer"){
    key="C"
    ob="khách hàng"
  }

  if(VALIDATION.checkEmty("#id")){
    getElement("#tbId").innerHTML=`Mã ${ob} không được bỏ trống`}
  else if(!VALIDATION.checkID("#id",key)){
    getElement("#tbId").innerHTML=`Mã ${ob} phải có ${key} đứng đầu`
  }else if(!VALIDATION.checkLength("#id",4,8)){
    getElement("#tbId").innerHTML=`Mã ${ob} phải có độ dài từ 4 đến 8`
  }else if(!VALIDATION.checkLetterNumber("#id")){
    getElement("#tbId").innerHTML=`Mã ${ob} phải bao gồm chữ và số`
  }else if(VALIDATION.checktrung("#id",type)){
    getElement("#tbId").innerHTML=`Mã ${ob} bị trùng hãy nhập mã khác`
  }else{
    getElement("#tbId").innerHTML=""
    valid&=false
    return
  }
  valid=true

}

// check name
getElement("#name").onblur=()=>{
  const id = getElement("#name").value
  if(VALIDATION.checkEmty("#name")){
    getElement("#tbName").innerHTML="Tên không được bỏ trống"
  }
  else if(!VALIDATION.checkLetter("#name")){
    getElement("#tbName").innerHTML="Tên phải là chữ"
  }
  else{
    getElement("#tbName").innerHTML=""
    valid&=false
    return
  }
  valid=true
  
}

//check adress và tên công ty
getElement("#adress").onblur=()=>{
  if(VALIDATION.checkEmty("#adress")){
    getElement("#tbAdress").innerHTML="Địa chỉ không được bỏ trống"
  }else if(!VALIDATION.checkLetterNumber("#adress")){
    getElement("#tbAdress").innerHTML="Địa chỉ phải có số và chữ"
  }else{
    getElement("#tbAdress").innerHTML=""
    valid&=false
    return
  }
  valid=true
}
getElement("#nameCompany").onblur=()=>{
  if(VALIDATION.checkEmty("#nameCompany")){
    getElement("#tbNameCompany").innerHTML="Địa chỉ không được bỏ trống"
  }else{
    getElement("#tbNameCompany").innerHTML=""
  }
}

//check email
getElement("#email").onblur=()=>{
  if(VALIDATION.checkEmty("#email")){
    getElement("#tbEmail").innerHTML="Email không được bỏ trống"
  }else if(!VALIDATION.checkEmail("#email")){
    getElement("#tbEmail").innerHTML="Email không đúng định dạng @gmail.com"
  }else{
    getElement("#tbEmail").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

// check điểm toán lý hóa
getElement("#toan").onblur=()=>{
  if(VALIDATION.checkEmty("#toan")){
    getElement("#tbToan").innerHTML="Điểm toán không được bỏ trống"
  }else if(!VALIDATION.checkMark("#toan")){
    getElement("#tbToan").innerHTML="Điểm toán phải là số  và nằm trong thang điểm 10"
  }else{
    getElement("#tbToan").innerHTML=""
    valid&=false
    return
  }
  valid=true
}
getElement("#hoa").onblur=()=>{
  if(VALIDATION.checkEmty("#hoa")){
    getElement("#tbHoa").innerHTML="Điểm hóa không được bỏ trống"
  }else if(!VALIDATION.checkMark("#hoa")){
    getElement("#tbHoa").innerHTML="Điểm hóa phải là số  và nằm trong thang điểm 10"
  }else{
    getElement("#tbHoa").innerHTML=""
    valid&=false
    return
  }
  valid=true
}
getElement("#ly").onblur=()=>{
  if(VALIDATION.checkEmty("#ly")){
    getElement("#tbLy").innerHTML="Điểm lý không được bỏ trống"
  }else if(!VALIDATION.checkMark("#ly")){
    getElement("#tbLy").innerHTML="Điểm lý phải là số  và nằm trong thang điểm 10"
  }else{
    getElement("#tbLy").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

//check ngày làm việc, lương ngày, bill
getElement("#date").onblur=()=>{
  if(VALIDATION.checkEmty("#date")){
    getElement("#tbDate").innerHTML="Ngày làm việc không được bỏ trống"
  }else if(!VALIDATION.checkNumber("#date")){
    getElement("#tbDate").innerHTML="Ngày làm việc phải là số"
  }else{
    getElement("#tbDate").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

getElement("#sale").onblur=()=>{
  if(VALIDATION.checkEmty("#sale")){
    getElement("#tbSale").innerHTML="Lương ngày không được bỏ trống"
  }else if(!VALIDATION.checkNumber("#sale")){
    getElement("#tbSale").innerHTML="Lương ngày phải là số"
  }else{
    getElement("#tbSale").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

getElement("#bill").onblur=()=>{
  if(VALIDATION.checkEmty("#bill")){
    getElement("#tbBill").innerHTML="Giá hóa đơn không được bỏ trống"
  }else if(!VALIDATION.checkNumber("#bill")){
    getElement("#tbBill").innerHTML="Giá hóa đơn phải là số"
  }else{
    getElement("#tbBill").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

// check đánh giá
getElement("#feedback").onblur=()=>{
  if(VALIDATION.checkEmty("#feedback")){
    getElement("#tbFeedback").innerHTML="Đánh giá không được bỏ trống"
  }else if(!VALIDATION.checkLetter("#feedback")){
    getElement("#tbFeedback").innerHTML="Đánh giá phải là số"
  }else{
    getElement("#tbFeedback").innerHTML=""
    valid&=false
    return
  }
  valid=true
}

getElement("#btnDong").onclick=()=>{
 const tb= getElementAll(".form-group p")
 const input= getElementAll(".form-group input,.form-group textarea")
 tb.forEach(e=>{
  e.innerHTML=""
 })
 input.forEach(e=>{
  e.value=""
 })
}

getElement(".typePerson").onchange=()=>{
  console.log("true")
  const tb= getElementAll(".form-group p")
 const input= getElementAll(".form-group input,.form-group textarea")
 tb.forEach(e=>{
  e.innerHTML=""
 })
 input.forEach(e=>{
  e.value=""
 })
}

