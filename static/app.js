let cupcakesUl = document.getElementById("cupcakesUl");

async function fetchAllCupcakes() {
  res = await axios.get(`/api/cupcakes`);
  renderCupcakes(res.data.cupcakes);
}

function renderCupcakes(cupcakes) {
  for (let c of cupcakes) {
    let cupcake = $(generateCupcake(c));
    $("#cupcakesUl").append(cupcake);
  }
}

function generateCupcake(c) {
  return `
<li id=${c.id}>
<span>
<img src=${c.image} alt="cupcake img">
    <p>${c.flavor} ${c.size} ${c.rating}
    <button class="btn btn-danger">x</button>
    </p>
</span>
</li>
`;
}

cupcakesUl.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});

fetchAllCupcakes();
