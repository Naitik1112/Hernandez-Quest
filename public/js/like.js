// public/js/like.js
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const newsId = button.getAttribute('data-news-id');
      const liked = button.getAttribute('data-liked') === 'true';
      const response = await fetch(`/api/news/${newsId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const news = await response.json();
        button.setAttribute('data-liked', !liked);
        button.src = news.message.includes('removed')
          ? '/Icons/heart.png'
          : '/Icons/heart-filled.png';
        const likesCountElement = button.nextElementSibling;
        likesCountElement.textContent = `${news.likesCount}`;

        const frontLikesElement = button
          .closest('.card.middle')
          .querySelector('.front-likes span');
        frontLikesElement.textContent = news.likesCount;
      } else {
        console.error('Failed to update likes');
        console.log(response);
      }
    });
  });
});
