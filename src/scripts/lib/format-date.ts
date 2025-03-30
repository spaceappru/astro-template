const formatterDate = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function formatDate(date: string): string {
  return formatterDate.format(new Date(date)).replace(/[,]/g, "");
}
