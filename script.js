document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DE AUDIO ---
    const audioPlayer = new Audio();
    audioPlayer.src = 'https://bcodestorague.anteroteobaldob.workers.dev/share/anteroteobaldob_gmail_com/AUDIO/those%20eyes%20.mp3';
    audioPlayer.loop = true;
    audioPlayer.volume = 0.4;
    let musicStarted = false;

    const btnAudio = document.getElementById('btnAudio');

    function startAudio() {
        if (!musicStarted) {
            audioPlayer.play().then(() => {
                if (btnAudio) { 
                    btnAudio.innerHTML = '❤️';
                    btnAudio.classList.add('activo');
                }
                musicStarted = true;
                // Limpiamos los eventos globales una vez que la música inició
                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
                document.removeEventListener('scroll', startAudio);
            }).catch(err => console.log("Esperando interacción para audio..."));
        }
    }

    // Eventos para activar audio en móviles
    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
    document.addEventListener('scroll', startAudio);

    if (btnAudio) { 
        btnAudio.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflictos con startAudio
            if (musicStarted && !audioPlayer.paused) {
                audioPlayer.pause();
                btnAudio.innerHTML = '🎵';
                btnAudio.classList.remove('activo');
            } else {
                audioPlayer.play();
                btnAudio.innerHTML = '❤️';
                btnAudio.classList.add('activo');
                musicStarted = true;
            }
        });
    }
    
    // --- EFECTO DE ESTRELLAS ---
    const crearEstrellas = () => {
        const estrellasContenedor = document.getElementById('estrellas');
        if (!estrellasContenedor) return;

        // Si es celular, creamos menos estrellas para mejor rendimiento
        const esMovil = window.innerWidth < 768;
        const cantidad = esMovil ? 70 : 150;
        
        for (let i = 0; i < cantidad; i++) {
            const estrella = document.createElement('div');
            estrella.classList.add('estrella');
            
            const tamaño = Math.random() * (esMovil ? 2 : 3) + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 4;
            
            estrella.style.width = `${tamaño}px`;
            estrella.style.height = `${tamaño}px`;
            estrella.style.left = `${posX}vw`;
            estrella.style.top = `${posY}vh`;
            estrella.style.animationDelay = `${delay}s`;
            
            estrellasContenedor.appendChild(estrella);
        }
    };
    
    // --- EFECTO DE PÉTALOS/FLOTANTES ---
    const crearPetalo = () => {
        const contenedor = document.getElementById('flotantes');
        if (!contenedor) return;

        const petalo = document.createElement('div');
        petalo.classList.add('petalo');
        
        const esMovil = window.innerWidth < 768;
        const inicioX = Math.random() * 100;
        const duracion = 6 + Math.random() * 6;
        const retraso = Math.random() * 2;
        const tamaño = esMovil ? (10 + Math.random() * 10) : (15 + Math.random() * 20);
        
        // Colores románticos aleatorios (rosas, violetas, blancos)
        const matices = [340, 350, 320, 0]; 
        const h = matices[Math.floor(Math.random() * matices.length)];
        
        petalo.style.left = `${inicioX}%`;
        petalo.style.width = `${tamaño}px`;
        petalo.style.height = `${tamaño}px`;
        petalo.style.backgroundColor = `hsl(${h}, 100%, 85%)`;
        petalo.style.borderRadius = "50% 0 50% 50%"; // Forma de pétalo
        petalo.style.opacity = Math.random() * 0.5 + 0.3;
        petalo.style.animationDuration = `${duracion}s`;
        petalo.style.animationDelay = `${retraso}s`;
        
        contenedor.appendChild(petalo);
        
        // Limpieza de memoria: eliminar el elemento cuando termine de caer
        setTimeout(() => {
            petalo.remove();
        }, (duracion + retraso) * 1000);
    };
    
    // --- OBSERVADOR DE APARICIÓN (FADE IN) ---
    const observerOptions = {
        threshold: 0.15 // Se activa cuando el 15% de la sección es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.seccion').forEach(seccion => {
        observer.observe(seccion);
    });
    
    // --- INICIALIZACIÓN ---
    crearEstrellas();
    
    // Lanzar pétalos de forma continua
    setInterval(crearPetalo, 800); 
});
