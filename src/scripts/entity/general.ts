/**
 *  Файл для общих скриптов на всех страницах
 */

import { initDrawer } from "@lib/drawer";
import { initPageWidth } from "@lib/page-width";

initPageWidth();
initDrawer({ id: "mobile-menu" });
