let citations = [
    ["La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", "Gandhi"],
    ["Le plus grand risque est de ne prendre aucun risque.", "Mark Zuckerberg"],
    ["Méritez votre statut de leader chaque jour.", "Mickael Jordan"],
    ["Soyez le changement que vous voulez voir dans le monde.", "Gandhi"],
    ["A chaque fois que vous vous retrouvez du même côté que la majorité, il est temps de prendre du recul, et de réfléchir.", "Mark Twain"],
    ["Seulement ceux qui prendront le risque d’aller trop loin découvriront jusqu’où on peut aller.", "T.S Elliot"],
    ["Le succès c’est tomber sept fois, se relever huit.", "Proverbe japonais"],
    // ["Dans vingt ans vous serez plus déçus par les choses que vous n’avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. Rêvez. Découvrez.", "Mark Twain"],
    ["Si vous attendez pour agir, tout ce que vous gagnerez, avec le temps, c’est de l’âge.", "Brian Tracy"],
    // ["Quand on concentre son attention sur un seul projet, l’esprit suggère constamment des idées et des améliorations qui lui échapperaient s’il était occupé avec plusieurs projets en même temps.", "P.T. Barnum"],
    ["Se dédier à faire tout ce que l’on peut pour aider les autres à obtenir ce qu’ils veulent, c’est la clé du succès.", "Brian Sher"],
    ["Si vous pensez que vous êtes trop petit pour avoir de l’impact, essayez d’aller au lit avec un moustique.", "Anita Roddick"],
    ["Ne jugez pas chaque jour sur ce que vous récoltez, mais sur les graines que vous semez.", "Robert Louis Stevenson"],
    ["L’action est la clé fondamentale de tout succès.", "Pablo Picasso"],
    ["Le succès, c’est se promener d’échecs en échecs tout en restant motivé.", "Winston Churchill"],
    ["Votre avenir est créé par ce que vous faîtes aujourd’hui, pas demain.", "Robert T. Kiyosaki"],
    ["Ne vous découragez pas, c’est souvent la dernière clef du trousseau qui ouvre la porte.", "Zig Ziglar"],
    ["Pour gagner votre vie, apprenez à l’école. Pour gagner une fortune, apprenez par vous-même.", "Brian Tracy"],
    ["Les gagnants trouvent des moyens, les perdants des excuses…", "F. D. Roosevelt"],
    ["Vous n’êtes jamais trop vieux pour vous fixer de nouveaux buts, ou rendre vos rêves réalité.", "C.S. Lewis"],
    ["Un pessimiste voit la difficulté dans chaque opportunité. Un optimiste voit une opportunité dans chaque difficulté.", "Winston Churchill"]
  ];

$(function() {

        var citation = $('#display-citations');
        var current = 0;
        var autor = $("#citation-autor");
        var btnleft = document.getElementById("btn-left");
        var btnRight = document.getElementById("btn-rigth");
        // var projet = document.querySelector(".timeline");
        // var projetMin = document.querySelector(".projetMin");
        var content = document.querySelector('#hambuger-content');
        var sidebarBody = document.querySelector("#hambuger-sidebar-body");
        var sidebar = document.querySelector("#hambuger-sidebar");
        var button = document.querySelector('.hamburger-button');
        var overlay = document.querySelector('#hambuger-overlay');
        var nav = document.querySelector('nav');
        var navbar = document.querySelector('navbar__link');
        // var activatedClass = 'hambuger-activated';
        console.log(nav);
        sidebarBody.innerHTML = content.innerHTML;
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // this.parentNode.classList.add(activatedClass);
            overlay.style.display = 'block';
            sidebar.style.transform = 'translateX(0)';
            nav.classList.toggle('show-nav');
            navbar.classList.toggle('show-nav');
        })

        button.addEventListener('keydown', function(e) {
            if(overlay.style.display === 'block') {
                if(e.repeat === false && e.which === 27) {
                    overlay.style.display = 'none';
                    sidebar.style.transform = 'translateX(-100%)';
                    nav.classList.toggle('show-nav');
                } 
                    
            }
        })

        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            // this.parentNode.classList.remove(activatedClass);
            overlay.style.display = 'none';
            sidebar.style.transform = 'translateX(-100%)';
            nav.classList.toggle('show-nav');
        })

        btnleft.style.color = "white";
        btnRight.style.color = "white";
        let div = document.createElement('div');      
        div.classList.add("white-divider");
        $(div).insertAfter(autor);

        $('body').scrollspy({target: ".navbar", offset: 50});

        var defileCitations = function() {
            current ++;
            if(current >= citations.length) {
                current = 0;
            }
            changeCitation();
        }

        let btnSub = $("#button");
        

        $(".navbar a, footer a").on("click", function(e) {
            e.preventDefault();
            var hash = this.hash;

            $('body,html').animate({scrollTop: $(hash).offset().top}, 1000, function() {
                window.location.hash = hash;
            });
        })

        
        $('#btn-rigth').on({
            
            click: function () { 
                clearInterval(timer);
                
                if(current === citations.length - 1) {
                    current = 0;
                    changeCitation();
                } else {
                    ++current
                    changeCitation();
                }
                setTimeout(() => {
                    timer = setInterval(defileCitations, 7000);
                }, 1000);
                console.log(current);
            },
            
        });
        //https://www.anglaisfacile.com/beginners/index.php
        $('#btn-left').on({
            click: function () { 
                clearInterval(timer);
                console.log("avant:  "+current)
                if(current == 0) {
                    console.log("dans le if:  "+current)
                    current = citations.length - 1;
                    changeCitation();
                    --current;
                } else {
                    console.log("dans le else:  "+current)
                    --current;
                    changeCitation();
                }
                console.log("après:  "+current)
                setTimeout(() => {
                    timer = setInterval(defileCitations, 7000);
                }, 1000);
            },
        });

        citation.append(citations[0][0]);
        autor.append(citations[0][1]);
        var timer = setInterval(defileCitations, 7000);

        function changeCitation() {
            $(citation).hide();
            $(autor).hide();
            $(citation).text(citations[current][0]).show(2000);
            $(autor).text(citations[current][1]).show(2000);
        }

        const indicator = document.querySelector(".nav-indicator");

        const items = document.querySelectorAll('.nav-itemm');

        // window.onresize = evt => {
        //     let taille = window.innerWidth;
        //     if(taille < 1200) {
        //         indicator.style.display = "none";
        //         items.forEach(item => {
        //             item.style.fontSize = "18px";
        //         })
        //     } else {
        //         indicator.style.display = "flex";
        //         items.forEach(item => {
        //             item.style.fontSize = "24px";
        //         })
        //     }
        //     if(taille < 770) {
        //         projet.style.display = "none";
        //         projetMin.style.display = "block";
        //     } else {
        //         projet.style.display = "block";
        //         projetMin.style.display = "none";
        //     }
        // }

        function handleIndicator(el) {
            //boucler sur tous les items -> retirer la classe "is-active"
            items.forEach(item => {
                item.classList.remove('is-active');
                item.removeAttribute('style');
            })

            const elementColor = el.dataset.activeColor;

            //styliser l'indicateur
            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.backgroundColor = elementColor;
            indicator.style.left = `${el.offsetLeft}px`;

            //ajout de la classe is-active
            el.classList.add('is-active');
            el.style.color = elementColor;
            el.style.fontWeight = 'bold';

        }

        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                handleIndicator(e.target)
            });
            item.classList.contains('is-active') && handleIndicator(item)
        });

        var thank = document.querySelector(".thank-you");
        console.log(thank);
        $('#contact-form').submit(function (e) { 
            e.preventDefault();
            $('.comment').empty();
            var postdata = $('#contact-form').serialize();

            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: postdata,
                dataType: "json",
                success: function (response) {
                    if(response.isSucces) {
                        $("#contact-form")[0].reset();
                        thank.style.display = "block";
                        
                    } else {
                        $("#firstname + .comment").html(response.firstnameError);
                        $("#name + .comment").html(response.nameError);
                        $("#email + .comment").html(response.emailError);
                        $("#phone + .comment").html(response.phoneError);
                        $("#message + .comment").html(response.messageError);
                    }
                }
            });
        });

}); 

