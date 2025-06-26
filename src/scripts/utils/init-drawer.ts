interface DrawerArgs {
  /**
   * id триггер-кнопки
   */
  id: string;

  /**
   * длительность открывания/закрывания
   *
   * @default 200
   */
  duration?: number;
}

/**
 * Инициализация компонента Drawer
 */
export function initDrawer({ id, duration = 200 }: DrawerArgs) {
  const triggers = document.querySelectorAll(`#${id}`);
  const drawer = document.querySelector(`[data-drawer="${id}"]`);
  const back = drawer?.querySelector("[data-back]");

  if (drawer instanceof HTMLElement) {
    drawer.style.setProperty("--transition", `${duration}ms ease-in-out`);
  }

  let open = false;

  setTriggers();

  function setTriggers() {
    triggers.forEach((trigger) => {
      trigger.setAttribute("data-open", `${open}`);
    });
  }

  function openDrawer() {
    drawer?.setAttribute("data-open", "true");
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    open = true;
    setTriggers();

    //@ts-ignore
    if (typeof CloseWatcher !== "undefined") {
      //@ts-ignore
      let watcher = new CloseWatcher();
      watcher.onclose = () => {
        closeDrawer();
        watcher.destroy();
      };
    }
  }

  function closeDrawer() {
    drawer?.setAttribute("data-open", "idle");
    setTimeout(() => {
      drawer?.setAttribute("data-open", "false");
      document.getElementsByTagName("html")[0].style.overflow = "auto";
      open = false;
      setTriggers();
    }, duration);
  }

  function onTrigger() {
    return open ? closeDrawer() : openDrawer();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", onTrigger);
  });

  back?.addEventListener("click", closeDrawer);
}
