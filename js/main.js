
const lenis = new Lenis()

lenis.on('scroll', (e) => {
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)


lenis.start()

//---------------------------------------------

Splitting();

//---------------------------------------------



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSRulePlugin);


// header영역

  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');

    const headerMiddle = header.offsetTop + (header.offsetHeight / 2);

    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition >= headerMiddle) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
  });


// main영역

  let backColor = document.querySelectorAll("[data-bgcolor]"); 
  
  backColor.forEach((colorSection, i) => {
    let prevBg = i === 0 ? "" : backColor[i - 1].dataset.bgcolor;

    ScrollTrigger.create({
        trigger: colorSection,
        start: 'center 5%',
        end: 'top 30%',
        // markers: 1,
        onEnter: () => gsap.to("body", {
            backgroundColor: colorSection.dataset.bgcolor
        }),
        onLeaveBack: () => gsap.to("body", {
            backgroundColor: prevBg
        })
    });
  });

 
// banner영역
let tl = gsap.timeline();

tl.from(".bottom-txt span:first-child", {
  opacity: 0,
  xPercent: -30,
  stagger: 1,
  duration: 5,
  ease: "expo.out",
})
tl.from(".bottom-txt span:last-child", {
  opacity: 0,
  xPercent: 30,
  stagger: 1,
  duration: 5,
  ease: "expo.out",
},"-=5")

tl.from(".header", {
  duration: 1, 
  yPercent: -50,
  opacity: 0,
  ease: "power2.out",
},"-=3");
tl.from(".top-txt p", {
  duration: 1, 
  yPercent: -50,
  opacity: 0,
  ease: "power2.out",
},"-=3");
tl.from(".top-img", {
  duration: 1, 
  yPercent: -30,
  opacity: 0,
  ease: "power2.out",
},"-=2.5");
tl.from(".b-title", {
  duration: 1, 
  xPercent: -30,
  opacity: 0,
  ease: "power2.out",
},"-=1.5");
tl.from(".banner .deco", {
  duration: 1, 
  yPercent: -30,
  opacity: 0,
  ease: "power2.out",
},"-=1.5");
gsap.to('.banner .deco', {
  rotation: 360,
  repeat: -1,
  duration: 8, 
  ease: 'linear'
});


function banner(){
  gsap.to(".top-img", {
    scrollTrigger: {
      trigger: ".banner",
      start: "top top",
      scrub: 1.5,
    },
    yPercent: 5
  })
}
banner();


//about 영역


// ScrollTrigger.create({
//   trigger: ".banner",
//   start: "top 10%",
//   end: "bottom top",
//   pin: true, 
//   pinSpacing: false, 
// //   markers: true 
// });



function about() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top 50%",
        // markers:true,
  
      }
    })
  
    tl.from(".main-img", {
      x: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    })
    tl.from(".main-wr>span", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    }, "-=0.5")
  
    tl.to('.personal-list h1 span', {
      duration: 0.8,
      y: "0%",
      stagger: 0.2
    }, "-=0.5")
  
  }
  
  about();
  
  
  
  //-skillbar
  
  let executed = false;
  
  
  function animateSkills() {
    document.querySelectorAll('.skill-per').forEach((perElement) => {
      gsap.to(perElement, {
        duration: 2,
        width: perElement.getAttribute('per') + "%",
        onUpdate: function () {
          perElement.setAttribute('per', Math.ceil(this.progress() * parseInt(perElement.style.width)) + "%");
        }
      })
    })
  }
  
  ScrollTrigger.create({
    trigger: ".about",
    start: "30% center",
    // markers:true,
    onEnter: () => {
      if (!executed) {
        animateSkills();
        executed = true
      }
  
  
    }
  })
  


//aboutme 영역
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

const imagesContainer = document.getElementById("image-container");
let Amimages = document.querySelectorAll(".images");

let cloneLastImage = Amimages[Amimages.length - 1].cloneNode(true);
imagesContainer.prepend(cloneLastImage);



const imageCount = Amimages.length;
let currentImage = 0;

let firstImageIndexValue = 0;
let currentFirstImage = Amimages[0];
let currentLastImage = Amimages[Amimages.length - 1];


function buttonPressedAnimation(buttonId) {
  let rule = CSSRulePlugin.getRule(buttonId);
  let tl = gsap.timeline();

  gsap.set(rule, {
    cssRule: {
      scale: 1,
      border: "solid 0.1rem #fff",
      opacity: 0,
    },
  });

  tl.to(rule, {
    duration: .2,
    cssRule: {
      scale: 1.5,
      opacity: 1,
    },
  });

  tl.to(rule, {
    duration: 0.2,
    cssRule: {
      scale: 3,
      opacity: 0,
    },
    ease: "power2.out",
  });

  tl.to(rule, {
    duration: 0.2,
    cssRule: {
      scale: 1,
    },
    ease: "power2.in",
  });
}

function staggerImageAnimation(fromValue, toValue, direction) {
  gsap.fromTo(
    ".images", {
      translate: fromValue,
    }, {
      translate: toValue,
      stagger: {
        from: direction,
        amount: 0.3,
      },
      ease: "power2.inOut",
    }
  );
}

function progressBarAnimation() {
  gsap.to("#progress-bar", {
    scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
    duration: 0.3 * ((imageCount - 1) / 2),
    ease: "power2.inOut",
  });
}

gsap.set("#progress-bar", {
  scaleX: `${1 / imageCount + currentImage / imageCount}`,
});


function moveImagesTotheLeft() {
  Amimages = document.querySelectorAll(".images");
  let cloneFirstImage = Amimages[1].cloneNode(true);
  imagesContainer.append(cloneFirstImage);

  let fromValue = `0`;
  let toValue = `calc(-100% - 0.5rem) `;

  staggerImageAnimation(fromValue, toValue, "start");
  Amimages[0].remove();
}

function moveImagesTotheRight() {
  Amimages = document.querySelectorAll(".images");
  let cloneLastImage = Amimages[Amimages.length - 2].cloneNode(true);

  imagesContainer.prepend(cloneLastImage);
  let fromValue = `calc(-200% - 1rem)`;
  let toValue = `calc(-100% - 0.5rem) `;
  staggerImageAnimation(fromValue, toValue, "end");
  Amimages[Amimages.length - 1].remove();
}


leftArrow.addEventListener("click", () => {
  moveImagesTotheRight();
  buttonPressedAnimation("#left-arrow:before");
  gsap.set("#progress-bar", {
    scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
  });
  currentImage = (currentImage - 1) % imageCount;

  if (currentImage < 0) {
    currentImage = 3;
  }

  progressBarAnimation();
});

rightArrow.addEventListener("click", () => {
  moveImagesTotheLeft();
  buttonPressedAnimation("#right-arrow:before");
  gsap.set("#progress-bar", {
    scaleX: `${1 / imageCount + (currentImage % imageCount) / imageCount}`,
  });

  currentImage = (currentImage + 1) % imageCount;

  progressBarAnimation();
});

setInterval(function () {
  document.querySelector('#right-arrow').click();
}, 2000)



// title 영역

let path1 = document.querySelector('#path');
let path1Length = path1.getTotalLength();//path의 길이

path1.style.strokeDasharray = path1Length;
path1.style.strokeDashoffset = path1Length;

let title=gsap.timeline({
    scrollTrigger:{
      trigger:".Portfolio-title",
      start:"top top",
      end:"bottom top",
      scrub:1,
      pin:true,
    }
})

title.from(".w-title .char", {
  delay: 1,
  opacity: 0,
  stagger: .05,
  y: "100%",
  ease: "power4.out"
},"-=5")


title.to(path1,{
    strokeDashoffset:0
},"-=2")
title.to(path1,{
    offsetDistance: "100%"
},"-=2")


// portfolio 영역

//link 열기

function openWindow(url, version, event) {
  var width = (version === 'tablet') ? 780 : 400;
  var height = 818;
  window.open(url, '웹표준모바일사이트', 'top=100, left=300, width=' + width + ', height=' + height);

  event.preventDefault();
}



const listWrElements = document.querySelectorAll('.list-wr');
const lastListWrElement = listWrElements[listWrElements.length - 1];

// listWrElements.forEach(function(element) {
//     if (element !== lastListWrElement) {
//         ScrollTrigger.create({
//             trigger: element,
//             start: "top top",
//             scrub:1,
//             pin: true, 
//             pinSpacing: false, 
//             // markers: true,
//             onUpdate: function(self) {
//                 element.style.opacity = 1 - (self.progress * 1);
//             }
//         });
//     }
// });

listWrElements.forEach(function(listWrElement, index) {
  const siteListElement = listWrElement.querySelector('.site-list');
  
  if (siteListElement) {
      if (index !== listWrElements.length - 1) {
          ScrollTrigger.create({
              trigger: listWrElement,
              start: "top top",
              scrub: 1,
              pin: true, 
              pinSpacing: false, 
              onUpdate: function(self) {
                  listWrElement.style.opacity = 1 - (self.progress * 1);
              }
          });
          
          gsap.to(siteListElement, {
              y: -180,
              scrollTrigger: {
                  trigger: listWrElement,
                  start: "top top",
                  scrub: 1
              }
          });
      }
  }
});



function ani() {
  gsap.from(".sushi .tablet-inner", {
      x: -40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
          trigger: ".sushi-wr",
          start: "-30% top",
          // markers:true,
      }
  });

  gsap.from(".sushi .phone-inner", {
      x: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
          trigger: ".sushi-wr",
          start: "-30% top",
          // markers:true,
      }
  });
}

ani();

function ani01() {
  gsap.from(".musign .tablet-inner", {
      x: -40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
          trigger: ".musign-wr",
          start: "-30% top",
          // markers:true,
      }
  });

  gsap.from(".musign .phone-inner", {
      x: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
          trigger: ".musign-wr",
          start: "-30% top",
          // markers:true,
      }
  });
}

ani01();


const hanacardWr = document.querySelector('.hanacard-wr');

ScrollTrigger.create({
    trigger: hanacardWr,
    start: 'top 10%', 
    onEnter: function() {
        gsap.from('.obj .ob4', {
            duration: 1, 
            opacity: 0, 
            x:100,
            y: -100, 
            ease: 'power2.out' 
        });
        gsap.from('.obj .ob5', {
            duration: 1, 
            opacity: 0, 
            y: -100, 
            ease: 'power2.out' 
        });
        gsap.from('.obj .ob6', {
            duration: 1, 
            opacity: 0, 
            x: 300, 
            ease: 'power2.out' 
        });
        gsap.from('.ob7, .ob8, .ob9, .ob10, .ob11', {
            duration: 1, 
            opacity: 0, 
            scale:0,
            ease: 'power2.out' 
        });
    }
});


  gsap.to('.react-wr .bg-wr i', {
    rotation: 360,
    repeat: -1,
    duration: 8, 
    ease: 'linear'
  });
  gsap.to('.standard-wr .s-logo img', {
    rotation: 360,
    repeat: -1,
    duration: 8, 
    ease: 'linear'
  });
  gsap.to(".parallaxeffect-wr .bg-wr", {
    duration: 2,
    clipPath: `polygon(100% 0, 0 0, 0 100%, 100% 100%)`,
    ease: "expo.out",
    scrollTrigger: {
        trigger: ".parallaxeffect-wr",
        start: "-10% top",
        // markers:true,
    }
});

// design영역

const design = gsap.timeline({
  scrollTrigger: {
    trigger: ".design",
    start: "-10% top",
    // markers: true,
  }
});

design.from(".design-h h1", {
  opacity: 0,
  yPercent: 100,
  stagger: 0.06,
  duration: 0.5,
  ease: "expo.out",
});

design.from(".card-holder", {
  opacity: 0,
  yPercent: 100,
  duration: 1,
  ease: "expo.out",
});


document.querySelectorAll(".card").forEach(function(card) {
  card.addEventListener("click", function() {
    let me = this;
    me.classList.toggle("large");

    document.querySelectorAll(".card").forEach(function(otherCard) {
      if (otherCard !== me) {
        otherCard.classList.remove("large");
      }
    });
  });
});


//modal popup
const modal_btn = document.querySelectorAll('.modal_btn');
const modal_popup_bg = document.querySelectorAll('.modal_popup_bg');
const modal_close = document.querySelectorAll('.modal_popup_bg .close_btn');

modal_btn.forEach(function(target, index) {
    target.addEventListener('click', function() {
        modal_popup_bg[index].style.display = 'block';
        document.body.style.overflow = 'hidden'; 
        modal_popup_bg[index].addEventListener('wheel', stopPropagation); 
    });
});

modal_close.forEach(function(target, index) {
    target.addEventListener('click', function() {
        modal_popup_bg[index].style.display = 'none';
        document.body.style.overflow = ''; 
        modal_popup_bg[index].removeEventListener('wheel', stopPropagation); 
    });
});

modal_popup_bg.forEach(function(target, index) {
    target.addEventListener('click', function(e) {
        if (this == e.target) {
            target.style.display = 'none';
            document.body.style.overflow = ''; 
            modal_popup_bg[index].removeEventListener('wheel', stopPropagation); 해제
        }
    });
});


// 스크롤 차단
function stopPropagation(event) {
    event.stopPropagation();
}





// contact
function contactAnimation() {
  let contact = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact",
      start: "-10% top",
      // markers:true,

    }
  })
  contact.fromTo(".contact-spin", 
    { scale: 0.5, opacity: 1 }, 
    { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out"} 
  );
  contact.from(".msg-wr span, .link-wr", {
    duration: 1,
    yPercent: 70,
    opacity: 0,
    ease: "power2.out",
  });
  contact.from(".ft_bottom", {
    duration: 1,
    yPercent: 70,
    opacity: 0,
    ease: "power2.out",
  });

}

contactAnimation();

function copyToClipboard(event, text) {
  event.preventDefault();

  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);

  input.select();
  document.execCommand('copy');

  document.body.removeChild(input);

  alert('클립보드에 복사되었습니다: ' + text);
}





