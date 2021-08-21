module.exports = function () {
    const colors = [
      "#0F2347",
      "#1C3F6E",
      "#2E67A0",
      "#5AACCF",
      "#EFFC93",
      "#80C271",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  