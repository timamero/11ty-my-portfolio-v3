const nav = document.getElementById('nav')
const hamburger = document.getElementById('hamburger')
const bar1 = document.getElementById('bar1')
const bar2 = document.getElementById('bar2')
const navLinksWrapper = document.getElementById('nav-links-wrapper')
const heroSection = document.getElementById('hero')
const aboutSection = document.getElementById('about')
const featuredSection = document.getElementById('featured')
const serviceSection = document.getElementById('service')
const stackSection = document.getElementById('stack')
const contactSection = document.getElementById('contact')
const sections = document.querySelectorAll('section')
const heroLinkContainer = document.getElementById('hero-link-container')
const allProjectsSection = document.getElementById('all-projects')
const form = document.getElementById('form')

// Animate nav to disappear when scrolling after hero, and to reappear when hero appears
let options = {
    threshold: 0.5
}

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('section')) {
                nav.classList.add('animate-nav')
            } else if (entry.target.id === 'hero-link-container') {
                nav.classList.remove('animate-nav')
            }           
        }
    })
}, options)

sections.forEach(section => {
    if (!section.classList.contains('hero')) {
        observer.observe(section)
    }
})

if (heroSection) {
    observer.observe(heroLinkContainer)
}


// Hamburger menu animation
hamburger.addEventListener('click', () => {
    bar1.classList.toggle('close')
    bar2.classList.toggle('close')
    navLinksWrapper.classList.toggle('show-nav')
})

// Hide nav when link on same page is selected
const aboutNavLink = document.getElementById('about-nav-link')
const serviceNavLink = document.getElementById('service-nav-link')
const contactNavLink = document.getElementById('contact-nav-link')
const links = [aboutNavLink, serviceNavLink, contactNavLink]

links.forEach((link) => {
    // Function works only on home page
    if (heroSection) {
    link.addEventListener('click', () => {
        bar1.classList.toggle('close')
        bar2.classList.toggle('close')
        navLinksWrapper.classList.toggle('show-nav')
  });
}
})

// If in projects page, always show nav bar
if (allProjectsSection) {
    nav.classList.add('animate-nav')
}

  
// Send form data to getform
if (form) {
    
    form.action="https://getform.io/f/53a1ccd0-bc9f-42e6-b3ae-aefbba77d6bb"
}

// Clear submission form
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

if (form) {
    window.addEventListener('load', (event) => {
    nameField.value = ''
    emailField.value = ''
    messageField.value = ''
  });
  }