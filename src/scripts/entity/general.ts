/**
 *  Файл для общих скриптов на всех страницах
 */

import { initDrawer } from "@utils/init-drawer";
import { initPageWidth } from "@lib/page-width";

initPageWidth();

// инициализация мобильного меню
initDrawer({ id: "mobile-menu" });

// модальные окна
import "@lib/modal";

// маска телефона
import "@lib/mask-phone";

// работа с формами
import "@lib/form";
