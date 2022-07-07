const elm_header         = document.getElementsByTagName('header')[0],
    elm_show_more        = document.getElementsByClassName('show-more'),
    elm_header_nav_items = document.querySelectorAll('header .nav-item'),
    elm_sections         = document.getElementsByTagName('section'),
    elm_card_img_holder  = document.querySelectorAll('.card-img-holder > img'),
    elm_year             = document.getElementById('year')
;

// Set year.
elm_year.textContent = (new Date()).getFullYear();

let elm_header_nav_item_active = 0;

for (let item of elm_show_more) {
    item.onclick = function () {
        if (this.parentElement.dataset.showInfo === '1') {
            this.parentElement.dataset.showInfo = '0';
            this.textContent                    = 'Show more...';
            
        } else {
            this.parentElement.dataset.showInfo = '1';
            this.textContent                    = 'Show less';
        }
    }
}

for (let i = 0;  i < elm_header_nav_items.length;  i++) {
    elm_header_nav_items[i].onclick = function () {
        elm_header_nav_items[elm_header_nav_item_active].classList.remove('active');

        elm_header_nav_item_active = i;
        elm_header_nav_items[elm_header_nav_item_active].classList.add('active');
    }
}

for (let item of elm_card_img_holder) {
    item.style = '--img-scroll-size:-' + (item.offsetHeight - item.parentElement.offsetHeight) + 'px';
}

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.onscroll = function () {
    let scroll_pos          = document.documentElement.scrollTop || document.body.scrollTop,
        size_for_triggering = window.innerHeight * 0.5
    ;

    if (scroll_pos > size_for_triggering) {
        elm_header.classList.add('active');
    } else {
        elm_header.classList.remove('active');
    }

    for (let i = 0;  i < elm_sections.length;  i++) {
        if (elm_sections[i].offsetTop <= (scroll_pos + 100)) {
            elm_header_nav_items[elm_header_nav_item_active].classList.remove('active');
    
            elm_header_nav_item_active = i;
            elm_header_nav_items[elm_header_nav_item_active].classList.add('active');
        }
    }
};

mixitup(document.getElementById('projects-container'));
