export default function (date) {
    const d = new Date(date);
    return d.toLocaleString().replace(",", "");
  }
  