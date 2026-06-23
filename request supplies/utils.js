export function formatDate(
  timestamp
) {

  if (!timestamp) return "";

  try {

    const date =
      timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

    return date.toLocaleString();

  } catch {

    return "";

  }

}

export function lowStock(
  quantity,
  minimum
) {

  return quantity <= minimum;

}

export function currency(
  amount
) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(amount);

}