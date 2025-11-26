document.addEventListener('DOMContentLoaded', function () {

    const images = ['images.jpg', 'images2.jpg', 'images3.jpg', 'images4.jpg'];
    const banner = document.getElementById('banner');
    if (banner) {
        let idx = 0;
        const duration = 4000;
        let timer = null;

        const current = (banner.getAttribute('src') || '').split('/').pop();
        const found = images.indexOf(current);
        if (found >= 0) idx = found;

        banner.style.transition = 'opacity 220ms ease';
        banner.style.opacity = '1';

        function show() {
            banner.style.opacity = '0';
            setTimeout(() => {
                banner.src = images[idx];
                banner.style.opacity = '1';
            }, 160);
        }

        function start() {
            stop();
            timer = setInterval(() => {
                idx = (idx + 1) % images.length;
                show();
            }, duration);
        }

        function stop() {
            if (timer) { clearInterval(timer); timer = null; }
        }

        window.ir = function () {
            stop();
            idx = (idx + 1) % images.length;
            show();
            start();
        };

        window.voltar = function () {
            stop();
            idx = (idx - 1 + images.length) % images.length;
            show();
            start();
        };

        banner.addEventListener('mouseenter', stop);
        banner.addEventListener('mouseleave', start);

        show();
        start();
    }

    const CART_KEY = 'funko_cart_count_v1';
    let cartCount = parseInt(localStorage.getItem(CART_KEY), 10) || 0;

    function createBadge() {
        let el = document.getElementById('funko-cart-badge');
        if (el) return el;
        el = document.createElement('div');
        el.id = 'funko-cart-badge';
        Object.assign(el.style, {
            position: 'fixed',
            right: '16px',
            top: '16px',
            background: '#ff0000',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '20px',
            fontWeight: '700',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
        });
        el.title = 'Carrinho';
        document.body.appendChild(el);
        return el;
    }

    function updateBadge() {
        const badge = createBadge();
        badge.textContent = `Carrinho: ${cartCount}`;
    }

    updateBadge();

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
            cartCount = (cartCount || 0) + 1;
            localStorage.setItem(CART_KEY, String(cartCount));
            updateBadge();

            const prev = btn.textContent;
            btn.textContent = 'Adicionado';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = prev;
                btn.disabled = false;
            }, 800);
        });
    });

    window.clearFunkoCart = function () {
        cartCount = 0;
        localStorage.removeItem(CART_KEY);
        updateBadge();
    };
});