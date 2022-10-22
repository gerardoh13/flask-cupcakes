const cupcakesUl = document.getElementById("cupcakesUl");
const addCupcakeForm = document.getElementById("addCupcakeForm");
const editCupcakeForm = document.getElementById("editCupcakeForm");

async function fetchAllCupcakes() {
  res = await axios.get(`/api/cupcakes`);
  for (let c of res.data.cupcakes) {
    let cupcake = $(generateCupcake(c));
    $("#cupcakesUl").append(cupcake);
  }
}

function generateCupcake(c) {
  return `
<div id="cupcake-${c.id}" class="card m-auto col-lg-3 col-xs-2 cupcakeCard">
  <img src="${c.image}" class="card-img-top cardImg" alt="${c.flavor} cupcake">
  <div class="card-body row">
    <div class="col-10">
    <h5 class="card-title">${c.flavor}</h5>
    <p class="card-text">
    <b>Size: </b>${c.size} <b>Rating: </b>${c.rating}
    </p>
    </div>
    <div class="col-2">
    <br/>
    <button
    id="edit-${c.id}"
    class="btn btn-dark btn-sm"
    data-bs-toggle="modal"
    data-bs-target="#editCupcakeModal"><i class="fas fa-pencil-alt" id="icon-${c.id}"></i>
    </button>
    <button id="delete-${c.id}"class="btn btn-dark btn-sm">x</button>
    </div>
  </div>
</div>
`;
}

cupcakesUl.addEventListener("click", async (e) => {
  let target = e.target;
  let type = target.id.split("-");
  if (target.tagName === "BUTTON" && type[0] !== "edit") {
    deleteCupcake(type[1]);
  } else {
    showEditForm(type[1]);
  }
});
document.getElementById("editBtn").addEventListener("click", () => {
  $("#editCupcakeModal").modal("hide");
  editCupcake();
});
async function deleteCupcake(id) {
  await axios.delete(`api/cupcakes/${id}`);
  document.getElementById(`cupcake-${id}`).remove();
}

async function showEditForm(id) {
  res = await axios.get(`api/cupcakes/${id}`);
  cupcake = res.data.cupcake;
  document.getElementById("currImage").setAttribute("src", cupcake.image);
  document.getElementById("editFlavor").value = cupcake.flavor;
  document.getElementById("editSize").value = cupcake.size;
  document.getElementById("editRating").value = cupcake.rating;
  document.getElementById("editImage").value = cupcake.image;
  document.getElementById("editId").value = id;
}

addCupcakeForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    if (!addCupcakeForm.checkValidity()) {
      e.stopPropagation();
      addCupcakeForm.classList.add("was-validated");
      return;
    }
    addCupcake();
    addCupcakeForm.reset();
    addCupcakeForm.classList.remove("was-validated");
  },
  false
);

editCupcakeForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    if (!editCupcakeForm.checkValidity()) {
      e.stopPropagation();
      editCupcakeForm.classList.add("was-validated");
      return;
    }
    editCupcake();
    editCupcakeForm.reset();
    editCupcakeForm.classList.remove("was-validated");
  },
  false
);

async function addCupcake() {
  let flavor = document.getElementById("flavor").value;
  let size = document.getElementById("size").value;
  let rating = document.getElementById("rating").value;
  let image = document.getElementById("image").value;
  const newCupcakeRes = await axios.post("api/cupcakes", {
    flavor,
    size,
    rating,
    image,
  });
  let newCupcake = generateCupcake(newCupcakeRes.data.cupcake);
  $("#cupcakesUl").append(newCupcake);
}

async function editCupcake() {
  let flavor = document.getElementById("editFlavor").value;
  let size = document.getElementById("editSize").value;
  let rating = document.getElementById("editRating").value;
  let image = document.getElementById("editImage").value;
  let editId = document.getElementById("editId").value;

  const editedCupcakeRes = await axios.patch(`api/cupcakes/${editId}`, {
    flavor,
    size,
    rating,
    image,
  });
  document.getElementById(`cupcake-${editId}`).remove();
  let editedCupcake = generateCupcake(editedCupcakeRes.data.cupcake);
  $("#cupcakesUl").append(editedCupcake);
}
fetchAllCupcakes();
