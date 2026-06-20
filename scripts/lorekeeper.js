const MODULE_ID = "lorekeeper";

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

  open() {
    if (this.app?.rendered) {
      this.app.bringToTop();
      return this.app;
    }

    this.app = new LorekeeperApp();
    this.app.render(true);
    return this.app;
  },

  close() {
    if (!this.app) return;
    this.app.close();
    this.app = null;
  }
};

Hooks.once("init", () => {
  console.log("Lorekeeper | Init");
});

Hooks.once("ready", () => {
  console.log("Lorekeeper | Ready");
  LorekeeperLauncher.create();
  globalThis.Lorekeeper = Lorekeeper;
});
