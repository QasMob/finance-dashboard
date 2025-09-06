const finance = async () => {
  const unList = document.querySelector('#news-list');
  const nextBtn = document.querySelector('.news-next');
  const prevBtn = document.querySelector('.news-prev');
  let currentPage = 0;
  const articlesPerPage = 5;

  try {
    const response = await fetch('/.netlify/functions/getNews'); 
    const data = await response.json();

    // Initial render
    renderRow(data);

    // Event listeners for pagination
    nextBtn.addEventListener('click', () => {
      if ((currentPage + 1) * articlesPerPage < data.length) {
        currentPage++;
        renderRow(data);
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderRow(data);
      }
    });

    function renderRow(data) {
      unList.innerHTML = '';

      const start = currentPage * articlesPerPage;
      const end = start + articlesPerPage;
      const dataSliced = data.slice(start, end);

      dataSliced.forEach(news => {
        const li = document.createElement('li');
        li.classList.add('liElement');

        li.innerHTML = `
          <div class='li__container'>
            <a href=${news.url} target='_blank'>${news.headline}</a>
            <p>${news.source} • ${new Date(news.datetime * 1000).toLocaleDateString()}</p>
            <img src='${news.image}' alt="${news.summary}">
          </div>
        `;
        unList.appendChild(li);
      });

      // Disable/enable buttons
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = (currentPage + 1) * articlesPerPage >= data.length;
    }
  } catch (error) {
    console.error(error);
  }
};

export default finance;
