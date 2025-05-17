document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const quoteContainer = document.getElementById('quote-container');
    const addQuoteBtn = document.getElementById('add-quote-btn');

    // Función para cargar frases desde el servidor
    async function loadQuote() {
        try {
            // Mostrar spinner mientras carga
            quoteContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                </div>
            `;

            // Realizar petición GET al endpoint
            const response = await fetch('http://localhost:3000');
            
            if (!response.ok) {
                throw new Error('No se pudo cargar la información');
            }

            const quotes = await response.json();
            
            // Verificar si hay frases disponibles
            if (!quotes || quotes.length === 0) {
                quoteContainer.innerHTML = `
                    <p class="error-message">No hay frases disponibles.</p>
                `;
                return;
            }

            // Seleccionar una frase aleatoria del array
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];

            // Actualizar el contenido
            quoteContainer.innerHTML = `
                <div class="quote-content">"${quote.contenido}"</div>
                <div class="quote-author">— ${quote.autor}</div>
            `;
            
        } catch (error) {
            console.error('Error al cargar la frase:', error);
            quoteContainer.innerHTML = `
                <p class="error-message">Error al cargar la frase.</p>
            `;
        }
    }

    // Cargar una frase al iniciar la página
    loadQuote();

    // Configurar botón para navegar a la página de añadir frases
    addQuoteBtn.addEventListener('click', () => {
        window.location.href = 'add-quote.html';
    });
});