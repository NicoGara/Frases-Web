document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const quotesContainer = document.getElementById('quotes-container');
    const homeBtn = document.getElementById('home-btn');
    const addBtn = document.getElementById('add-btn');

    // Función para formatear la fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Función para cargar todas las frases desde el servidor
    async function loadAllQuotes() {
        try {
            // Mostrar spinner mientras carga
            quotesContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                </div>
            `;

            // Realizar petición GET al endpoint
            const response = await fetch('http://localhost:3000/all');
            
            if (!response.ok) {
                throw new Error('No se pudo cargar la información');
            }

            const quotes = await response.json();
            
            // Verificar si hay frases disponibles
            if (!quotes || quotes.length === 0) {
                quotesContainer.innerHTML = `
                    <div class="no-quotes">No hay frases disponibles</div>
                `;
                return;
            }

            // Ordenar las frases por fecha (más recientes primero)
            quotes.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));

            // Crear HTML para todas las frases
            const quotesHTML = quotes.map(quote => `
                <div class="quote-card" data-id="${quote.frase_id}">
                    <div class="quote-content">"${quote.contenido}"</div>
                    <div class="quote-footer">
                        <div class="quote-author">— ${quote.autor}</div>
                        <div class="quote-date">${formatDate(quote.fecha_publicacion)}</div>
                    </div>
                </div>
            `).join('');

            // Actualizar el contenido
            quotesContainer.innerHTML = quotesHTML;
            
        } catch (error) {
            console.error('Error al cargar las frases:', error);
            quotesContainer.innerHTML = `
                <p class="error-message">Error al cargar las frases.</p>
            `;
        }
    }

    // Cargar todas las frases al iniciar la página
    loadAllQuotes();

    // Configurar botones de navegación
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    addBtn.addEventListener('click', () => {
        window.location.href = 'add-quote.html';
    });
});