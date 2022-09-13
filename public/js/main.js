const decreaseBtn = document.querySelector(".decrease");
const resetBtn = document.querySelector(".reset");

decreaseBtn.addEventListener("click", decreaseCount);
resetBtn.addEventListener("click", resetCount);

async function decreaseCount(){
    const response = await fetch('decreaseCount', {
        method: 'put'
    });
    const data = await response.json();
    console.log(data);
    location.reload();
}

async function resetCount(){
    const response = await fetch('resetCount', {
        method: 'delete'
    });
    const data = await response.json();
    console.log(data);
    location.reload();
}
