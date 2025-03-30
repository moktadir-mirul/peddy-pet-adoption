const loadButtons = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const displayCategories = (btnsName) => {
    const btns = btnsName;
    console.log(btns)
    for(let btn of btns) {
        const btnContainer = document.getElementById('btn-container');
        const div = document.createElement('div');
        div.innerHTML = `
                <button onclick="loadPets('${btn.category}')" class="px-16 py-5 border border-[#0e7a8126] flex gap-5 justify-between items-center rounded-xl hover:rounded-[120px] hover:bg-[#0E7A811A] duration-300">
                    <img class="w-8" src="${btn.category_icon}" alt="">
                    <p class="font-extrabold">${btn.category}</p>
                </button>
        `
        btnContainer.appendChild(div);
    }
}

const loadPets = (petCategory) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCategory}`)
    .then(res => res.json())
    .then(data => displayPets(data.data))
}

const displayPets = (pets) => {
    console.log(pets);
    const petContainer = document.getElementById('pet-container');
        petContainer.innerHTML='';
        if(pets.length <=0) {
            petContainer.innerHTML = `
                    <div class="col-span-4 bg-gray-300 space-y-5 rounded-lg p-8 text-center">
                        <img class="w-36 mx-auto" src="images/error.webp" alt="Error Icon">
                        <h1 class="inter text-3xl text-black font-bold">No Information Available</h1>
                        <p class="inter text-gray-600 text-sm">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                            its layout. The point of using Lorem Ipsum is that it has a.
                        </p>
                    </div>
            `
            return;
        }
    for(let pet of pets) {
        
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-4 space-y-4 border border-gray-300 rounded-lg">
                    <div>
                        <img src="${pet.image}" alt="Pet images">
                    </div>
                    <div class="space-y-2 pb-2 border-b border-gray-300">
                        <h1 class="inter text-xl font-extrabold">${pet.pet_name}</h1>
                        <p class="lato text-gray-500 text-base flex items-center gap-5"><i class="fa-solid fa-wind"></i> Breed: ${pet.breed}</p>
                        <p class="lato text-gray-500 text-base flex items-center gap-5"><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                        <p class="lato text-gray-500 text-base flex items-center gap-5"><i class="fa-solid fa-mars-and-venus"></i> Gender: ${pet.gender}</p>
                        <p class="lato text-gray-500 text-base flex items-center gap-5"><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                    </div>
                    <div class="flex justify-between">
                        <button id="${pet.petId}" onclick="addFav('${pet.image}', '${pet.petId}')" class="btn border border-[#0e7a8126] rounded-xl hover:bg-[#0E7A811A] duration-300">
                            <i class="fa-regular fa-thumbs-up"></i> 
                        </button>
                        <button class="btn border border-[#0e7a8126] rounded-xl hover:bg-[#0E7A811A] font-bold duration-300 text-[#0E7A81]">
                            Adopt      
                        </button>
                        <button onclick="loadDetails('${pet.petId}')" class="btn border border-[#0e7a8126] rounded-xl hover:bg-[#0E7A811A] duration-300 text-[#0E7A81] font-bold">
                            Details
                        </button>
                    </div>
                </div>
        `
        petContainer.appendChild(div);
    }
}
loadButtons();

const title = document.getElementById('detailsTitle');
const para = document.getElementById('detailsPara');
const image = document.getElementById("dImg");
console.log(image);

function loadDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data.petData));
}

const displayDetails = (details) => {
    title.innerHTML = `${details.pet_name}`
    para.innerHTML = `${details.pet_details}`;
    image.src=`${details.image}`;
    document.getElementById('breed').innerHTML= `<i class="fa-solid fa-wind"></i> Breed:  ${details.breed}`;
    document.getElementById('birth').innerHTML= `<i class="fa-regular fa-calendar"></i> Birth:   ${details.date_of_birth}`;
    document.getElementById('gender').innerHTML= `<i class="fa-solid fa-mars-and-venus"></i> Gender:  ${details.gender}`;
    document.getElementById('price').innerHTML= `<i class="fa-solid fa-dollar-sign"></i> Price:  ${details.price}`;
    document.getElementById('vaccine').innerHTML = `<i class="fa-solid fa-mars-and-venus"></i> Vaccinated Status:  ${details.vaccinated_status}`
    const modal = document.getElementById('displayDetails');
    modal.showModal();
}
function addFav(imgSrc , idbtn) {
    document.getElementById(idbtn).classList.add('active');
    const container = document.getElementById('fav-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <img
                class="w-[86px] h-24 rounded-lg"
                src="${imgSrc}"
                alt=""
              />
    `
    container.appendChild(div);
}