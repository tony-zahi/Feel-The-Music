function changeBackground(buttonClass, backgroundLocations) {
    const changeBackgroundButton = document.querySelector(buttonClass);
    const body = document.body;

    function changeBackgroundImage(imageUrl) {
        body.style.backgroundImage = `url(${imageUrl})`;
    }

    // For mobile devices
    changeBackgroundButton.addEventListener('touchstart', () => {
        changeBackgroundImage(backgroundLocations.mobile);
        body.style.backgroundSize = 'cover'
    });

    changeBackgroundButton.addEventListener('touchend', () => {
        body.style.backgroundImage = "url('../Data/imags/main_page_imgs/mobile_main_page_images/home_page_background.jpg')";
    });

    // For large devices
    changeBackgroundButton.addEventListener('mouseenter', () => {
        changeBackgroundImage(backgroundLocations.desktop);
        body.style.backgroundSize = 'cover'
    });

    changeBackgroundButton.addEventListener('mouseleave', () => {
        body.style.backgroundImage = "url('../Data/imags/main_page_imgs/desktop_main_page_image/home_page_background.png')";
    });
}


// BILLIE EILLISH //
changeBackground('.billie_btn', {
    desktop: '../Data/imags/main_page_imgs/desktop_main_page_image/artists_buttons/billie.png',
    mobile: '../Data/imags/main_page_imgs/mobile_main_page_images/artists_buttons/billie_btn.png',
});

// SIA //
changeBackground('.sia_btn', {
    desktop: '../Data/imags/main_page_imgs/desktop_main_page_image/artists_buttons/sia.png',
    mobile: '../Data/imags/main_page_imgs/mobile_main_page_images/artists_buttons/sia_btn.png',
});

// LANA DEL REY //
changeBackground('.lana_btn', {
    desktop: '../Data/imags/main_page_imgs/desktop_main_page_image/artists_buttons/lana.png',
    mobile: '../Data/imags/main_page_imgs/mobile_main_page_images/artists_buttons/lana_btn.png',
});

// ADELE //
changeBackground('.adele_btn', {
    desktop: '../Data/imags/main_page_imgs/desktop_main_page_image/artists_buttons/adele.png',
    mobile: '../Data/imags/main_page_imgs/mobile_main_page_images/artists_buttons/adele_btn.png',
});


