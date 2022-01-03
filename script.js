class comprador{
    constructor(nombre, apellido, telefono, ciudad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.ciudad = ciudad;
    }
    mostrar(){
var he = document.createElement("H1")
var te = document.createTextNode("Su nombre es: " + this.nombre + " " + this.apellido + ", su telefono es: " + this.telefono + " y su ciudad es: " + this.ciudad)
he.appendChild(te)
document.body.appendChild(he);
    }
}

let name = prompt("Ingrese su nombre");
let lastname = prompt("Ingrese su apellido");
let tel = prompt("Ingrese su teléfono");
let city = prompt("Ingrese su ciudad");
const comprador1 = new comprador(name, lastname, tel, city);
comprador1.mostrar();

let prod = prompt("Ingrese el producto que desea comprar");
let valor = prompt("Ingrese el valor del producto que desea comprar");
let cant = prompt("Ingrese la cantidad de productos iguales que lleva");
let total = valor * cant;
const list = [id= prod, valor= valor, cant= cant, total= total];
console.log(list);
var h = document.createElement("H1")
var t = document.createTextNode("El valor unitario de: " + prod + " es: $" + valor + ". Usted lleva: " + cant + ". El total es: $" + total)
h.appendChild(t)
document.body.appendChild(h);