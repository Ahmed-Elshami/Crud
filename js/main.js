
var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDescription=document.getElementById("productDescription");
var submitBtn=document.getElementById("submitBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput=document.getElementById("search");
var nameAlert=document.getElementById("nameAlert");
var categoryAlert=document.getElementById("categoryAlert");

var products=[];
var currentIndex=0;

productName.onkeyup=function(){
  var nameRejex=/^[A-Z][a-z]{2,8}$/
  if(!nameRejex.test(productName.value))
  {
    submitBtn.disabled="true"
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
  else{
    // submitBtn.removeAttribute("disabled")
    productName.classList.add("is-valid")
    productName.classList.remove("is-invalid")
    nameAlert.classList.add("d-none");
    return true;
  }
}
productCategory.onkeyup=function(){
  var nameRejex=/^[A-Z][a-z]{3,10}$/
  if(!nameRejex.test(productCategory.value))
  {
    submitBtn.disabled="true"
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
    return false;
  }
  else{
    submitBtn.removeAttribute("disabled")
    productCategory.classList.add("is-valid")
    productCategory.classList.remove("is-invalid")
    categoryAlert.classList.add("d-none");
    return true;
  }
}

if(JSON.parse(localStorage.getItem("ProductsList"))!=null)
{
  products=JSON.parse(localStorage.getItem("ProductsList"));
  displayData()
}


submitBtn.onclick=function(){
  if(submitBtn.innerHTML=="Add Product")
  {
    addProduct();
  }else
  {
    updateProduct();
  }
  
  displayData();
  clearForm();

}


function addProduct(){
  var product=
  {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescription.value
  }
  products.push(product);
  localStorage.setItem("ProductsList",JSON.stringify(products))
}

function displayData(){
  var trs='';
  for(var i=0;i<products.length;i++)
  {
    trs+=`<tr>
      <td>${(i+1)}</td>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].description}</td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
      <td><button onclick="editProduct(${i})" class="btn btn-warning">Update</button></td>

    </tr>`

  }

  document.getElementById("tableBody").innerHTML=trs
}

function clearForm(){
  for(var i=0;i<inputs.length;i++)
  {
    inputs[i].value="";
  }
}

function deleteProduct(index){

  products.splice(index,1)
  displayData();
  localStorage.setItem("ProductsList",JSON.stringify(products))

}


searchInput.onkeyup=function(){
  var trs='';
  var val=searchInput.value;
  for(var i=0;i<products.length;i++){

    if(products[i].name.toLowerCase().includes(val.toLowerCase())){
      trs+=`<tr>
        <td>${(i+1)}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="editProduct()" class="btn btn-warning">Update</button></td>

      </tr>`

    }
  }
  document.getElementById("tableBody").innerHTML=trs
}


function editProduct(index){
  productName.value=products[index].name;
  productPrice.value=products[index].price;
  productCategory.value=products[index].category;
  productDescription.value=products[index].description;
  submitBtn.innerHTML="Update Product";
  currentIndex=index;
}

function updateProduct(){
  var product=
  {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescription.value
  }
  products[currentIndex]=product;
  localStorage.setItem("ProductsList",JSON.stringify(products))
}