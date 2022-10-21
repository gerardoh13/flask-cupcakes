const cupcakesUl = document.getElementById("cupcakesUl");
const cupcakeForm = document.getElementById("cupcakeForm");
const flavor = document.getElementById("flavor");
const size = document.getElementById("size");
const rating = document.getElementById("rating");
const image = document.getElementById("image");

async function fetchAllCupcakes() {
  res = await axios.get(`/api/cupcakes`);
  for (let c of res.data.cupcakes) {
    let cupcake = $(generateCupcake(c));
    $("#cupcakesUl").append(cupcake);
  }
}

function generateCupcake(c) {
  return `
<li id=${c.id} class="row">
<div class="col-6">
<img src=${c.image} alt="cupcake img">
</div>
<div class="col-4">
<p>${c.flavor} ${c.size} ${c.rating}</p>
</div>
<div class="col-2">
<button class="btn btn-danger">x</button>
</div>
</li>
`;
}

cupcakesUl.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName === "BUTTON") {
    delLi = e.target.parentElement.parentElement;
    delLi.remove();
  }
});

cupcakeForm.addEventListener("submit", (e) => {
  // e.preventDefault();
  if (!cupcakeForm.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
  cupcakeForm.classList.add("was-validated");
  addCupcake();
}, false);

async function addCupcake() {
flav = flavor.value
console.log(flav)
}

fetchAllCupcakes();
