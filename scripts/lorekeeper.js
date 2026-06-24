const MODULE_ID = "lorekeeper";
const WINDOW_STATE_FLAG = "windowState";
const NAVIGATION_STATE_FLAG = "navigationState";
const NAVIGATION_TABS = ["codex", "journal"];

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

const NavigationState = {
  state: {
    activeTab: "codex",
    search: "",
    selectedEntryId: null
  },
  saveTimer: null,
  saveQueue: Promise.resolve(),

  async load() {
    const savedState = game.user.getFlag(MODULE_ID, NAVIGATION_STATE_FLAG);

    if (!savedState || typeof savedState !== "object") return;

    this.state = {
      activeTab: NAVIGATION_TABS.includes(savedState.activeTab)
        ? savedState.activeTab
        : "codex",
      search: typeof savedState.search === "string" ? savedState.search : "",
      selectedEntryId:
        typeof savedState.selectedEntryId === "string" && savedState.selectedEntryId
          ? savedState.selectedEntryId
          : null
    };
  },

  update(changes, { immediate = false } = {}) {
    if (NAVIGATION_TABS.includes(changes.activeTab)) {
      this.state.activeTab = changes.activeTab;
    }

    if (typeof changes.search === "string") {
      this.state.search = changes.search;
    }

    if (Object.hasOwn(changes, "selectedEntryId")) {
      this.state.selectedEntryId =
        typeof changes.selectedEntryId === "string" && changes.selectedEntryId
          ? changes.selectedEntryId
          : null;
    }

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
      .then(() => game.user.setFlag(MODULE_ID, NAVIGATION_STATE_FLAG, state))
      .catch((error) => {
        console.warn("Lorekeeper | Unable to save navigation state", error);
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
      this.setActiveTab(html, event.currentTarget.dataset.lorekeeperTab);
    });

    html.find("[data-lorekeeper-search]").on("input", (event) => {
      NavigationState.update({ search: event.currentTarget.value });
    });

    html.find("[data-lorekeeper-entry-id]").on("click", (event) => {
      this.setSelectedEntry(html, event.currentTarget.dataset.lorekeeperEntryId);
    });

    this.restoreNavigation(html);
  }

  setActiveTab(html, selectedTab, { persist = true } = {}) {
    const activeTab = NAVIGATION_TABS.includes(selectedTab) ? selectedTab : "codex";

    html.find("[data-lorekeeper-tab]").each((_index, tab) => {
      const isActive = tab.dataset.lorekeeperTab === activeTab;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    html.find("[data-lorekeeper-panel]").each((_index, panel) => {
      const isActive = panel.dataset.lorekeeperPanel === activeTab;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    if (persist) NavigationState.update({ activeTab }, { immediate: true });
  }

  setSelectedEntry(html, selectedEntryId, { persist = true } = {}) {
    let selectionExists = selectedEntryId === null;

    html.find("[data-lorekeeper-entry-id]").each((_index, entry) => {
      const isSelected = entry.dataset.lorekeeperEntryId === selectedEntryId;
      entry.classList.toggle("selected", isSelected);
      entry.setAttribute("aria-selected", String(isSelected));
      selectionExists ||= isSelected;
    });

    const coherentSelection = selectionExists ? selectedEntryId : null;
    if (persist || coherentSelection !== selectedEntryId) {
      NavigationState.update(
        { selectedEntryId: coherentSelection },
        { immediate: persist }
      );
    }
  }

  restoreNavigation(html) {
    this.setActiveTab(html, NavigationState.state.activeTab, { persist: false });
    html.find("[data-lorekeeper-search]").val(NavigationState.state.search);
    this.setSelectedEntry(html, NavigationState.state.selectedEntryId, {
      persist: false
    });
  }

  async close(options = {}) {
    await Promise.all([
      WindowState.update(
        {
          ...this.position,
          open: false
        },
        { immediate: true }
      ),
      NavigationState.save()
    ]);

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
    await Promise.all([WindowState.load(), NavigationState.load()]);
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
