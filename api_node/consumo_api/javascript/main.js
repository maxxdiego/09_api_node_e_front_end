document.addEventListener("DOMContentLoaded", function () {
  // AXIOS CONFIG
  const axiosConfig = {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // LOGOUT
  function logout() {
    localStorage.removeItem("token");
    // alert("Deslogado com sucesso!");
    location.href = "index.html";
  }

  // LISTANDO OS JOGOS
  async function getGames() {
    // Mostrar a mensagem de carregamento
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "flex";

    try {
      const response = await axios.get(
        "https://09-api-node.vercel.app/games",
        axiosConfig
      );
      const games = response.data.games;
      const listGames = document.getElementById("games");

      games.forEach((game) => {
        let item = document.createElement("ul");

        // Setando os atributos ID, título, price e descrição para cada game
        item.setAttribute("data-id", game._id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-platform", game.platform);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);

        item.innerHTML = `<img src="images/game_cd_cover.png" alt="Jogo em estoque">
        <h3>${game.title}</h3>
          <li>Plataforma: ${game.platform}</li> 
          <li>Ano: ${game.year}</li> 
          <li>Preço: ${game.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}</li>`;

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.classList.add("btnDel");
        deleteBtn.addEventListener("click", () => {
          deleteGame(item);
        });

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Editar";
        editBtn.classList.add("btnEdit");
        editBtn.addEventListener("click", () => {
          var modal = document.querySelector(".editModal");
          modal.style.display = "block";
          var span = document.querySelector(".modalClose");
          span.onclick = () => {
            modal.style.display = "none";
          };
          window.onclick = (event) => {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          };
          loadForm(item);
        });

        item.appendChild(deleteBtn);
        item.appendChild(editBtn);
        listGames.appendChild(item);
      });
    } catch (error) {
      console.log(error);
    } finally {
      // Ocultar a mensagem de carregamento após carregar os dados
      loadingElement.style.display = "none";
    }
  }
  getGames();

  // EXCLUSÃO

  // Função para DELETAR games
  async function deleteGame(listItem) {
    try {
      const id = listItem.getAttribute("data-id");
      await axios.delete(
        `https://09-api-node.vercel.app/game/${id}`,
        axiosConfig
      );
      alert("Game deletado!");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  // Capturando o botão de cadastrar
  const createBtn = document.getElementById("createBtn");
  if (createBtn) {
    // Escuta ao evento click no botão
    createBtn.addEventListener("click", createGame);
  }

  // CADASTRO
  // Função para CADASTRAR games
  async function createGame() {
    try {
      const form = document.getElementById("createForm");
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário
      });

      const titleInput = document.getElementById("title");
      const platformInput = document.getElementById("platform");
      const yearInput = document.getElementById("year");
      const priceInput = document.getElementById("price");

      const game = {
        title: titleInput.value,
        platform: platformInput.value,
        year: yearInput.value,
        price: priceInput.value,
      };

      const response = await axios.post(
        "https://09-api-node.vercel.app/game",
        game,
        axiosConfig
      );
      if (response.status == 201) {
        alert("Game cadastrado!");
        location.href = "home.html";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ALTERAÇÃO

  // Função para carregar formulário de edição
  function loadForm(listItem) {
    const id = listItem.getAttribute("data-id");
    const title = listItem.getAttribute("data-title");
    const platform = listItem.getAttribute("data-platform");
    const year = listItem.getAttribute("data-year");
    const price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("platformEdit").value = platform;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
  }

  // Capturando o botão de alterar
  const updateBtn = document.getElementById("updateBtn");
  if (updateBtn) {
    // Escuta ao evento click no botão de alterar
    updateBtn.addEventListener("click", updateGame);
  }

  // Função para ALTERAR games
  async function updateGame() {
    try {
      const form = document.getElementById("editForm");
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário
      });

      const idInput = document.getElementById("idEdit");
      const titleInput = document.getElementById("titleEdit");
      const platformInput = document.getElementById("platformEdit");
      const yearInput = document.getElementById("yearEdit");
      const priceInput = document.getElementById("priceEdit");

      const game = {
        title: titleInput.value,
        platform: platformInput.value,
        year: yearInput.value,
        price: priceInput.value,
      };

      var id = idInput.value;

      const response = await axios.put(
        `https://09-api-node.vercel.app/game/${id}`,
        game,
        axiosConfig
      );
      if (response.status == 200) {
        alert("Game atualizado!");
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
});
