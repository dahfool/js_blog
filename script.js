var Blog = (function() {

    "use strict"

    var form;

    function BlogEntry(title, comment) {
        this.name =  title,
        this.comment =  comment
        this.article = null;
        this.container = document.querySelector('.list-group')


        this.addEntry = function() {
            var element = document.createElement("li"),
                contentHolder = [],
                header = document.createElement('h3'),
                paragraph = document.createElement('p'),
                articleId = this.container.getElementsByTagName('li').length + 1;


                contentHolder.push(header,paragraph),

                // li class name
                element.className = 'list-group-item';
                element.dataset.articleId = articleId;

                this.article = element;


                // add input text to header and paragraph
                header.innerHTML = this.name;
                paragraph.innerHTML = this.comment;

                for(var i=0;i<contentHolder.length;i++) {
                    element.appendChild(contentHolder[i])
                }
                this.createSocialButton(element, articleId)
                this.container.appendChild(element);
        }

        this.createSocialButton = function(element, articleId) {
            var social = document.createElement('div'),
                button = [],
                trash = document.createElement('a'),
                like = document.createElement('a'),
                unlike = document.createElement('a'),
                indicator = document.createElement('span');


                indicator.className = 'badge pull-none';
                indicator.innerHTML = 0;

                button.push(trash,like,unlike);

                for(var i=0;i<button.length;i++) {

                    button[i].href ='#'
                    social.appendChild(button[i]);

                    var that = this;

                    if(i == 0) {
                        button[i].className = 'glyphicon glyphicon-trash';
                        button[i].addEventListener("click", function(event){
                            event.preventDefault();
                            that.deleteEntry(that.article);
                        });
                    }else if(i == 1) {
                        button[i].className = 'glyphicon glyphicon-thumbs-down'
                        button[i].appendChild(indicator);
                        button[i].addEventListener("click", function(event){
                            event.preventDefault();
                            that.unlikeEntry(this);
                        });
                    }else {
                        button[i].className = 'glyphicon glyphicon-thumbs-up'
                        button[i].appendChild(indicator.cloneNode(true));
                        button[i].addEventListener("click", function(event){
                            event.preventDefault();
                            that.likeEntry(this);
                        });
                    }
                }

                social.className = 'socialButtons';

                element.appendChild(social);
        }

        this.deleteEntry = function(article){
            this.container.removeChild(article);
        }

        this.likeEntry = function(button){
            var likeButton = button.querySelector('span');
            likeButton.innerHTML = parseInt(likeButton.innerHTML) + 1;
        }

        this.unlikeEntry = function(button){
            var likeButton = button.querySelector('span');
            likeButton.innerHTML = parseInt(likeButton.innerHTML) + 1;
        }

    }

    function addEventListeners() {
        form = document.querySelector('.addArticle');

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            if(!this.title.value || !this.comment.value) {
                generateError()
            } else {
                clearErrors()
                var blogEntry = new BlogEntry(this.title.value, this.comment.value);
                blogEntry.addEntry();
                form.reset();
            }
        });

    }

    function generateError() {
        clearErrors()
        var alert = document.createElement("div");
        alert.className = 'alert alert-danger';
        alert.innerHTML = 'Please fill all fields'
        form.appendChild(alert)
    }

    function clearErrors() {
        if (document.querySelector('.alert')) {
            document.querySelector('.alert').remove();
        }
    }


    return{
        init: function() {
            addEventListeners();
        }
    }

})();