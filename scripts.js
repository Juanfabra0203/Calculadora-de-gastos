let transacciones = [];

const form = document.getElementById("form");
const balance = document.getElementById("balance");
const descripcion = document.getElementById("descripcion");
const monto = document.getElementById("monto");
const tipo = document.getElementById("tipo")
const lista = document.getElementById("lista-transacciones")

form.addEventListener('submit' ,  function (e) {
    e.preventDefault();

    const transacion = {
        id: Date.now(),
        descripcion: descripcion.value,
        monto: parseFloat(monto.value),
        tipo: tipo.value
    }

    transacciones.push(transacion);
    guardarEnLS();
    actualizarUI();

    descripcion.value = '';
    monto.value = '';
})

function actualizarUI(){
    lista.innerHTML = ' ';

    let total = 0;

    transacciones.forEach((t)=>{
        const li = document.createElement("li");
        if (t.tipo === "gasto"){
            li.style.color = "red";
        }else{
            li.style.color = "green"
        }

        li.textContent = `${t.descripcion} : ${t.tipo === 'gasto' ? "-" : "+" } ${t.monto.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}`;
        lista.appendChild(li);

        total += t.tipo === 'gasto' ? -t.monto : t.monto;
    });

    balance.textContent = `Balance actual: ${total.toLocaleString('es-ES', { style: 'currency', currency: 'COP' })}`;
}
              
function guardarEnLS(){
    localStorage.setItem('trncion' , JSON.stringify(transacciones));
}

function cargarDesdeLocalStorage() {
    const data = localStorage.getItem('transacciones');
    if (data) {
      transacciones = JSON.parse(data);
      actualizarUI();
    }
}

cargarDesdeLocalStorage();
