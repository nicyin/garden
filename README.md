## 🎈 garden

This was a [Partykit](https://partykit.io)-powered real-time collaborative garden, made together in a workshop. Partykit's hosted platform [shut down on Oct 23, 2026](https://blog.partykit.io/posts/hosted-platform-shutdown/), so this project is now a frozen static site: the garden's final state (from [`garden-history.json`](./garden-history.json), 85 saved actions) is baked directly into [`public/index.html`](./public/index.html), so the page loads instantly looking exactly like it did when the workshop ended.

[`src/client.js`](./src/client.js) still sets up the toolbar and drag-and-drop, so dropping a tool onto a plot works the same way it always did — it's just local to your browser now. Nothing is saved or shared with anyone else; reload the page and you're back to the frozen state.

[`scripts/bake-garden.mjs`](./scripts/bake-garden.mjs) is the one-off script that produced the baked HTML in `public/index.html` by replaying `garden-history.json` against the garden's original starting markup, using the same tool code (see the comment at the top of that file for how to re-run it, if the baked state ever needs to be regenerated).

[`src/server.js`](./src/server.js) is kept for reference — it's the old Partykit server code that used to handle WebSocket connections and persist the action history. It's no longer run.

To build the frozen client bundle, run `npm run build`, which uses [esbuild](https://esbuild.github.io/) to bundle `src/client.js` into `public/dist/client.js` and `public/dist/client.css`. Run `npm run dev` for a local dev server with live rebuilds, then open the URL it prints (serving the `public` directory).

### Hosting

This is deployed on **GitHub Pages** via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which runs `npm run build` and publishes the `public/` folder on every push to `main`. All asset paths in `public/index.html` and the history fetch in `src/client.js` are relative, so this works whether the site is served from a domain root or a project subpath (e.g. `username.github.io/garden/`).

One-time setup in the repo's GitHub settings: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
