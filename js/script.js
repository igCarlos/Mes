
document.addEventListener('DOMContentLoaded', function() {


    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.no-select')) {
        e.preventDefault();
    }
    }, { passive: false });

    const audioPlayer = new Audio();
    audioPlayer.src = 'https://bcodestorague.anteroteobaldob.workers.dev/share/anteroteobaldob_gmail_com/AUDIO/those%20eyes%20.mp3';
    audioPlayer.loop = true;
    audioPlayer.volume = 0.3;
    let musicStarted = false;

    const startMusic = () => {
        if (!musicStarted) {
            audioPlayer.play().catch(e => console.log(e));
            musicStarted = true;
        }
    };

    window.addEventListener('scroll', () => {
        startMusic();
    });

    document.addEventListener('click', () => {
        startMusic();
    });


    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.photo-container, .photo-caption, .message-container, .signature');
    sections.forEach(section => {
        observer.observe(section);
    });
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    revealBtn.addEventListener('click', function() {
        hiddenMessage.style.display = 'block';
        hiddenMessage.style.animation = 'fadeIn 1.5s ease-out forwards';
        revealBtn.textContent = 'Gracias por existir';
        createFlowerEffect();
    });
    
    function createFlowerEffect() {
        const flowers = ['🌸', '🌹', '💐', '🌺', '🌷', '🥀', '🌻'];
        const container = document.getElementById('flowersContainer');
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = `${Math.random() * 100}vw`;
                flower.style.bottom = '-50px';
                const size = 0.5 + Math.random() * 2;
                flower.style.fontSize = `${size}rem`;
                const duration = 5 + Math.random() * 10;
                flower.style.animationDuration = `${duration}s`;
                flower.style.animationDelay = `${Math.random() * 5}s`;
                
                container.appendChild(flower);
                setTimeout(() => {
                    flower.remove();
                }, duration * 1000);
            }, i * 100);
        }
    }
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = '🌸';
            flower.style.left = `${Math.random() * 100}vw`;
            flower.style.top = `${Math.random() * 100}vh`;
            const size = 0.5 + Math.random() * 1.5;
            flower.style.fontSize = `${size}rem`;
            const duration = 10 + Math.random() * 20;
            flower.style.animationDuration = `${duration}s`;
            
            document.getElementById('flowersContainer').appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, duration * 1000);
        }, i * 500);
    }

    revealBtn.addEventListener('click', function() {
        hiddenMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });


    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            audioPlayer.pause();
        } else if (audioPlayer.paused) {
            audioPlayer.play();
        }
    });


});

class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.observers = [];
    }
    
    observe(element) {
        this.observers.push(element);
        window.addEventListener('scroll', this.check.bind(this));
        this.check();
    }
    
    check() {
        const windowHeight = window.innerHeight;
        const threshold = this.options.threshold || 0;
        
        this.observers.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= windowHeight * (1 - threshold) && 
                            rect.bottom >= windowHeight * threshold;
            
            if (isVisible) {
                this.callback([{ isIntersecting: true, target: element }]);
            }
        });
    }

    

}
