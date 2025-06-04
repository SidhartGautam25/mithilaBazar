export function getArg(name, shortName) {
  const argument = process.argv
    .slice(2)
    .filter(
      (arg) =>
        arg === `--${name}` ||
        arg.startsWith(`--${name}=`) ||
        (shortName && arg.startsWith(`-${shortName}=`))
    )
    .map((arg) => arg.split("=")[1] ?? "true")
    .map((arg) => arg.trim())
    .join(",");

  return argument || undefined;
}
