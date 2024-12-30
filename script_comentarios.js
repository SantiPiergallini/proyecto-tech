// Función para inicializar Disqus en una página específica
function initializeDisqus() {
    // Asegúrate de reemplazar 'YOUR_SHORTNAME' con el shortname de tu foro en Disqus
    var disqus_shortname = 'YOUR_SHORTNAME'; // Tu shortname de Disqus
    var currentPageUrl = window.location.href;  // URL actual de la página
    var currentPageTitle = document.title; // Título de la página

    // Aseguramos que el contenedor de Disqus exista en la página
    var disqusThread = document.getElementById('disqus_thread');
    if (!disqusThread) {
        console.error('No se encontró el contenedor de Disqus en el HTML.');
        return;
    }

    // Configuración de Disqus
    var disqus_config = function () {
        this.page.url = currentPageUrl; // Usamos la URL actual de la página
        this.page.identifier = currentPageTitle; // Usamos el título de la página como identificador único
    };

    // Crear el script de Disqus e inyectarlo en el HTML
    (function() {
        var d = document, s = d.createElement('script');
        s.src = `https://${disqus_shortname}.disqus.com/embed.js`; // URL de Disqus con tu shortname
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
}

// Asegúrate de ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Llamamos a la función para inicializar Disqus
    initializeDisqus();
});
