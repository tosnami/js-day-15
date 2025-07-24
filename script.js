document.getElementById("searchBtn").addEventListener("click", searchRecipes);
document.getElementById("darkToggle").addEventListener("click", toggleDarkMode);
document.getElementById("hamburger").addEventListener("click", toggleMenu);

async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("results");
  const loader = document.getElementById("loader");

  resultsContainer.innerHTML = '';
  loader.style.display = 'block';

  if (!query) {
    loader.style.display = 'none';
    resultsContainer.innerHTML = '<p>❗ من فضلك اكتب نوع أكلة.</p>';
    return;
  }

  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
    const data = await res.json();
    loader.style.display = 'none';

    if (data.recipes && data.recipes.length > 0) {
      data.recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${recipe.image_url}" alt="${recipe.title}" />
          <div class="card-content">
            <h3>${recipe.title}</h3>
            <a href="${recipe.source_url}" target="_blank">شوف الوصفة 🔗</a>
          </div>
        `;

        resultsContainer.appendChild(card);
      });
    } else {
      resultsContainer.innerHTML = '<p>😔 مفيش نتائج للكلمة دي.</p>';
    }
  } catch (error) {
    console.error(error);
    loader.style.display = 'none';
    resultsContainer.innerHTML = '<p>🚫 حصلت مشكلة، حاول تاني.</p>';
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}