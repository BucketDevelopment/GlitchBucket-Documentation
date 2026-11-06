(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion')) return;
    document.querySelectorAll('[data-stagger]').forEach((group) => {
        [...group.children].forEach((child, index) => {
            child.setAttribute('data-reveal', group.getAttribute('data-stagger') || '');
            child.style.setProperty('--i', String(index));
        });
    });
    const pending = new Set(document.querySelectorAll('[data-reveal]'));
    const show = (el) => {
        pending.delete(el);
        el.classList.add('in');
        // bỏ transition của hiệu ứng hiện ra để hover của card dùng lại transition gốc
        el.addEventListener('transitionend', () => el.removeAttribute('data-reveal'), { once: true });
    };
    // hiện các khối đã vào (hoặc đã đi qua) khung nhìn; nhảy thẳng tới #faq thì các khối phía trên cũng hiện luôn
    let frame = 0;
    const check = () => {
        frame = 0;
        const edge = innerHeight * 0.92;
        for (const el of pending) if (el.getBoundingClientRect().top < edge) show(el);
        if (!pending.size) removeEventListener('scroll', schedule);
    };
    const schedule = () => {
        if (!frame) frame = requestAnimationFrame(check);
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    addEventListener('load', schedule);
    schedule();
})();
