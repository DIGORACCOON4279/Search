 // 1. Cargar el JSON con las cards
async function cargarCards() {
    try {
        const respuesta = await fetch('./javascript/cards.json'); // Asegúrate que el archivo está en la misma carpeta
        const data = await respuesta.json();
        return data.cards; // Devolver el array de cards
    } catch (error) {
        console.error('Error al cargar las cards:', error);
    }
}

// 2. Mostrar las cards en el DOM
function mostrarCards(cards) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (cards.length === 0) {
        cardsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // Ternario obtiene el mismo resultado
    // cardsContainer === 0 ? cardsContainer.innerHTML = '<p>No se encontraron resultados.</p>' : null

    cards.forEach(card => {
        const cardHTML = `
            <div class="card">
                <h3 class="title">${card.title}</h3>
                <p class="content">${card.content}</p>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

// 3. Función de búsqueda (exacta y parcial)
function buscarCards(cards, termino) {
    return cards.filter(card => card.title.toLowerCase().includes(termino.toLowerCase()));
}

// 4. Iniciar el buscador
document.addEventListener('DOMContentLoaded', async () => {
    const cards = await cargarCards(); // Cargar cards al inicio
    const inputBuscador = document.getElementById('search');

    // Mostrar todas las cards al cargar la página
    mostrarCards(cards);

    // Escuchar eventos de entrada en el buscador
    inputBuscador.addEventListener('input', () => {
        const termino = inputBuscador.value.trim();
        const resultados = buscarCards(cards, termino);
        mostrarCards(resultados);
    });
});
