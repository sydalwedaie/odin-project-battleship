import { generateDOM, html } from "../helpers/dom.js";

export function Attribution() {
  const data = {
    project:
      "https://www.theodinproject.com/lessons/node-path-javascript-battleship#project-solution",
    sourceCode: "https://github.com/sydalwedaie/odin-project-battleship",
    profile: "https://github.com/sydalwedaie",
  };

  const markup = html`
    <div class="attribution">
      <p>
        <span>Coded with ❤️ by</span>
        <a href=${data.profile}>Sayed Ali</a> |
        <a href=${data.sourceCode}>Source Code</a>
      </p>
      <p>
        <span>Project by</span>
        <a href=${data.project}>The Odin Project</a>
      </p>
    </div>
  `;

  const render = (root) => root.appendChild(generateDOM(markup));

  return { render };
}
