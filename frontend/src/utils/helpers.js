export function formatCurrency(value) {
  if (value === undefined || value === null) return "-";
  return `$${Number(value).toFixed(2)}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-GB");
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


