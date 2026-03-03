import { METRICS } from "./constants";
import { drawRadar, renderRadarLegend, type LangData } from "./radar";
import {
  renderBars,
  renderSpecs,
  renderWhen,
  renderCode,
  renderCodeRunner,
} from "./render";

type ExamplesData = Record<string, Array<{ code: string; title?: string; description?: string }>>;

export function initPlayground(langs: LangData[], examples: ExamplesData): void {
  let slotA: LangData | null = null;
  let slotB: LangData | null = null;

  const langList = document.getElementById("lang-list") as HTMLElement;
  const sidebarSearch = document.getElementById("sidebar-search") as HTMLInputElement;
  const compPanel = document.getElementById("comparison-panel") as HTMLElement;
  const emptyState = document.getElementById("empty-state") as HTMLElement;
  const codeRunnerSection = document.getElementById("code-runner-section") as HTMLElement;

  if (!langList || !compPanel || !emptyState) return;

  function persistSlots(): void {
    try {
      const arr = [slotA, slotB].filter(Boolean).map((l) => ({ id: l!.id }));
      sessionStorage.setItem("langCompare", JSON.stringify(arr));
    } catch {
      // ignore
    }
  }

  function assignSlot(slot: "a" | "b", lang: LangData): void {
    if (slot === "a") slotA = lang;
    else slotB = lang;
    renderSlotUI(slot, lang);
    syncHighlightChips();
    persistSlots();
    maybeRenderComparison();
  }

  function clearSlot(slot: "a" | "b"): void {
    if (slot === "a") slotA = null;
    else slotB = null;
    resetSlotUI(slot);
    syncHighlightChips();
    persistSlots();
    maybeRenderComparison();
  }

  function renderSlotUI(slot: "a" | "b", lang: LangData): void {
    const zone = document.getElementById(`drop-${slot}`) as HTMLElement;
    const placeholder = document.getElementById(`placeholder-${slot}`) as HTMLElement;
    const filled = document.getElementById(`filled-${slot}`) as HTMLElement;
    const iconEl = document.getElementById(`slot-${slot}-icon`) as HTMLElement;
    const nameEl = document.getElementById(`slot-${slot}-name`) as HTMLElement;
    if (!zone || !placeholder || !filled || !iconEl || !nameEl) return;
    placeholder.classList.add("hidden");
    filled.classList.remove("hidden");
    filled.classList.add("flex");
    iconEl.textContent = lang.icon as string;
    nameEl.textContent = lang.name as string;
    zone.style.borderColor = lang.color as string;
    zone.style.background = (lang.bgColor as string) + "44";
  }

  function resetSlotUI(slot: "a" | "b"): void {
    const zone = document.getElementById(`drop-${slot}`) as HTMLElement;
    const placeholder = document.getElementById(`placeholder-${slot}`) as HTMLElement;
    const filled = document.getElementById(`filled-${slot}`) as HTMLElement;
    if (!zone || !placeholder || !filled) return;
    filled.classList.add("hidden");
    filled.classList.remove("flex");
    placeholder.classList.remove("hidden");
    zone.style.borderColor = "";
    zone.style.background = "";
  }

  function syncHighlightChips(): void {
    const selectedIds = [slotA?.id, slotB?.id].filter(Boolean) as string[];
    langList.querySelectorAll(".lang-chip").forEach((chip) => {
      const el = chip as HTMLElement;
      const isSelected = selectedIds.includes((el.dataset.id ?? "") as string);
      el.classList.toggle("border-[var(--lime)]", isSelected);
      el.classList.toggle("bg-[rgba(163,230,53,0.06)]", isSelected);
    });
  }

  function maybeRenderComparison(): void {
    if (slotA && slotB) {
      emptyState.classList.add("hidden");
      compPanel.classList.remove("hidden");
      renderComparison(slotA, slotB);
    } else {
      compPanel.classList.add("hidden");
      emptyState.classList.remove("hidden");
    }
  }

  function renderComparison(a: LangData, b: LangData): void {
    const canvas = document.getElementById("radar-canvas") as HTMLCanvasElement;
    const legendEl = document.getElementById("radar-legend") as HTMLElement;
    if (canvas) drawRadar(canvas, a, b, METRICS);
    if (legendEl) renderRadarLegend(legendEl, a, b);
    renderBars(a, b);
    renderSpecs(a, b);
    renderWhen(a, b);
    renderCode(a, b, examples);
    if (codeRunnerSection) renderCodeRunner(codeRunnerSection, a, b, examples);
  }

  sidebarSearch?.addEventListener("input", () => {
    const q = sidebarSearch.value.toLowerCase();
    langList.querySelectorAll(".lang-chip").forEach((chip) => {
      const el = chip as HTMLElement;
      const name = (el.dataset.name ?? "").toLowerCase();
      el.style.display = name.includes(q) ? "" : "none";
    });
  });

  langList.addEventListener("dragstart", (e) => {
    const chip = (e.target as HTMLElement).closest(".lang-chip") as HTMLElement;
    if (!chip) return;
    e.dataTransfer?.setData("langId", chip.dataset.id ?? "");
    chip.classList.add("opacity-50");
  });

  langList.addEventListener("dragend", (e) => {
    const chip = (e.target as HTMLElement).closest(".lang-chip") as HTMLElement;
    chip?.classList.remove("opacity-50");
  });

  ["a", "b"].forEach((slot) => {
    const zone = document.getElementById(`drop-${slot}`) as HTMLElement;
    if (!zone) return;
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("border-[var(--lime)]", "bg-[rgba(163,230,53,0.04)]");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("border-[var(--lime)]", "bg-[rgba(163,230,53,0.04)]");
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("border-[var(--lime)]", "bg-[rgba(163,230,53,0.04)]");
      const id = e.dataTransfer?.getData("langId");
      const lang = langs.find((l) => l.id === id);
      if (lang) assignSlot(slot as "a" | "b", lang as LangData);
    });
  });

  langList.addEventListener("click", (e) => {
    const chip = (e.target as HTMLElement).closest(".lang-chip") as HTMLElement;
    if (!chip) return;
    const lang = langs.find((l) => l.id === chip.dataset.id) as LangData | undefined;
    if (!lang) return;
    if (!slotA) assignSlot("a", lang);
    else if (!slotB && slotA.id !== lang.id) assignSlot("b", lang);
    else if (slotA.id === lang.id) assignSlot("a", lang);
    else assignSlot("a", lang);
  });

  document.querySelectorAll(".slot-clear").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slot = (btn as HTMLElement).dataset.slot as "a" | "b";
      clearSlot(slot);
    });
  });

  try {
    const stored = sessionStorage.getItem("langCompare");
    if (stored) {
      const arr = JSON.parse(stored) as Array<{ id: string }>;
      if (arr[0]) {
        const la = langs.find((l) => l.id === arr[0].id) as LangData | undefined;
        if (la) assignSlot("a", la);
      }
      if (arr[1]) {
        const lb = langs.find((l) => l.id === arr[1].id) as LangData | undefined;
        if (lb) assignSlot("b", lb);
      }
    }
  } catch {
    // ignore
  }

  maybeRenderComparison();
}
