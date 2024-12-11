try {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Цвета градиента
    const gradientColors = ['#87CEEB', '#4682B4', '#1E90FF'];
    const words = ['Task', 'Management', 'Support', 'Ticket', 'AI', 'Planning', 'Teamwork', 'Productivity'];
    const stars = [];

    // Создаём градиент
    let gradient;
    function createGradient() {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(0.5, gradientColors[1]);
        gradient.addColorStop(1, gradientColors[2]);
    }

    // Инициализация "звёзд"
    function initStars() {
        for (let i = 0; i < 50; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                opacity: Math.random(),
                word: words[Math.floor(Math.random() * words.length)],
                size: Math.random() * 20 + 10,
                fadeSpeed: (Math.random() * 0.005 + 0.0025), // Замедляем мерцание
                speedY: Math.random() * 0.5 + 0.2, // Скорость движения вниз
                fadingOut: false, // Состояние: слово начинает гаснуть
            });
        }
    }

    // Анимация "звёзд"
    function animateStars() {
        // Рисуем фон (градиент) один раз за кадр
        ctx.globalAlpha = 1; // Устанавливаем прозрачность фона на 100%
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Рисуем слова
        for (let star of stars) {
            ctx.globalAlpha = star.opacity; // Устанавливаем прозрачность только для слов
            ctx.font = `${star.size}px Arial`;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(star.word, star.x, star.y);

            // Меняем прозрачность
            if (!star.fadingOut) {
                star.opacity += star.fadeSpeed;
                if (star.opacity >= 1) {
                    star.fadingOut = true; // Начинаем гасить слово
                }
            } else {
                star.opacity -= star.fadeSpeed;
                if (star.opacity <= 0) {
                    star.opacity = 0;
                    star.fadingOut = false; // Снова начинаем мерцать
                    // Меняем слово после полного гашения
                    star.word = words[Math.floor(Math.random() * words.length)];
                    star.size = Math.random() * 20 + 10;
                }
            }

            // Двигаем слово вниз
            star.y += star.speedY;
            if (star.y > canvas.height) {
                // Если слово выходит за нижнюю границу экрана, обновляем его параметры
                star.y = -star.size;
                star.x = Math.random() * canvas.width; // Случайная горизонтальная позиция
                star.word = words[Math.floor(Math.random() * words.length)];
                star.opacity = 0; // Слово начинает заново, полностью погашенное
                star.fadingOut = false; // Сбрасываем состояние
            }
        }

        requestAnimationFrame(animateStars);
    }

    // Адаптация canvas к размеру окна
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars.length = 0;
        createGradient();
        initStars();
    });

    // Запуск
    createGradient();
    initStars();
    animateStars();

} catch (error) {
    window.location.reload();
}
