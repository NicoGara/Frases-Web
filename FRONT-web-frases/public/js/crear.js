document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const quoteForm = document.getElementById('quote-form');
    const quoteContent = document.getElementById('quote-content');
    const quoteAuthor = document.getElementById('quote-author');
    const backBtn = document.getElementById('back-btn');
    const statusContainer = document.getElementById('status-container');


    if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
        window.location.href = 'http://localhost:3001/login';
    }

    // Función para mostrar mensajes de estado
    function showStatusMessage(message, type) {
        statusContainer.innerHTML = `
            <div class="status-message ${type}">
                ${message}
            </div>
        `;

        // Hacer que el mensaje desaparezca después de 4 segundos
        setTimeout(() => {
            statusContainer.innerHTML = '';
        }, 4000);
    }

    // Manejar envío del formulario
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validación básica
        if (!quoteContent.value.trim() || !quoteAuthor.value.trim()) {
            showStatusMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        try {
            // En una aplicación real, aquí se haría una petición POST al backend
            // para guardar la nueva frase. Como esto es una demostración sin
            // backend completo, simulamos una respuesta exitosa.
            
            // Simulación de envío (con delay para simular la petición)
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Mostrar mensaje de éxito
            showStatusMessage('¡Frase guardada correctamente!', 'success');
            
            // Limpiar el formulario
            quoteForm.reset();
            
            // En un caso real, el código sería similar a este:
            /*
            const response = await fetch('http://localhost:3000/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contenido: quoteContent.value.trim(),
                    autor: quoteAuthor.value.trim()
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al guardar la frase');
            }
            
            const data = await response.json();
            showStatusMessage('¡Frase guardada correctamente!', 'success');
            quoteForm.reset();
            */
            
        } catch (error) {
            console.error('Error al guardar la frase:', error);
            showStatusMessage('Error al guardar la frase.', 'error');
        }
    });

    // Configurar botón para volver a la página principal
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Configurar botón para ver todas las frases
    const listBtn = document.getElementById('list-btn');
    listBtn.addEventListener('click', () => {
        window.location.href = 'all-quotes.html';
    });
});