/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`, {
    interval: 200
})



/*==================== Menu ====================*/
const preciosPizzas = {
    "Pizza Muzzarella": 2500,
    "Pizza Napolitana": 2800,
    "Pizza Jamon y Morrones": 3200,
    "Pizza Fugazzeta": 3000,
    "Pizza Calabresa": 3500,
    "Pizza Rucula": 3300,
    "Pizza Provolone": 3400,
    "Pizza Cuatro Quesos": 4000,
    "Pizza Vegetariana": 3100,
    "Pizza con Huevo": 2900
  };

  const preciosEmpanadas = {
    "Empanada de Carne": 3000,
    "Empanada de Jamon y Queso": 3500,
    "Empanada de Humita": 3200,
    "Empanada de Roquefort y Nuez": 4000,
    "Empanada de Pollo": 3000,
    "Empanada Caprese": 3800,
    "Empanada de Cebolla y Queso": 3500
  };

  function agregarOpcionPizza(event) {
    event.preventDefault();
    agregarItem("opcionesPizzas", preciosPizzas, "pizza", 5);
  }

  function agregarOpcionEmpanada(event) {
    event.preventDefault();
    agregarItem("opcionesEmpanadas", preciosEmpanadas, "empanada", [3, 6, 12]);
  }

  function agregarItem(containerId, precios, prefix, maxQuantity) {
    const container = document.getElementById(containerId);
    const itemIndex = container.childElementCount + 1;

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");

    const select = document.createElement("select");
    select.name = `${prefix}${itemIndex}`;
    select.classList.add("item-select");
    select.onchange = actualizarPrecioTotal;

    for (let tipo in precios) {
      const option = document.createElement("option");
      option.value = tipo;
      option.text = tipo;
      select.appendChild(option);
    }

    const quantitySelect = document.createElement("select");
    quantitySelect.classList.add("quantity-select");
    quantitySelect.onchange = actualizarPrecioTotal;

    if (Array.isArray(maxQuantity)) {
      maxQuantity.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.text = value;
        quantitySelect.appendChild(option);
      });
    } else {
      for (let i = 1; i <= maxQuantity; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        quantitySelect.appendChild(option);
      }
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("button-remove");
    removeButton.onclick = (e) => eliminarItem(e, itemContainer);

    itemContainer.appendChild(select);
    itemContainer.appendChild(quantitySelect);
    itemContainer.appendChild(removeButton);
    container.appendChild(itemContainer);

    actualizarPrecioTotal();
  }

  function eliminarItem(event, itemContainer) {
    event.preventDefault();
    itemContainer.remove();
    actualizarPrecioTotal();
  }

  function actualizarPrecioTotal() {
    let precioTotal = 0;

    // Calcular el precio de las pizzas seleccionadas
    const pizzaItems = agruparItems("#opcionesPizzas .item-container", preciosPizzas);
    pizzaItems.forEach(({ tipo, cantidad }) => {
      precioTotal += preciosPizzas[tipo] * cantidad;
    });

    // Calcular el precio de las empanadas seleccionadas
    const empanadaItems = agruparItems("#opcionesEmpanadas .item-container", preciosEmpanadas);
    empanadaItems.forEach(({ tipo, cantidad }) => {
      precioTotal += preciosEmpanadas[tipo] * (cantidad / 12);
    });

    document.getElementById("precioTotal").textContent = Math.round(precioTotal);
  }

  function agruparItems(selector, precios) {
    const items = {};
    const containers = document.querySelectorAll(selector);
    containers.forEach((item) => {
      const tipo = item.querySelector(".item-select").value;
      const cantidad = parseInt(item.querySelector(".quantity-select").value, 10) || 0;
      if (!items[tipo]) items[tipo] = 0;
      items[tipo] += cantidad;
    });
    return Object.entries(items).map(([tipo, cantidad]) => ({ tipo, cantidad }));
  }

  function hacerPedido() {
    const phoneNumber = "5492215062076";
    const pizzaItems = agruparItems("#opcionesPizzas .item-container", preciosPizzas);
    const empanadaItems = agruparItems("#opcionesEmpanadas .item-container", preciosEmpanadas);

    if (pizzaItems.length === 0 && empanadaItems.length === 0) {
      alert("Debes agregar al menos un producto para enviar el pedido.");
      return;
    }

    let mensaje = `*Pedido de La Tana*:\n\n`;

    if (pizzaItems.length > 0) {
      mensaje += "*Pizzas*\n";
      pizzaItems.forEach(({ tipo, cantidad }) => {
        mensaje += `- ${cantidad}x ${tipo}\n`;
      });
      mensaje += "\n";
    }

    if (empanadaItems.length > 0) {
      mensaje += "*Empanadas*\n";
      empanadaItems.forEach(({ tipo, cantidad }) => {
        mensaje += `- ${cantidad}x ${tipo}\n`;
      });
      mensaje += "\n";
    }

    const precioTotal = document.getElementById("precioTotal").textContent;
    mensaje += `*Total: $${precioTotal}*`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");
  }