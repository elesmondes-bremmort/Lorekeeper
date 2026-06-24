const MODULE_ID = "lorekeeper";
const WINDOW_STATE_FLAG = "windowState";

const WindowState = {
  state: {
    open: false
  },
  saveTimer: null,
  saveQueue: Promise.resolve(),

  async load() {
    const savedState = game.user.getFlag(MODULE_ID, WINDOW_STATE_FLAG);

    if (!savedState || typeof savedState !== "object") return;

    this.state = {
      ...this.state,
      ...this.sanitizePosition(savedState),
      open: savedState.open === true
    };
  },

  sanitizePosition(position) {
    return Object.fromEntries(
      ["left", "top", "width", "height"]
        .filter((key) => Number.isFinite(position[key]))
        .map((key) => [key, position[key]])
    );
  },

  getPosition() {
    return this.sanitizePosition(this.state);
  },

  update(changes, { immediate = false } = {}) {
    this.state = {
      ...this.state,
      ...this.sanitizePosition(changes),
      ...(typeof changes.open === "boolean" ? { open: changes.open } : {})
    };

    window.clearTimeout(this.saveTimer);

    if (immediate) return this.save();

    this.saveTimer = window.setTimeout(() => this.save(), 250);
    return Promise.resolve();
  },

  save() {
    window.clearTimeout(this.saveTimer);
    this.saveTimer = null;

    const state = { ...this.state };
    this.saveQueue = this.saveQueue
      .catch(() => undefined)
      .then(() => game.user.setFlag(MODULE_ID, WINDOW_STATE_FLAG, state))
      .catch((error) => {
        console.warn("Lorekeeper | Unable to save window state", error);
      });

    return this.saveQueue;
  }
};

class LorekeeperApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "lorekeeper-app",
      title: game.i18n.localize("LOREKEEPER.Title"),
      template: `modules/${MODULE_ID}/templates/lorekeeper-app.hbs`,
      width: 720,
      height: 480,
      resizable: true,
      popOut: true,
      classes: ["lorekeeper-app"]
    });
  }

  setPosition(position = {}) {
    const updatedPosition = super.setPosition(position);
    WindowState.update(updatedPosition);
    return updatedPosition;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("[data-lorekeeper-tab]").on("click", (event) => {
      const selectedTab = event.currentTarget.dataset.lorekeeperTab;

      html.find("[data-lorekeeper-tab]").each((_index, tab) => {
        const isActive = tab.dataset.lorekeeperTab === selectedTab;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      html.find("[data-lorekeeper-panel]").each((_index, panel) => {
        const isActive = panel.dataset.lorekeeperPanel === selectedTab;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  }

  async close(options = {}) {
    await WindowState.update(
      {
        ...this.position,
        open: false
      },
      { immediate: true }
    );

    const result = await super.close(options);
    Lorekeeper.app = null;
    return result;
  }
}

class LorekeeperLauncher {
  static create() {
    if (document.getElementById("lorekeeper-launcher")) return;

    const button = document.createElement("button");
    button.id = "lorekeeper-launcher";
    button.type = "button";
    button.title = game.i18n.localize("LOREKEEPER.Open");
    button.innerHTML = `<i class="fa-solid fa-book-open"></i>`;

    button.addEventListener("click", () => {
      Lorekeeper.open();
    });

    document.body.appendChild(button);
  }
}

const Lorekeeper = {
  app: null,

  async initialize() {
    await WindowState.load();
  },

  async open() {
    if (this.app?.rendered) {
      this.app.bringToTop();
      return this.app;
    }

    await WindowState.update({ open: true }, { immediate: true });

    this.app = new LorekeeperApp(WindowState.getPosition());
    this.app.render(true);
    return this.app;
  },

  async close() {
    if (!this.app) return;
    await this.app.close();
  }
};

Hooks.once("init", () => {
  console.log("Lorekeeper | Init");
});

Hooks.once("ready", async () => {
  console.log("Lorekeeper | Ready");
  await Lorekeeper.initialize();
  LorekeeperLauncher.create();
  globalThis.Lorekeeper = Lorekeeper;

  if (WindowState.state.open) await Lorekeeper.open();
});
