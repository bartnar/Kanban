let Home = {
  render: async () => {
    let view = /*html*/ `
  <section id="wall-of-boards" class="wall-of-boards">
    <div class="board-wrapper">
      <div class="board">
        <h3 class="board-title">Name of the board</h3>
        <a href="/views/board.html" class="desk"
          ><img src="/img/board.png" alt="board"
        /></a>
        <div class="btn-round-container">
          <button class="round btn"><i class="fas fa-trash"></i></button>
          <button class="round btn">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="round btn"><i class="fas fa-cog"></i></button>
        </div>
      </div>
    </div>
  </section>
  <section id="wall-of-boards" class="wall-of-boards">
    <div class="board-wrapper">
      <div class="board">
        <h3 class="board-title">Name of the board</h3>
        <a href="/views/board.html" class="desk"
          ><img src="/img/board.png" alt="board"
        /></a>
        <div class="btn-round-container">
          <button class="round btn"><i class="fas fa-trash"></i></button>
          <button class="round btn">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="round btn"><i class="fas fa-cog"></i></button>
        </div>
      </div>
    </div>
  </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Home;
