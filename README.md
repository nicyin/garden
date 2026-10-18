## 🎈 garden

This was a [Partykit](https://partykit.io)-powered real-time collaborative garden, made together in a workshop. Partykit's hosted platform [shut down on Oct 23, 2026](https://blog.partykit.io/posts/hosted-platform-shutdown/), so this project is now a frozen static site: it replays the garden's saved history on page load instead of syncing live over a websocket.

[`src/client.js`](./src/client.js) is the client-side code. On load, it fetches [`public/garden-history.json`](./public/garden-history.json) and replays every past action in order to rebuild the garden's final state. The toolbar and drag-and-drop still work locally, but changes you make aren't saved or shared with anyone else.

[`src/server.js`](./src/server.js) is kept for reference — it's the old Partykit server code that used to handle WebSocket connections and persist the action history. It's no longer run.

To build the frozen client bundle, run `npm run build`, which uses [esbuild](https://esbuild.github.io/) to bundle `src/client.js` into `public/dist/client.js` and `public/dist/client.css`. Run `npm run dev` for a local dev server with live rebuilds, then open the URL it prints (serving the `public` directory).

### Hosting

This is deployed on **GitHub Pages** via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which runs `npm run build` and publishes the `public/` folder on every push to `main`. All asset paths in `public/index.html` and the history fetch in `src/client.js` are relative, so this works whether the site is served from a domain root or a project subpath (e.g. `username.github.io/garden/`).

One-time setup in the repo's GitHub settings: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
