const finance = async () => {
  const apiKey = process.env.FINNHUB_API_KEY;
  const unList = document.querySelector('#news-list');
  const nextBtn = document.querySelector('.news-next');
  const prevBtn = document.querySelector('.news-prev');
  let currentPage = 0;
  const articlesPerPage = 5;

  try {
    const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`);
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

      // Calculate start and end dynamically based on currentPage
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

      if(currentPage === 0){
        prevBtn.classList.add('disableBtn')
        prevBtn.disabled = true;
      }
      if (currentPage > 0){
        prevBtn.classList.remove('disableBtn');
        prevBtn.disabled = false;
      }
      if((currentPage + 1) + articlesPerPage >= data.length){
         nextBtn.classList.add('disableBtn');
         nextBtn.disabled = true;
      }
      if((currentPage + 1) + articlesPerPage < data.length) {
        nextBtn.classList.remove('disableBtn');
        nextBtn.disabled = false;
      }
      
    }
  } catch (error) {
    console.error(error);
  }
};

export default finance;

