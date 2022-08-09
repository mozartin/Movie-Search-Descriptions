
$("#searchBtn").on('click', () => {
   $('.spinner-block').css('display', 'block')





   let t = $('#inputTytle').val()
   // let t = 'world'
   let type = $('#inputTitle').val()





   $.ajax({
      type: "GET",
      url: "https://www.omdbapi.com/?apikey=2b2b3898&",
      data: {
         s: t,
         type: type
      },
      success: function (data) {
         console.log(data.Error);
         if (data.Error != undefined) {
            $('#errOutput').css('display', 'block')
         }
         else {
            $('#errOutput').css('display', 'none')
         }


         $('.spinner-block').css('display', 'none')


         data = data.Search

         document.getElementById('moviesOutput').innerHTML = ''




         $('.my-pagination-container').remove()
         for (const iterator of data) {


            let oneBlock = document.createElement('div')
            document.getElementById('moviesOutput').appendChild(oneBlock)
            oneBlock.classList.add('movie-block')
            oneBlock.classList.add('col-md-12')
            oneBlock.classList.add('col-lg-6')
            let innerBlock = document.createElement('div')
            oneBlock.appendChild(innerBlock)
            innerBlock.classList.add('one-movie')
            oneBlock.classList.add('one-movie-block')



            let imgBlock = document.createElement('div')
            innerBlock.appendChild(imgBlock)
            let poster = document.createElement('img')
            poster.classList.add('poster')
            poster.setAttribute('src', iterator.Poster)
            imgBlock.appendChild(poster)

            let movieDesc = document.createElement('div')
            movieDesc.classList.add('movie-desc')
            innerBlock.appendChild(movieDesc)



            let type = document.createElement('p')
            type.innerText = iterator.Type
            movieDesc.appendChild(type)

            let title = document.createElement('h3')
            title.innerText = iterator.Title
            movieDesc.appendChild(title)

            let year = document.createElement('p')
            year.innerText = iterator.Year
            movieDesc.appendChild(year)

            let btnDetails = document.createElement('button')
            btnDetails.innerText = 'Details'
            btnDetails.classList.add('btn')
            btnDetails.classList.add('btn-danger')
            let btnDiv = document.createElement('div')
            innerBlock.appendChild(btnDiv)
            btnDiv.appendChild(btnDetails)
            btnDiv.classList.add('dynamic-spinner-btn')
            btnDetails.classList.add('btnDetails')

            btnDetails.setAttribute('id', iterator.imdbID)



            let spinner = document.createElement('div')

            btnDiv.appendChild(spinner)
            spinner.setAttribute('class', 'spinner-border my-spinner2')
            spinner.setAttribute('role', 'status')
            let span = document.createElement('span')
            spinner.appendChild(span)
            span.setAttribute('class', 'visually-hidden')
            span.innerText = 'Loading...'

            $('.my-spinner2').css('display', 'none')



         }



         let height = window.innerHeight;
         window.scroll({
            top: height,
            left: 0,
            behavior: 'smooth'
         });

         $('#moviesOutput').paginathing({
            perPage: 4,
            // firstLast: false,
            activeClass: 'my-active',
            ulClass: 'my-pagination',
            containerClass: 'my-pagination-container'
         })

         let btnDetails = document.getElementsByClassName('btnDetails')
         for (let i = 0; i < btnDetails.length; i++) {


            btnDetails[i].addEventListener('click', () => {

               $(`.one-movie:eq(${i}) .my-spinner2`).css('display', 'block')

               let id = $(btnDetails[i]).attr('id')
               $.ajax({
                  type: "GET",
                  url: "https://www.omdbapi.com/?apikey=2b2b3898&",
                  data: {
                     i: id
                  },
                  success: function (data) {

                     // console.log(data);
                     $('.my-spinner2').css('display', 'none')

                     if (!$('.movie-block').eq(i).hasClass("opened")) {
                        $('#fullInfo').remove()
                        for (let i = 0; i < $('.movie-block').length; i++) {
                           $(`.one-movie:eq(${i}) .poster`).animate(
                              {
                                 height: '200px',
                                 maxWidth: '200px'
                              }, 0);

                           $('.one-movie').eq(i).removeClass('one-movie-active')

                           $(`.one-movie:eq(${i}) .movie-desc`).fadeIn("slow")
                           $('.movie-block').eq(i).removeClass('opened')


                           if (!$('.movie-block').eq(i).hasClass("col-lg-6")) {
                              $('.movie-block').eq(i).addClass('col-lg-6')
                              btnDetails[i].innerText = 'Details'
                           }
                        }
                     }



                     if ($('.movie-block').eq(i).hasClass("col-lg-6")) {

                        $('.movie-block').eq(i).removeClass('col-lg-6')
                        $('.movie-block').eq(i).addClass('opened')
                        $('.one-movie').eq(i).addClass('one-movie-active')
                        btnDetails[i].innerText = 'Hide'

                        $(`.one-movie:eq(${i}) .movie-desc`).fadeOut("slow")
                        $(`.one-movie:eq(${i}) .poster`).animate(
                           {
                              height: '500px',
                              maxWidth: '400px'
                           }, 300);






                        $(`.one-movie:eq(${i}) div:first-child`).after("<div id='fullInfo'></div>")
                        let table = document.createElement('table')
                        $('#fullInfo').append("<table id='tableInfo'></table>")
                        createTableRow('Title:', data.Title)
                        createTableRow('Released:', data.Released)
                        createTableRow('Genre:', data.Genre)
                        createTableRow('Country:', data.Country)
                        createTableRow('Director:', data.Director)
                        createTableRow('Writer:', data.Writer)
                        createTableRow('Actors:', data.Actors)
                        createTableRow('Awards:', data.Awards)
                        createTableRow('Language:', data.Language)
                        createTableRow('Plot:', data.Plot)
                        createTableRow('Rated:', data.Rated)




                     }
                     else {
                        $('.movie-block').eq(i).addClass("col-lg-6")
                        btnDetails[i].innerText = 'Details'
                        $('.one-movie').eq(i).removeClass('one-movie-active')

                        $(function () {
                           $(`.one-movie:eq(${i}) .movie-desc`).fadeIn("slow")
                           $(`.one-movie:eq(${i}) #fullInfo`).fadeOut(100)
                           $(`.one-movie:eq(${i}) .poster`).animate(
                              {
                                 height: '200px',
                                 maxWidth: '200px'
                              }, 300);
                        })
                        $('#fullInfo').remove()
                     }



                     function createTableRow(value, property) {
                        $('#tableInfo').append(`<tr class='my-tr'><td class='my-td'><b>${value}</b></td><td class='my-td'>${property}</td></tr>`)
                     }







                     let el = document.getElementsByClassName('movie-block')
                     var elDistanceToTop = window.pageYOffset + el[i].getBoundingClientRect().top

                     window.scroll({
                        top: elDistanceToTop,
                        left: 0,
                        behavior: 'smooth'
                     });

                  }

               });
            });
         }

      }

   });

});