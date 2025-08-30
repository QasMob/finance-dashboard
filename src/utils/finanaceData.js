const finance = async () => {

// api key

// https://finnhub.io/api/v1/news?category=general&token=YOUR_API_KEY

const apiKey = 'd2pne9hr01qnf9nls15gd2pne9hr01qnf9nls160';
const unList = document.querySelector('#news-list');

try {
  
  const response = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${apiKey}`);

  const data = await response.json();

  unList.innerHTML = '';

  data.slice(0, 5).forEach(news => {
    const li = document.createElement('li');
    li.classList.add('liElement');

    li.innerHTML = `<div class='li__container'> <a href=${news.url} target='_blank'>${news.headline}</a> 
    <p>${news.source} • ${new Date(news.datetime * 1000).toLocaleDateString()}</p>
    <img src='${news.image}'alt=${news.summary}
    >
    </div>
    `

    unList.appendChild(li);

  });

  console.log(data);


}

catch(error){
  console.error(error);
}


};

export default finance;