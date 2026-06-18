const MODULE_ID = "lorekeeper";
const DATA_SETTING = "data";
const WINDOW_STATE_SETTING = "windowState";
const DETACHED_WINDOW_STATE_SETTING = "detachedWindowState";
const TEMPLATES = {
  app: `modules/${MODULE_ID}/templates/lorekeeper-app.hbs`,
  entry: `modules/${MODULE_ID}/templates/lorekeeper-entry.hbs`,
  journal: `modules/${MODULE_ID}/templates/lorekeeper-journal.hbs`
};
const ENTRY_TYPES = ["clue", "location", "character", "monster", "object"];
const DEFAULT_IMAGE = "icons/svg/book.svg";
const DEBOUNCE_MS = 1000;
const WINDOW_STATE_DEBOUNCE_MS = 300;
const DEFAULT_WINDOW_STATE = {
  isOpen: false,
  left: 120,
  top: 120,
  width: 900,
  height: 650
};
const DEFAULT_DETACHED_WINDOW_STATE = {
  enabled: false,
  left: 100,
  top: 100,
  width: 1000,
  height: 720
};
const DETACHED_MESSAGES = {
  ready: "LOREKEEPER_READY",
  dataRequest: "LOREKEEPER_DATA_REQUEST",
  dataResponse: "LOREKEEPER_DATA_RESPONSE",
  saveRequest: "LOREKEEPER_SAVE_REQUEST",
  navigateEntry: "LOREKEEPER_NAVIGATE_ENTRY",
  close: "LOREKEEPER_CLOSE_DETACHED"
};
const FALLBACK_I18N = {
  en: {
    "LOREKEEPER.Title": "Lorekeeper",
    "LOREKEEPER.Codex": "Codex",
    "LOREKEEPER.Journal": "Journal",
    "LOREKEEPER.CreateEntry": "Create entry",
    "LOREKEEPER.Edit": "Edit",
    "LOREKEEPER.Delete": "Delete",
    "LOREKEEPER.Search": "Search",
    "LOREKEEPER.SharedJournal": "Shared journal",
    "LOREKEEPER.PrivateJournal": "Private journal",
    "LOREKEEPER.AllTypes": "All types",
    "LOREKEEPER.NoEntries": "No entries",
    "LOREKEEPER.NoEntrySelected": "No entry selected",
    "LOREKEEPER.OpenDetached": "Open in detached window",
    "LOREKEEPER.DetachedMode": "Detached window mode",
    "LOREKEEPER.Close": "Close",
    "LOREKEEPER.PopupBlocked": "The browser blocked the Lorekeeper window. Allow popups for this site.",
    "LOREKEEPER.WelcomeTitle": "Welcome to Lorekeeper",
    "LOREKEEPER.WelcomeText": "Select a Codex entry from the left column, or create a new one to start collecting campaign knowledge.",
    "LOREKEEPER.EditPlayerTitle": "Edit player title",
    "LOREKEEPER.SharedNotes": "Shared comments",
    "LOREKEEPER.PrivateNotes": "Private comments",
    "LOREKEEPER.PlayerPrivateNotes": "Player private comments",
    "LOREKEEPER.NoPrivateNotes": "No private comments",
    "LOREKEEPER.Type": "Type",
    "LOREKEEPER.TitleGM": "GM title",
    "LOREKEEPER.TitlePlayer": "Player title",
    "LOREKEEPER.Image": "Image",
    "LOREKEEPER.DescriptionGM": "GM description",
    "LOREKEEPER.DescriptionPlayer": "Player description",
    "LOREKEEPER.Tags": "Tags",
    "LOREKEEPER.Permissions": "Permissions",
    "LOREKEEPER.DefaultPermission": "Default permission",
    "LOREKEEPER.PermissionNone": "None",
    "LOREKEEPER.PermissionRead": "Read",
    "LOREKEEPER.NewSession": "New session",
    "LOREKEEPER.Save": "Save",
    "LOREKEEPER.Cancel": "Cancel",
    "LOREKEEPER.DeleteConfirm": "Delete this entry?",
    "LOREKEEPER.NoJournal": "No journal entries",
    "LOREKEEPER.Untitled": "Untitled",
    "LOREKEEPER.SessionTitle": "Session {date}",
    "LOREKEEPER.Type.clue": "Clue",
    "LOREKEEPER.Type.location": "Location",
    "LOREKEEPER.Type.character": "Character",
    "LOREKEEPER.Type.monster": "Monster",
    "LOREKEEPER.Type.object": "Object"
  },
  fr: {
    "LOREKEEPER.Title": "Lorekeeper",
    "LOREKEEPER.Codex": "Codex",
    "LOREKEEPER.Journal": "Journal",
    "LOREKEEPER.CreateEntry": "Créer une entrée",
    "LOREKEEPER.Edit": "Modifier",
    "LOREKEEPER.Delete": "Supprimer",
    "LOREKEEPER.Search": "Rechercher",
    "LOREKEEPER.SharedJournal": "Journal commun",
    "LOREKEEPER.PrivateJournal": "Journal privé",
    "LOREKEEPER.AllTypes": "Tous les types",
    "LOREKEEPER.NoEntries": "Aucune entrée",
    "LOREKEEPER.NoEntrySelected": "Aucune entrée sélectionnée",
    "LOREKEEPER.OpenDetached": "Ouvrir dans une fenêtre séparée",
    "LOREKEEPER.DetachedMode": "Mode fenêtre séparée",
    "LOREKEEPER.Close": "Fermer",
    "LOREKEEPER.PopupBlocked": "Le navigateur a bloqué l’ouverture de la fenêtre Lorekeeper. Autorisez les popups pour ce site.",
    "LOREKEEPER.WelcomeTitle": "Bienvenue dans Lorekeeper",
    "LOREKEEPER.WelcomeText": "Sélectionnez une entrée du Codex dans la colonne de gauche, ou créez-en une pour commencer à rassembler le savoir de campagne.",
    "LOREKEEPER.EditPlayerTitle": "Modifier le titre joueur",
    "LOREKEEPER.SharedNotes": "Commentaires communs",
    "LOREKEEPER.PrivateNotes": "Commentaires privés",
    "LOREKEEPER.PlayerPrivateNotes": "Commentaires privés des joueurs",
    "LOREKEEPER.NoPrivateNotes": "Aucun commentaire privé",
    "LOREKEEPER.Type": "Type",
    "LOREKEEPER.TitleGM": "Titre MJ",
    "LOREKEEPER.TitlePlayer": "Titre joueur",
    "LOREKEEPER.Image": "Image",
    "LOREKEEPER.DescriptionGM": "Description MJ",
    "LOREKEEPER.DescriptionPlayer": "Description joueur",
    "LOREKEEPER.Tags": "Tags",
    "LOREKEEPER.Permissions": "Permissions",
    "LOREKEEPER.DefaultPermission": "Permission par défaut",
    "LOREKEEPER.PermissionNone": "Aucune",
    "LOREKEEPER.PermissionRead": "Lecture",
    "LOREKEEPER.NewSession": "Nouvelle session",
    "LOREKEEPER.Save": "Enregistrer",
    "LOREKEEPER.Cancel": "Annuler",
    "LOREKEEPER.DeleteConfirm": "Supprimer cette entrée ?",
    "LOREKEEPER.NoJournal": "Aucune entrée de journal",
    "LOREKEEPER.Untitled": "Sans titre",
    "LOREKEEPER.SessionTitle": "Session {date}",
    "LOREKEEPER.Type.clue": "Indice",
    "LOREKEEPER.Type.location": "Lieu",
    "LOREKEEPER.Type.character": "Personnage",
    "LOREKEEPER.Type.monster": "Monstre",
    "LOREKEEPER.Type.object": "Objet"
  }
};

function localize(key) {
  const fullKey = key.startsWith("LOREKEEPER.") ? key : `LOREKEEPER.${key}`;
  const translated = game.i18n?.localize(fullKey);
  if (translated && translated !== fullKey) return translated;
  const lang = game.i18n?.lang?.startsWith("fr") ? "fr" : "en";
  return FALLBACK_I18N[lang][fullKey] ?? FALLBACK_I18N.en[fullKey] ?? fullKey;
}

function formatLocalize(key, data = {}) {
  return localize(key).replace(/\{([^}]+)\}/g, (_match, property) => data[property] ?? "");
}

function duplicateData(value) {
  if (foundry.utils?.deepClone) return foundry.utils.deepClone(value);
  return foundry.utils.duplicate(value);
}

function mergeData(target, source) {
  return foundry.utils.mergeObject(target, source, { inplace: false });
}

function randomID() {
  if (foundry.utils?.randomID) return foundry.utils.randomID();
  return crypto.randomUUID();
}

function debounce(fn, delay = DEBOUNCE_MS) {
  let timeout;
  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => fn(...args), delay);
  };
}

function normalizeLorekeeperData(data = {}) {
  const journals = data.journals ?? {};
  const notes = data.notes ?? {};
  return {
    entries: data.entries ?? {},
    journals: {
      shared: journals.shared ?? {},
      private: journals.private ?? {}
    },
    folders: data.folders ?? {},
    playerFolders: data.playerFolders ?? {},
    notes: {
      shared: notes.shared ?? {},
      private: notes.private ?? {}
    }
  };
}

function isGM(user = game.user) {
  return Boolean(user?.isGM);
}

function canReadEntry(entry, user = game.user) {
  if (!entry || !user) return false;
  if (isGM(user)) return true;
  if (entry.permissions?.default === "read") return true;
  return entry.permissions?.users?.[user.id] === "read";
}

function entryDisplayTitle(entry, user = game.user) {
  if (!entry) return "";
  if (isGM(user)) return entry.titleGM || entry.titlePlayer || localize("Untitled");
  return entry.titlePlayer || localize("Untitled");
}

function entryDisplayDescription(entry, user = game.user) {
  if (!entry) return "";
  if (isGM(user)) return entry.descriptionGM || entry.descriptionPlayer || "";
  return entry.descriptionPlayer || "";
}

function safeImagePath(path) {
  return path || DEFAULT_IMAGE;
}

function htmlToElement(html) {
  if (html instanceof HTMLElement) return html;
  if (html?.[0] instanceof HTMLElement) return html[0];
  return html;
}

function getWindowState() {
  const state = game.settings.get(MODULE_ID, WINDOW_STATE_SETTING) ?? {};
  return {
    ...DEFAULT_WINDOW_STATE,
    ...state
  };
}

async function saveWindowState(position = {}) {
  const current = getWindowState();
  const next = {
    isOpen: typeof position.isOpen === "boolean" ? position.isOpen : current.isOpen,
    left: Number.isFinite(position.left) ? position.left : current.left,
    top: Number.isFinite(position.top) ? position.top : current.top,
    width: Number.isFinite(position.width) ? position.width : current.width,
    height: Number.isFinite(position.height) ? position.height : current.height
  };
  await game.settings.set(MODULE_ID, WINDOW_STATE_SETTING, next);
}

function openLorekeeperApp(options = {}) {
  game.lorekeeper ??= {};
  if (game.lorekeeper.app?.rendered) {
    game.lorekeeper.app.bringToTop();
    return game.lorekeeper.app;
  }

  game.lorekeeper.app = new LorekeeperApp(options);
  game.lorekeeper.app.render(true);
  saveWindowState({ ...game.lorekeeper.app.position, isOpen: true });
  return game.lorekeeper.app;
}

function getDetachedWindowState() {
  const state = game.settings.get(MODULE_ID, DETACHED_WINDOW_STATE_SETTING) ?? {};
  return {
    ...DEFAULT_DETACHED_WINDOW_STATE,
    ...state
  };
}

async function saveDetachedWindowState(state = {}) {
  const current = getDetachedWindowState();
  await game.settings.set(MODULE_ID, DETACHED_WINDOW_STATE_SETTING, {
    enabled: typeof state.enabled === "boolean" ? state.enabled : current.enabled,
    left: Number.isFinite(state.left) ? state.left : current.left,
    top: Number.isFinite(state.top) ? state.top : current.top,
    width: Number.isFinite(state.width) ? state.width : current.width,
    height: Number.isFinite(state.height) ? state.height : current.height
  });
}

class LorekeeperDataStore {
  static get() {
    return normalizeLorekeeperData(duplicateData(game.settings.get(MODULE_ID, DATA_SETTING)));
  }

  static async set(data) {
    const normalized = normalizeLorekeeperData(data);
    if (isGM()) return game.settings.set(MODULE_ID, DATA_SETTING, normalized);
    game.socket.emit(`module.${MODULE_ID}`, {
      action: "setData",
      userId: game.user.id,
      data: normalized
    });
    return normalized;
  }

  static async update(mutator) {
    const data = this.get();
    const result = mutator(data);
    return this.set(result ?? data);
  }

  static createEntry(type = "clue") {
    const now = Date.now();
    const id = randomID();
    return {
      id,
      type: ENTRY_TYPES.includes(type) ? type : "clue",
      titleGM: "",
      titlePlayer: "",
      image: "",
      descriptionGM: "",
      descriptionPlayer: "",
      tags: [],
      permissions: {
        default: "none",
        users: {}
      },
      createdAt: now,
      updatedAt: now
    };
  }

  static createJournalEntry() {
    const now = Date.now();
    return {
      id: randomID(),
      title: formatLocalize("SessionTitle", { date: new Date(now).toLocaleDateString() }),
      content: "",
      date: new Date(now).toISOString().slice(0, 10),
      createdAt: now,
      updatedAt: now,
      updatedBy: game.user.id
    };
  }
}

class LorekeeperApp extends Application {
  constructor(options = {}) {
    super(mergeData(getWindowState(), options));
    this.activeTab = options.activeTab ?? "codex";
    this.selectedEntryId = options.entryId ?? null;
    this.selectedSharedJournalId = null;
    this.selectedPrivateUserId = game.user.id;
    this.selectedPrivateJournalId = null;
    this.search = "";
    this.typeFilter = "all";
    this._saveSharedNoteDebounced = debounce((entryId, content) => this._saveSharedNote(entryId, content));
    this._savePrivateNoteDebounced = debounce((entryId, content) => this._savePrivateNote(entryId, content));
    this._saveJournalDebounced = debounce((scope, ownerId, journalId, formData) => this._saveJournal(scope, ownerId, journalId, formData));
    this._saveWindowStateDebounced = debounce((position) => saveWindowState(position), WINDOW_STATE_DEBOUNCE_MS);
  }

  static get defaultOptions() {
    return mergeData(super.defaultOptions, {
      id: "lorekeeper-app",
      title: localize("Title"),
      template: TEMPLATES.app,
      width: DEFAULT_WINDOW_STATE.width,
      height: DEFAULT_WINDOW_STATE.height,
      resizable: true,
      popOut: true,
      classes: ["lorekeeper-app"]
    });
  }

  setPosition(position = {}) {
    const resolved = super.setPosition(position);
    const next = {
      ...this.position,
      ...resolved,
      isOpen: true
    };
    if (this.rendered) this._saveWindowStateDebounced(next);
    return resolved;
  }

  async close(options = {}) {
    await saveWindowState({ ...this.position, isOpen: false });
    if (game.lorekeeper?.app === this) game.lorekeeper.app = null;
    return super.close(options);
  }

  async getData() {
    const data = LorekeeperDataStore.get();
    const users = game.users.contents.map((user) => ({
      id: user.id,
      name: user.name,
      isGM: user.isGM
    }));
    const entries = Object.values(data.entries)
      .filter((entry) => canReadEntry(entry, game.user))
      .map((entry) => this._prepareEntry(entry, data))
      .filter((entry) => this._matchesFilters(entry))
      .sort((a, b) => a.title.localeCompare(b.title));

    if (!this.selectedEntryId || !entries.some((entry) => entry.id === this.selectedEntryId)) {
      this.selectedEntryId = entries[0]?.id ?? null;
    }

    const selectedEntry = this.selectedEntryId ? this._prepareEntry(data.entries[this.selectedEntryId], data) : null;
    const sharedJournals = Object.values(data.journals.shared).sort((a, b) => b.updatedAt - a.updatedAt);
    if (!this.selectedSharedJournalId || !sharedJournals.some((entry) => entry.id === this.selectedSharedJournalId)) {
      this.selectedSharedJournalId = sharedJournals[0]?.id ?? null;
    }

    const privateOwners = isGM()
      ? users.filter((user) => !user.isGM)
      : users.filter((user) => user.id === game.user.id);
    if (!privateOwners.some((user) => user.id === this.selectedPrivateUserId)) {
      this.selectedPrivateUserId = privateOwners[0]?.id ?? game.user.id;
    }
    const privateJournals = Object.values(data.journals.private[this.selectedPrivateUserId] ?? {}).sort((a, b) => b.updatedAt - a.updatedAt);
    if (!this.selectedPrivateJournalId || !privateJournals.some((entry) => entry.id === this.selectedPrivateJournalId)) {
      this.selectedPrivateJournalId = privateJournals[0]?.id ?? null;
    }

    return {
      isGM: isGM(),
      activeTab: this.activeTab,
      isCodexTab: this.activeTab === "codex",
      isJournalTab: this.activeTab === "journal",
      entries,
      selectedEntry,
      entryTypes: ENTRY_TYPES.map((type) => ({
        value: type,
        label: localize(`Type.${type}`),
        active: this.typeFilter === type
      })),
      typeFilter: this.typeFilter,
      search: this.search,
      users,
      detachedAvailable: true,
      journal: {
        shared: sharedJournals,
        selectedShared: data.journals.shared[this.selectedSharedJournalId] ?? null,
        privateOwners: privateOwners.map((user) => ({
          ...user,
          selected: user.id === this.selectedPrivateUserId
        })),
        selectedPrivateUserId: this.selectedPrivateUserId,
        privateEntries: privateJournals,
        selectedPrivate: data.journals.private[this.selectedPrivateUserId]?.[this.selectedPrivateJournalId] ?? null
      }
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    const root = htmlToElement(html);
    root.querySelectorAll("[data-tab-target]").forEach((button) => {
      button.addEventListener("click", (event) => {
        this.activeTab = event.currentTarget.dataset.tabTarget;
        this.render();
      });
    });
    root.querySelector("[name='search']")?.addEventListener("input", debounce((event) => {
      this.search = event.target.value;
      this.render();
    }, 250));
    root.querySelector("[name='typeFilter']")?.addEventListener("change", (event) => {
      this.typeFilter = event.target.value;
      this.render();
    });
    root.querySelector("[data-action='create-entry']")?.addEventListener("click", () => this._createEntry());
    root.querySelector("[data-action='open-detached']")?.addEventListener("click", () => LorekeeperDetached.open());
    root.querySelectorAll("[data-entry-id]").forEach((element) => {
      element.addEventListener("click", (event) => {
        const link = event.target.closest(".lorekeeper-entry-link");
        if (link) return;
        this.selectedEntryId = element.dataset.entryId;
        this.activeTab = "codex";
        this.render();
      });
    });
    root.querySelector("[data-action='edit-entry']")?.addEventListener("click", () => this._openEntryEditor(this.selectedEntryId));
    root.querySelector("[data-action='delete-entry']")?.addEventListener("click", () => this._deleteEntry(this.selectedEntryId));
    root.querySelector("[data-action='edit-player-title']")?.addEventListener("click", () => this._editPlayerTitle(this.selectedEntryId));
    root.querySelectorAll("[data-note='shared']").forEach((textarea) => {
      textarea.addEventListener("input", (event) => this._saveSharedNoteDebounced(event.target.dataset.entryId, event.target.value));
    });
    root.querySelectorAll("[data-note='private']").forEach((textarea) => {
      textarea.addEventListener("input", (event) => this._savePrivateNoteDebounced(event.target.dataset.entryId, event.target.value));
    });
    root.querySelectorAll(".lorekeeper-rendered").forEach((element) => this._activateInternalLinks(element));
    root.querySelector("[data-action='create-shared-journal']")?.addEventListener("click", () => this._createJournal("shared"));
    root.querySelector("[data-action='create-private-journal']")?.addEventListener("click", () => this._createJournal("private", this.selectedPrivateUserId));
    root.querySelectorAll("[data-shared-journal-id]").forEach((element) => {
      element.addEventListener("click", () => {
        this.selectedSharedJournalId = element.dataset.sharedJournalId;
        this.render();
      });
    });
    root.querySelectorAll("[data-private-journal-id]").forEach((element) => {
      element.addEventListener("click", () => {
        this.selectedPrivateJournalId = element.dataset.privateJournalId;
        this.render();
      });
    });
    root.querySelector("[name='privateOwner']")?.addEventListener("change", (event) => {
      this.selectedPrivateUserId = event.target.value;
      this.selectedPrivateJournalId = null;
      this.render();
    });
    root.querySelectorAll("[data-journal-form]").forEach((form) => {
      form.addEventListener("input", () => {
        const formData = new FormData(form);
        this._saveJournalDebounced(form.dataset.journalScope, form.dataset.ownerId || null, form.dataset.journalId, {
          title: formData.get("title") ?? "",
          date: formData.get("date") ?? "",
          content: formData.get("content") ?? ""
        });
      });
    });
  }

  _prepareEntry(entry, data) {
    if (!entry) return null;
    const sharedNote = data.notes.shared[entry.id] ?? { content: "" };
    const privateNote = data.notes.private[entry.id]?.[game.user.id] ?? { content: "" };
    const privateNotesForGM = isGM()
      ? Object.entries(data.notes.private[entry.id] ?? {}).map(([userId, note]) => ({
        userId,
        userName: game.users.get(userId)?.name ?? userId,
        content: note.content ?? ""
      })).filter((note) => note.content)
      : [];
    const renderedDescription = this._renderInternalLinks(entryDisplayDescription(entry));
    const tags = Array.isArray(entry.tags) ? entry.tags : [];
    return {
      ...entry,
      title: entryDisplayTitle(entry),
      description: entryDisplayDescription(entry),
      renderedDescription,
      typeLabel: localize(`Type.${entry.type}`),
      imageDisplay: safeImagePath(entry.image),
      tagsDisplay: tags.join(", "),
      sharedNote,
      privateNote,
      privateNotesForGM,
      isVisible: canReadEntry(entry)
    };
  }

  _matchesFilters(entry) {
    if (this.typeFilter !== "all" && entry.type !== this.typeFilter) return false;
    if (!this.search) return true;
    const haystack = [entry.title, entry.description, entry.tagsDisplay, entry.typeLabel].join(" ").toLocaleLowerCase();
    return haystack.includes(this.search.toLocaleLowerCase());
  }

  _renderInternalLinks(content = "") {
    const escaped = Handlebars.escapeExpression(content);
    return escaped.replace(/\[\[entry:([^\]]+)\]\]/g, (_match, id) => {
      const entry = LorekeeperDataStore.get().entries[id];
      if (!entry || !canReadEntry(entry)) return `<span class="lorekeeper-missing-link">[[entry:${Handlebars.escapeExpression(id)}]]</span>`;
      return `<a class="lorekeeper-entry-link" data-entry-link="${Handlebars.escapeExpression(id)}">${Handlebars.escapeExpression(entryDisplayTitle(entry))}</a>`;
    }).replace(/\n/g, "<br>");
  }

  _activateInternalLinks(root) {
    root.querySelectorAll("[data-entry-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const entryId = event.currentTarget.dataset.entryLink;
        if (event.ctrlKey || event.metaKey) {
          new LorekeeperApp({ entryId, activeTab: "codex" }).render(true);
          return;
        }
        this.selectedEntryId = entryId;
        this.activeTab = "codex";
        this.render();
      });
      link.addEventListener("mouseenter", (event) => this._showPreview(event.currentTarget));
      link.addEventListener("mouseleave", () => this._hidePreview());
    });
  }

  _showPreview(link) {
    const entry = LorekeeperDataStore.get().entries[link.dataset.entryLink];
    if (!entry || !canReadEntry(entry)) return;
    this._hidePreview();
    const preview = document.createElement("div");
    preview.className = "lorekeeper-entry-preview";
    preview.innerHTML = `
      <img src="${safeImagePath(entry.image)}" alt="">
      <div>
        <strong>${Handlebars.escapeExpression(entryDisplayTitle(entry))}</strong>
        <span>${Handlebars.escapeExpression(localize(`Type.${entry.type}`))}</span>
      </div>
    `;
    document.body.appendChild(preview);
    const rect = link.getBoundingClientRect();
    preview.style.left = `${rect.left}px`;
    preview.style.top = `${rect.bottom + 8}px`;
    this._preview = preview;
  }

  _hidePreview() {
    this._preview?.remove();
    this._preview = null;
  }

  async _createEntry() {
    const entry = LorekeeperDataStore.createEntry(this.typeFilter === "all" ? "clue" : this.typeFilter);
    await LorekeeperDataStore.update((data) => {
      data.entries[entry.id] = entry;
    });
    this.selectedEntryId = entry.id;
    this.activeTab = "codex";
    this.render();
    this._openEntryEditor(entry.id);
  }

  async _deleteEntry(entryId) {
    if (!entryId || !isGM()) return;
    const confirmed = await Dialog.confirm({
      title: localize("Delete"),
      content: `<p>${localize("DeleteConfirm")}</p>`
    });
    if (!confirmed) return;
    await LorekeeperDataStore.update((data) => {
      delete data.entries[entryId];
      delete data.notes.shared[entryId];
      delete data.notes.private[entryId];
    });
    this.selectedEntryId = null;
    this.render();
  }

  _openEntryEditor(entryId) {
    if (!entryId || !isGM()) return;
    new LorekeeperEntryEditor({ entryId, parent: this }).render(true);
  }

  async _editPlayerTitle(entryId) {
    if (!entryId || !canReadEntry(LorekeeperDataStore.get().entries[entryId])) return;
    const entry = LorekeeperDataStore.get().entries[entryId];
    const content = `<form><div class="form-group"><label>${localize("TitlePlayer")}</label><input name="titlePlayer" type="text" value="${Handlebars.escapeExpression(entry.titlePlayer ?? "")}"></div></form>`;
    const titlePlayer = await new Promise((resolve) => {
      new Dialog({
        title: localize("Edit"),
        content,
        buttons: {
          save: {
            label: localize("Save"),
            callback: (html) => resolve(html.find("[name='titlePlayer']").val())
          },
          cancel: {
            label: localize("Cancel"),
            callback: () => resolve(null)
          }
        },
        default: "save",
        close: () => resolve(null)
      }).render(true);
    });
    if (titlePlayer === null) return;
    await LorekeeperDataStore.update((data) => {
      data.entries[entryId].titlePlayer = titlePlayer;
      data.entries[entryId].updatedAt = Date.now();
    });
    this.render();
  }

  async _saveSharedNote(entryId, content) {
    if (!entryId || !canReadEntry(LorekeeperDataStore.get().entries[entryId])) return;
    await LorekeeperDataStore.update((data) => {
      data.notes.shared[entryId] = { content, updatedAt: Date.now(), updatedBy: game.user.id };
    });
  }

  async _savePrivateNote(entryId, content) {
    if (!entryId || !canReadEntry(LorekeeperDataStore.get().entries[entryId])) return;
    await LorekeeperDataStore.update((data) => {
      data.notes.private[entryId] ??= {};
      data.notes.private[entryId][game.user.id] = { content, updatedAt: Date.now(), updatedBy: game.user.id };
    });
  }

  async _createJournal(scope, ownerId = null) {
    const entry = LorekeeperDataStore.createJournalEntry();
    await LorekeeperDataStore.update((data) => {
      if (scope === "shared") {
        data.journals.shared[entry.id] = entry;
        this.selectedSharedJournalId = entry.id;
      } else {
        const userId = ownerId ?? game.user.id;
        data.journals.private[userId] ??= {};
        data.journals.private[userId][entry.id] = entry;
        this.selectedPrivateUserId = userId;
        this.selectedPrivateJournalId = entry.id;
      }
    });
    this.activeTab = "journal";
    this.render();
  }

  async _saveJournal(scope, ownerId, journalId, formData) {
    if (!journalId) return;
    await LorekeeperDataStore.update((data) => {
      const collection = scope === "shared" ? data.journals.shared : data.journals.private[ownerId ?? game.user.id];
      if (!collection?.[journalId]) return;
      collection[journalId] = {
        ...collection[journalId],
        title: formData.title,
        date: formData.date,
        content: formData.content,
        updatedAt: Date.now(),
        updatedBy: game.user.id
      };
    });
  }
}

class LorekeeperDetached {
  static open({ restore = false } = {}) {
    game.lorekeeper ??= {};
    const state = getDetachedWindowState();
    if (game.lorekeeper.detachedWindow && !game.lorekeeper.detachedWindow.closed) {
      game.lorekeeper.detachedWindow.focus();
      this.sendData();
      return game.lorekeeper.detachedWindow;
    }

    const features = [
      `popup=yes`,
      `left=${Math.round(state.left)}`,
      `top=${Math.round(state.top)}`,
      `width=${Math.round(state.width)}`,
      `height=${Math.round(state.height)}`,
      "resizable=yes",
      "scrollbars=yes"
    ].join(",");
    const detached = window.open("", "LorekeeperDetached", features);
    if (!detached) {
      ui.notifications?.warn(localize("PopupBlocked"));
      if (restore) saveDetachedWindowState({ enabled: false });
      return null;
    }

    game.lorekeeper.detachedWindow = detached;
    detached.document.open();
    detached.document.write(this.buildHtml());
    detached.document.close();
    saveDetachedWindowState({ enabled: true, left: state.left, top: state.top, width: state.width, height: state.height });
    return detached;
  }

  static buildHtml() {
    const cssHref = new URL(`modules/${MODULE_ID}/styles/lorekeeper.css`, window.location.href).href;
    const labels = {
      title: localize("Title"),
      codex: localize("Codex"),
      journal: localize("Journal"),
      search: localize("Search"),
      allTypes: localize("AllTypes"),
      noEntries: localize("NoEntries"),
      noEntrySelected: localize("NoEntrySelected"),
      sharedNotes: localize("SharedNotes"),
      privateNotes: localize("PrivateNotes"),
      sharedJournal: localize("SharedJournal"),
      privateJournal: localize("PrivateJournal"),
      newSession: localize("NewSession"),
      save: localize("Save"),
      close: localize("Close"),
      detachedMode: localize("DetachedMode")
    };
    const messages = JSON.stringify(DETACHED_MESSAGES);
    const labelJson = JSON.stringify(labels);
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${Handlebars.escapeExpression(localize("Title"))}</title>
  <link rel="stylesheet" href="${cssHref}">
  <style>
    body { margin: 0; background: #202124; color: #f1eee7; font-family: sans-serif; }
    .lorekeeper-detached { height: 100vh; }
    .lorekeeper-detached-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px; background: #17181a; border-bottom: 1px solid rgba(255,255,255,.12); }
    .lorekeeper-detached-title h1 { margin: 0; font-size: 16px; }
    .lorekeeper-detached-title button { width: 32px; height: 32px; }
    .lorekeeper-detached .lorekeeper-shell { height: calc(100vh - 49px); }
    .lorekeeper-detached textarea { min-height: 120px; }
  </style>
</head>
<body>
  <div class="lorekeeper-detached">
    <header class="lorekeeper-detached-title">
      <h1>${Handlebars.escapeExpression(localize("DetachedMode"))}</h1>
      <button type="button" id="lk-close" title="${Handlebars.escapeExpression(localize("Close"))}">x</button>
    </header>
    <section class="lorekeeper-shell">
      <nav class="lorekeeper-tabs">
        <button type="button" class="active" data-tab="codex"></button>
        <button type="button" data-tab="journal"></button>
      </nav>
      <div id="lk-root"></div>
    </section>
  </div>
  <script>
    const MSG = ${messages};
    const L = ${labelJson};
    let state = { tab: "codex", search: "", type: "all", selectedEntryId: null, selectedSharedId: null, selectedPrivateId: null, data: null };
    let saveTimer = null;
    let searchTimer = null;
    const root = document.getElementById("lk-root");
    const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    const post = (type, payload = {}) => window.opener?.postMessage({ source: "lorekeeper-detached", type, payload }, "*");
    const requestData = () => post(MSG.dataRequest);
    const debounceSave = (payload) => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => post(MSG.saveRequest, payload), 700);
    };
    const renderLinks = (content = "") => esc(content).replace(/\\[\\[entry:([^\\]]+)\\]\\]/g, (_m, id) => {
      const entry = state.data?.entries?.find((item) => item.id === id);
      return entry ? '<a href="#" data-entry-link="' + esc(id) + '">' + esc(entry.title) + '</a>' : '<span class="lorekeeper-missing-link">[[entry:' + esc(id) + ']]</span>';
    }).replace(/\\n/g, "<br>");
    function setTab(tab) {
      state.tab = tab;
      document.querySelectorAll("[data-tab]").forEach((button) => {
        button.classList.toggle("active", button.dataset.tab === tab);
      });
      render();
    }
    function render() {
      if (!state.data) {
        root.innerHTML = '<div class="lorekeeper-empty-panel">' + esc(L.noEntrySelected) + '</div>';
        return;
      }
      if (state.tab === "journal") renderJournal();
      else renderCodex();
    }
    function filteredEntries() {
      const query = state.search.toLocaleLowerCase();
      return state.data.entries.filter((entry) => {
        if (state.type !== "all" && entry.type !== state.type) return false;
        if (!query) return true;
        return [entry.title, entry.description, entry.typeLabel, entry.tagsDisplay].join(" ").toLocaleLowerCase().includes(query);
      });
    }
    function renderCodex() {
      const entries = filteredEntries();
      if (!state.selectedEntryId || !entries.some((entry) => entry.id === state.selectedEntryId)) state.selectedEntryId = entries[0]?.id ?? null;
      const selected = state.data.entries.find((entry) => entry.id === state.selectedEntryId);
      const typeOptions = ['<option value="all">' + esc(L.allTypes) + '</option>'].concat(state.data.entryTypes.map((type) => '<option value="' + esc(type.value) + '"' + (state.type === type.value ? " selected" : "") + '>' + esc(type.label) + '</option>')).join("");
      root.innerHTML = '<div class="lorekeeper-workspace"><aside class="lorekeeper-sidebar"><div class="lorekeeper-toolbar"><input type="search" id="lk-search" value="' + esc(state.search) + '" placeholder="' + esc(L.search) + '"><select id="lk-type">' + typeOptions + '</select></div><ol class="lorekeeper-entry-list">' + (entries.map((entry) => '<li class="lorekeeper-entry-card" data-entry-id="' + esc(entry.id) + '"><img src="' + esc(entry.imageDisplay) + '" alt=""><div><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.typeLabel) + '</span></div></li>').join("") || '<li class="lorekeeper-empty">' + esc(L.noEntries) + '</li>') + '</ol></aside><main class="lorekeeper-content">' + (selected ? renderEntry(selected) : renderWelcome()) + '</main></div>';
      document.getElementById("lk-search")?.addEventListener("input", (event) => { state.search = event.target.value; window.clearTimeout(searchTimer); searchTimer = window.setTimeout(render, 250); });
      document.getElementById("lk-type")?.addEventListener("change", (event) => { state.type = event.target.value; render(); });
      root.querySelectorAll("[data-entry-id]").forEach((element) => element.addEventListener("click", () => { state.selectedEntryId = element.dataset.entryId; render(); }));
      root.querySelectorAll("[data-entry-link]").forEach((element) => element.addEventListener("click", (event) => { event.preventDefault(); state.selectedEntryId = element.dataset.entryLink; post(MSG.navigateEntry, { entryId: state.selectedEntryId }); render(); }));
      root.querySelectorAll("[data-note]").forEach((textarea) => {
        textarea.addEventListener("blur", (event) => debounceSave({ kind: event.target.dataset.note, entryId: event.target.dataset.entryId, content: event.target.value }));
      });
    }
    function renderWelcome() {
      return '<div class="lorekeeper-empty-panel"><h2>' + esc(L.title) + '</h2><p>' + esc(L.noEntrySelected) + '</p></div>';
    }
    function renderEntry(entry) {
      return '<article class="lorekeeper-detail"><header><div><span class="lorekeeper-type">' + esc(entry.typeLabel) + '</span><h2>' + esc(entry.title) + '</h2></div></header><img class="lorekeeper-hero-image" src="' + esc(entry.imageDisplay) + '" alt=""><div class="lorekeeper-rendered">' + renderLinks(entry.description) + '</div><p class="lorekeeper-tags">' + esc(entry.tagsDisplay) + '</p><section class="lorekeeper-notes"><label><span>' + esc(L.sharedNotes) + '</span><textarea data-note="sharedNote" data-entry-id="' + esc(entry.id) + '">' + esc(entry.sharedNote?.content) + '</textarea></label><label><span>' + esc(L.privateNotes) + '</span><textarea data-note="privateNote" data-entry-id="' + esc(entry.id) + '">' + esc(entry.privateNote?.content) + '</textarea></label></section></article>';
    }
    function renderJournal() {
      const shared = state.data.journal.shared;
      const privateEntries = state.data.journal.privateEntries;
      if (!state.selectedSharedId) state.selectedSharedId = shared[0]?.id ?? null;
      if (!state.selectedPrivateId) state.selectedPrivateId = privateEntries[0]?.id ?? null;
      const selectedShared = shared.find((entry) => entry.id === state.selectedSharedId);
      const selectedPrivate = privateEntries.find((entry) => entry.id === state.selectedPrivateId);
      root.innerHTML = '<div class="lorekeeper-journal">' + journalSection("shared", L.sharedJournal, shared, selectedShared) + journalSection("private", L.privateJournal, privateEntries, selectedPrivate) + '</div>';
      root.querySelectorAll("[data-journal-select]").forEach((element) => element.addEventListener("click", () => { if (element.dataset.scope === "shared") state.selectedSharedId = element.dataset.journalSelect; else state.selectedPrivateId = element.dataset.journalSelect; render(); }));
      root.querySelectorAll("[data-create-journal]").forEach((button) => button.addEventListener("click", () => post(MSG.saveRequest, { kind: "createJournal", scope: button.dataset.createJournal })));
      root.querySelectorAll("[data-journal-form]").forEach((form) => {
        form.addEventListener("change", () => saveJournal(form));
        form.addEventListener("blur", () => saveJournal(form), true);
      });
    }
    function journalSection(scope, title, entries, selected) {
      return '<section class="lorekeeper-journal-section"><header><h2>' + esc(title) + '</h2><button type="button" data-create-journal="' + scope + '">' + esc(L.newSession) + '</button></header><div class="lorekeeper-journal-grid"><ol>' + (entries.map((entry) => '<li data-scope="' + scope + '" data-journal-select="' + esc(entry.id) + '"><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.updatedByName || entry.updatedBy) + '</span></li>').join("") || '<li class="lorekeeper-empty">' + esc(L.noEntries) + '</li>') + '</ol>' + (selected ? '<form data-journal-form data-scope="' + scope + '" data-journal-id="' + esc(selected.id) + '"><input name="title" type="text" value="' + esc(selected.title) + '"><input name="date" type="date" value="' + esc(selected.date) + '"><textarea name="content">' + esc(selected.content) + '</textarea></form>' : "") + '</div></section>';
    }
    function saveJournal(form) {
      const data = new FormData(form);
      debounceSave({ kind: "journal", scope: form.dataset.scope, journalId: form.dataset.journalId, title: data.get("title"), date: data.get("date"), content: data.get("content") });
    }
    document.querySelector('[data-tab="codex"]').textContent = L.codex;
    document.querySelector('[data-tab="journal"]').textContent = L.journal;
    document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => setTab(button.dataset.tab)));
    document.getElementById("lk-close").addEventListener("click", () => { post(MSG.close, snapshot()); window.close(); });
    window.addEventListener("beforeunload", () => post(MSG.close, snapshot()));
    window.addEventListener("message", (event) => {
      if (event.data?.source !== "lorekeeper-main") return;
      if (event.data.type === MSG.dataResponse) {
        state.data = event.data.payload;
        render();
      }
    });
    function snapshot() {
      return { left: window.screenX, top: window.screenY, width: window.outerWidth, height: window.outerHeight };
    }
    post(MSG.ready, snapshot());
    requestData();
  </script>
</body>
</html>`;
  }

  static prepareData() {
    const data = LorekeeperDataStore.get();
    const app = game.lorekeeper?.app ?? new LorekeeperApp();
    const entries = Object.values(data.entries)
      .filter((entry) => canReadEntry(entry, game.user))
      .map((entry) => app._prepareEntry(entry, data))
      .sort((a, b) => a.title.localeCompare(b.title));
    const decorateJournal = (entry) => ({
      ...entry,
      updatedByName: game.users.get(entry.updatedBy)?.name ?? entry.updatedBy
    });
    return {
      entries,
      entryTypes: ENTRY_TYPES.map((type) => ({ value: type, label: localize(`Type.${type}`) })),
      journal: {
        shared: Object.values(data.journals.shared).map(decorateJournal).sort((a, b) => b.updatedAt - a.updatedAt),
        privateEntries: Object.values(data.journals.private[game.user.id] ?? {}).map(decorateJournal).sort((a, b) => b.updatedAt - a.updatedAt)
      }
    };
  }

  static sendData() {
    const detached = game.lorekeeper?.detachedWindow;
    if (!detached || detached.closed) return;
    detached.postMessage({
      source: "lorekeeper-main",
      type: DETACHED_MESSAGES.dataResponse,
      payload: this.prepareData()
    }, "*");
  }

  static async handleMessage(event) {
    const message = event.data;
    if (message?.source !== "lorekeeper-detached") return;
    game.lorekeeper ??= {};
    if (game.lorekeeper?.detachedWindow && event.source !== game.lorekeeper.detachedWindow) return;

    if (message.type === DETACHED_MESSAGES.ready || message.type === DETACHED_MESSAGES.dataRequest) {
      if (event.source) game.lorekeeper.detachedWindow = event.source;
      if (message.payload) await saveDetachedWindowState({ enabled: true, ...message.payload });
      this.sendData();
      return;
    }

    if (message.type === DETACHED_MESSAGES.navigateEntry) {
      const app = openLorekeeperApp({ entryId: message.payload?.entryId, activeTab: "codex" });
      app.selectedEntryId = message.payload?.entryId ?? app.selectedEntryId;
      app.activeTab = "codex";
      app.render();
      return;
    }

    if (message.type === DETACHED_MESSAGES.close) {
      await saveDetachedWindowState({ enabled: false, ...(message.payload ?? {}) });
      return;
    }

    if (message.type !== DETACHED_MESSAGES.saveRequest) return;
    await this.handleSave(message.payload ?? {});
    game.lorekeeper?.app?.render();
    this.sendData();
  }

  static async handleSave(payload) {
    if (payload.kind === "sharedNote") {
      if (!canReadEntry(LorekeeperDataStore.get().entries[payload.entryId], game.user)) return;
      await LorekeeperDataStore.update((data) => {
        data.notes.shared[payload.entryId] = { content: payload.content ?? "", updatedAt: Date.now(), updatedBy: game.user.id };
      });
      return;
    }
    if (payload.kind === "privateNote") {
      if (!canReadEntry(LorekeeperDataStore.get().entries[payload.entryId], game.user)) return;
      await LorekeeperDataStore.update((data) => {
        data.notes.private[payload.entryId] ??= {};
        data.notes.private[payload.entryId][game.user.id] = { content: payload.content ?? "", updatedAt: Date.now(), updatedBy: game.user.id };
      });
      return;
    }
    if (payload.kind === "createJournal") {
      const entry = LorekeeperDataStore.createJournalEntry();
      await LorekeeperDataStore.update((data) => {
        if (payload.scope === "shared") data.journals.shared[entry.id] = entry;
        else {
          data.journals.private[game.user.id] ??= {};
          data.journals.private[game.user.id][entry.id] = entry;
        }
      });
      return;
    }
    if (payload.kind === "journal") {
      await LorekeeperDataStore.update((data) => {
        const collection = payload.scope === "shared" ? data.journals.shared : data.journals.private[game.user.id];
        if (!collection?.[payload.journalId]) return;
        collection[payload.journalId] = {
          ...collection[payload.journalId],
          title: payload.title ?? "",
          date: payload.date ?? "",
          content: payload.content ?? "",
          updatedAt: Date.now(),
          updatedBy: game.user.id
        };
      });
    }
  }
}

class LorekeeperEntryEditor extends Application {
  constructor(options = {}) {
    super(options);
    this.entryId = options.entryId;
    this.parent = options.parent;
  }

  static get defaultOptions() {
    return mergeData(super.defaultOptions, {
      id: "lorekeeper-entry-editor",
      title: localize("Edit"),
      template: TEMPLATES.entry,
      width: 620,
      height: "auto",
      resizable: true,
      popOut: true,
      classes: ["lorekeeper-app", "lorekeeper-entry-editor"]
    });
  }

  getData() {
    const data = LorekeeperDataStore.get();
    const entry = data.entries[this.entryId];
    return {
      entry,
      defaultPermissionNone: entry.permissions?.default !== "read",
      defaultPermissionRead: entry.permissions?.default === "read",
      entryTypes: ENTRY_TYPES.map((type) => ({
        value: type,
        label: localize(`Type.${type}`),
        selected: entry.type === type
      })),
      users: game.users.contents.filter((user) => !user.isGM).map((user) => ({
        id: user.id,
        name: user.name,
        permission: entry.permissions?.users?.[user.id] ?? "none",
        permissionNone: entry.permissions?.users?.[user.id] !== "read",
        permissionRead: entry.permissions?.users?.[user.id] === "read"
      }))
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    const root = htmlToElement(html);
    root.querySelector("[data-action='pick-image']")?.addEventListener("click", () => {
      new FilePicker({
        type: "image",
        callback: (path) => {
          const input = root.querySelector("[name='image']");
          input.value = path;
        }
      }).browse();
    });
    root.querySelector("form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      this._save(new FormData(event.currentTarget));
    });
  }

  async _save(formData) {
    const tags = String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const userPermissions = {};
    for (const user of game.users.contents.filter((user) => !user.isGM)) {
      const permission = formData.get(`permission-${user.id}`) ?? "none";
      if (permission === "read") userPermissions[user.id] = "read";
    }
    await LorekeeperDataStore.update((data) => {
      data.entries[this.entryId] = {
        ...data.entries[this.entryId],
        type: formData.get("type"),
        titleGM: formData.get("titleGM") ?? "",
        titlePlayer: formData.get("titlePlayer") ?? "",
        image: formData.get("image") ?? "",
        descriptionGM: formData.get("descriptionGM") ?? "",
        descriptionPlayer: formData.get("descriptionPlayer") ?? "",
        tags,
        permissions: {
          default: formData.get("defaultPermission") ?? "none",
          users: userPermissions
        },
        updatedAt: Date.now()
      };
    });
    this.parent?.render();
    this.close();
  }
}

class LorekeeperLauncher {
  static create() {
    if (document.getElementById("lorekeeper-launcher")) return;

    const button = document.createElement("button");
    button.id = "lorekeeper-launcher";
    button.type = "button";
    button.title = localize("Title");
    button.innerHTML = `<i class="fa-solid fa-book-open"></i>`;
    button.addEventListener("click", () => openLorekeeperApp());
    document.body.appendChild(button);
  }
}

Hooks.once("init", async () => {
  game.settings.register(MODULE_ID, DATA_SETTING, {
    scope: "world",
    config: false,
    type: Object,
    default: {
      entries: {},
      journals: {},
      folders: {},
      playerFolders: {},
      notes: {}
    }
  });
  game.settings.register(MODULE_ID, WINDOW_STATE_SETTING, {
    scope: "client",
    config: false,
    type: Object,
    default: DEFAULT_WINDOW_STATE
  });
  game.settings.register(MODULE_ID, DETACHED_WINDOW_STATE_SETTING, {
    scope: "client",
    config: false,
    type: Object,
    default: DEFAULT_DETACHED_WINDOW_STATE
  });
  await loadTemplates(Object.values(TEMPLATES));
});

Hooks.once("ready", async () => {
  LorekeeperLauncher.create();
  window.addEventListener("message", (event) => LorekeeperDetached.handleMessage(event));
  game.socket.on(`module.${MODULE_ID}`, async (message) => {
    if (!isGM() || message?.action !== "setData") return;
    await game.settings.set(MODULE_ID, DATA_SETTING, normalizeLorekeeperData(message.data));
  });
  if (isGM()) {
    const data = LorekeeperDataStore.get();
    await LorekeeperDataStore.set(data);
  }
  if (getWindowState().isOpen) openLorekeeperApp();
  if (getDetachedWindowState().enabled) LorekeeperDetached.open({ restore: true });
});

Hooks.on("renderSettings", (_app, html) => {
  const root = htmlToElement(html);
  if (root.querySelector(".lorekeeper-open-button")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "lorekeeper-open-button";
  button.innerHTML = `<i class="fas fa-book-open"></i> ${localize("Title")}`;
  button.addEventListener("click", () => openLorekeeperApp());
  const target = root.querySelector("#settings-game") ?? root.querySelector(".settings-sidebar") ?? root;
  target.appendChild(button);
});

globalThis.Lorekeeper = {
  LorekeeperApp,
  LorekeeperDetached,
  LorekeeperLauncher,
  LorekeeperDataStore,
  openApp: openLorekeeperApp,
  canReadEntry,
  isGM
};
