let valor = prompt("Ingrese el valor del producto que desea comprar");
let cant = prompt("Ingrese la cantidad de productos iguales que lleva");
let total = valor * cant;
alert("El total a pagar es: $" + total);
var h = document.createElement("H1")
var t = document.createTextNode("La suma de sus productos es: $" + total)
h.appendChild(t)
document.body.appendChild(h);