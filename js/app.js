/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

let sections = document.querySelectorAll('section');
let navItems = document.querySelectorAll('.menu__link');
const header = document.querySelector('header');
const topBtn = document.getElementById('topBtn');

// used to identify new section id and title
let sectionsCounter = 0;

// used to prevent adding setTimeout method many times on scrolling
let methodAdded = false;

// Add section link to Nav
const addNavItem = (parent, secId, text) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.id = secId + 'mi';
    a.dataset.secId = secId;
    a.textContent = text;
    a.classList.add('menu__link');
    li.append(a);
    parent.append(li);
}

// build the nav
const buildNav = () => {
    // Create virtual document
    const nav = document.createDocumentFragment();

    // Add 'Add Section' Button
    const li = document.createElement('li');
    li.classList.add('addBtn');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.id = 'addSectionBtn';
    a.textContent = 'Add Section';
    a.classList.add('menu__link');
    li.append(a);
    nav.append(li);

    // Add sections to Nav
    sections.forEach(section => {
        addNavItem(nav,section.id,section.dataset.nav);
        sectionsCounter++;
    });

    // Add nav to actual document
    const navbar = document.getElementById('navbar__list');
    navbar.append(nav);

    // listen to links click event (one event listener to make better performance)
    navbar.addEventListener('click', navClickEvent);
}

// Check if section top near to view port top OR if Section appeare in more than 50% of view port
function isSectionActive(section){
    const bounds = section.getBoundingClientRect();
    let top = 0;
    if(bounds.top > top){
        top = bounds.top;
    }
    let bottom = window.innerHeight;
    if(bounds.bottom < bottom){
        bottom = bounds.bottom;
    }
    const viewPercent = (bottom - top) * 100 / window.innerHeight;
    return (bounds.top < 100 && bounds.top > -100) || viewPercent >= 50;
}

// Add/Remove class 'active' to section
document.addEventListener('scroll', () => {
    sections.forEach(section => {
        if(isSectionActive(section)){
            section.classList.add('active');
            document.getElementById(section.id + 'mi').classList.add('active');
        }
        else{
            section.classList.remove('active');
            document.getElementById(section.id + 'mi').classList.remove('active');
        }
    });

    header.style.display = "block";
    if(!methodAdded){
        setTimeout(() => {
            header.style.display = "none";
            methodAdded = false;
        }, 2000);
        methodAdded = true;
    }

    // view To Top Button if scrolled more than 500
    topBtn.style.display =  window.scrollY > 500 ? "block" : "none";
});

// Scroll to anchor ID using scrollTO event
const scrollToId = (id) => {
    const ele = document.getElementById(id);
    ele.scrollIntoView({behavior: 'smooth'});
}

const navClickEvent = (event) => {
    if(event.target.nodeName === 'A'){
        event.preventDefault();
        if(event.target.id === 'addSectionBtn'){
            // Add new section (Add Section button cliked)
            sectionsCounter++;
            const newSectionHtml = `<section id="section${sectionsCounter}" data-nav="Section ${sectionsCounter}">
            <div class="landing__container">
                <h2>Section ${sectionsCounter}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>
            </section>`

            const main = document.getElementsByTagName('main')[0];
            main.insertAdjacentHTML('beforeend',newSectionHtml);
            // Refresh sections array
            sections = document.querySelectorAll('section');

            // Add new section link to Nav
            addNavItem(document.getElementById('navbar__list'), 'section' + sectionsCounter,'section ' + sectionsCounter);
            // Refresh Nav items array
            navItems = document.querySelectorAll('menu__link');
            
            return;
        }

        // scroll to section
        scrollToId(event.target.dataset.secId);
    }
};

// Build menu 
buildNav();


topBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({behavior: 'smooth',top: 0});
});
