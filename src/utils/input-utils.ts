
const handlePatternPaste = (matcher: { [Symbol.match](string: string): RegExpMatchArray | null }) =>
  (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!e.clipboardData.getData('text/plain').match(matcher)) {
      e.preventDefault();
      return;
    }
  }
const handlePatternInput = (matcher: { [Symbol.match](string: string): RegExpMatchArray | null }) =>
  (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!e.key.match(matcher)) {
      e.preventDefault();
      return;
    }
  }
export const forcePatternInput = (matcher: { [Symbol.match](string: string): RegExpMatchArray | null }) => {
  return {
    onKeyPress: handlePatternInput(matcher),
    onPaste: handlePatternPaste(matcher)
  }
}
