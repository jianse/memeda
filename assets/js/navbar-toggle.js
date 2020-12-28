window.addEventListener("DOMContentLoaded", event => {
    // Create navbar toggle icon

    const navbarToggleLabel = document.querySelector('.navbar-toggle');
    const navbarToggleLabelInner = document.createElement('div');

    navbarToggleLabelInner.className = 'navbar-toggle-inner';
    navbarToggleLabel.appendChild(navbarToggleLabelInner);

    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');

        navbarToggleLabelInner.appendChild(span);
    }


    // Main function

    const navbarToggle = document.getElementById('navbar-toggle');
    const header = document.querySelector('.header');
    const navbarCurtain = document.querySelector('.navbar-curtain');

    navbarToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            header.classList.add('open');
            navbarToggleLabel.classList.add('open');

            header.classList.remove('fade');

            navbarCurtain.style = 'display: block';
        } else {
            header.classList.remove('open');
            navbarToggleLabel.classList.remove('open');

            header.classList.add('fade');

            // Cannot remove `display: block` immediately, or CSS animation
            // will failed. The workaround is down below.

            // navbarCurtain.removeAttribute('style');
        }
    });


    // Fix animation failed caused by removing `display: block`

    navbarCurtain.addEventListener('animationend', (e) => {
        if (!navbarToggle.checked) {
            e.target.removeAttribute('style');
        }
    });


    window.addEventListener(
        'scroll',
        throttle(function() {
            // Close navbar when window is scrolled by user
            checkInput();
        }, delayTime)
    );


    const maxWidth = window.getComputedStyle(document.documentElement, null).getPropertyValue('--max-width');
    let mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`);

    mediaQuery.addListener(e => {
        if (!e.matches) {
            // We are no longer in responsive mode, close nav
            closeNavbar(true);
        }
    });


    function checkInput() {
        // https://github.com/reuixiy/hugo-theme-meme/issues/171
        const input = document.getElementById('search-input');
        if (input && input === document.activeElement) {
            return;
        }

        closeNavbar();
    }

    function closeNavbar(noFade) {
        if (navbarToggle.checked) {
            navbarToggle.checked = false;

            header.classList.remove('open');
            navbarToggleLabel.classList.remove('open');

            if (noFade) {
                navbarCurtain.removeAttribute("style");
            }
            else {
                header.classList.add('fade');
            }
        }
    }
}, {once: true});
