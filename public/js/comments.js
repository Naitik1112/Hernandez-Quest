const btn = document.getElementById('addcomment');
const idd = document.querySelector('.center').getAttribute('ID');
const user_id = document.querySelector('.title').getAttribute('USERID');

new Vue({
  el: '#app',
  data: {
    title: 'Add a comment',
    newComment: '',
    comments: [],
    isPopupVisible: false,
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await fetch(`/api/news/${idd}/getallcomments`);
        if (!response.ok) {
          console.log(response);
          alert('error');
        }
        const data = await response.json();
        console.log(data.comments);
        this.comments = data.comments;
        for (let i = 0; i < this.comments.length; i++) {
          const x = this.comments[i].user.photo;
          this.comments[i].user.photo = `/images/users/${x}`;
        }
        // console.log(x);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async addComment() {
      if (this.newComment.trim()) {
        const newCommentObj = {
          userId: user_id,
          text: this.newComment,
        };
        try {
          const response = await fetch(`/api/news/${idd}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentObj),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } else {
            location.reload();
          }
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
    },
    showPopup() {
      document.getElementsByClassName('popup')[0].classList.add('active');
      document.querySelector('.rt-container').classList.add('blur');
      document.querySelector('.center').classList.add('blur');
      document.querySelector('.content').classList.add('blur');
      document.querySelector('.title').classList.add('blur');
      document.querySelector('#tranding').classList.add('blur');
      document.querySelector('#comment_title').classList.add('blur');
      document.querySelector('.tag').classList.add('blur');
      document.body.classList.add('no-scroll');
    },
  },
});

// document
//   .getElementById('dismiss-popup-btn')
//   .addEventListener('click', function () {
//     document.getElementsByClassName('popup')[0].classList.remove('active');
//     document.querySelector('.rt-container').classList.remove('blur');
//     document.querySelector('.center').classList.remove('blur');
//     document.querySelector('.content').classList.remove('blur');
//     document.querySelector('.title').classList.remove('blur');
//     document.querySelector('#tranding').classList.remove('blur');
//     document.querySelector('#comment_title').classList.remove('blur');
//     document.querySelector('.tag').classList.remove('blur');
//     document.body.classList.remove('no-scroll'); // Enable scrolling
//   });
