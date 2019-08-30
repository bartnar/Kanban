// Doesnt work properly + outdated

let Board = {
  render: async () => {
    let view = /*html*/ `
    <section class="task-distr-section">
          <ul class="tags">
            <li class="tag"><span class="quantity">5</span>To do</li>
            <li class="tag"><span class="quantity">5</span>In progress</li>
            <li class="tag"><span class="quantity">5</span>Done</li>
          </ul>
        </section>

        <div class="col-wrapper">
          <section class="todo">
            <div class="card">
              <div class="type-priority-wrapper">
                <i class="fas fa-check-square card-img"></i>
                <i class="fas fa-arrow-up card-img"></i>
              </div>
              <div class="card-title">
                <a href="#"><h3>SKP-19</h3></a>
              </div>
              <div class="card-content">
                <p>
                  As a user, I can find important items on the board by using
                  quick filters.
                </p>
              </div>
              <div class="card-photo">
                <img src="/img/timcook.png" alt="photo" />
              </div>
              <div class="card-filters">
                <p>Epic</p>
              </div>
            </div>
            <div class="card row2">
              <h2>Content</h2>
            </div>
            <div class="card row3">
              <h2>Content</h2>
            </div>
            <div class="card row4">
              <h2>Content</h2>
            </div>
            <div class="card row5">
              <h2>Content</h2>
            </div>
          </section>
          <section class="in-progress">
            <div class="card row1">
              <h2>Content</h2>
            </div>
            <div class="card row2">
              <h2>Content</h2>
            </div>
            <div class="card row3">
              <h2>Content</h2>
            </div>
            <div class="card row4">
              <h2>Content</h2>
            </div>
            <div class="card row5">
              <h2>Content</h2>
            </div>
          </section>
          <section class="done">
            <div class="card row1">
              <h2>Content</h2>
            </div>
            <div class="card row2">
              <h2>Content</h2>
            </div>
            <div class="card row3">
              <h2>Content</h2>
            </div>
            <div class="card row4">
              <h2>Content</h2>
            </div>
            <div class="card row5">
              <h2>Content</h2>
            </div>
          </section>
        </div>
          `;
    return view;
  },
  after_render: async () => {}
};

export default Board;
