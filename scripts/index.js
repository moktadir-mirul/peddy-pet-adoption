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
                <button class="px-16 py-5 border border-[#0e7a8126] flex gap-5 justify-between items-center rounded-xl hover:rounded-[120px] hover:bg-[#0E7A811A] duration-300">
                    <img src="${btn.category_icon}" alt="">
                    <p class="font-extrabold">${btn.category}</p>
                </button>
        `
        btnContainer.appendChild(div);
    }
}
loadButtons()