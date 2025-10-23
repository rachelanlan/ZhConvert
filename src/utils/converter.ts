import * as OpenCC_S2T from 'opencc-js/cn2t';
import * as OpenCC_T2S from 'opencc-js/t2cn';

// 使用 OpenCC 构造转换器（默认：简体中国大陆 cn ↔ 繁体台湾 tw）
const s2t = OpenCC_S2T.Converter({ from: 'cn', to: 'tw' });
const t2s = OpenCC_T2S.Converter({ from: 'tw', to: 'cn' });

// 标点规范：半角 ↔ 全角（不处理引号方向，避免误替换）
const punctHalfToFull: Record<string, string> = {
  ',': '，',
  '.': '。',
  ';': '；',
  ':': '：',
  '!': '！',
  '?': '？',
  '(': '（',
  ')': '）',
  '[': '【',
  ']': '】'
};
const punctFullToHalf: Record<string, string> = Object.fromEntries(
  Object.entries(punctHalfToFull).map(([half, full]) => [full, half])
);

// 新增：引号转换（ASCII 双引号 ↔ 中文书名号）
function toCornerQuotes(text: string): string {
  const targets = ['"', '“', '”'];
  let open = true;
  let out = '';
  for (const ch of text) {
    if (targets.includes(ch)) {
      out += open ? '「' : '」';
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

function toAsciiDoubleQuotes(text: string): string {
  const targets = ['「', '」'];
  let open = true;
  let out = '';
  for (const ch of text) {
    if (targets.includes(ch)) {
      out += '"';
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

function toCornerSingleQuotes(text: string): string {
  const targets = ["'", '‘', '’'];
  let open = true;
  let out = '';
  for (const ch of text) {
    if (targets.includes(ch)) {
      out += open ? '『' : '』';
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

function toAsciiSingleQuotes(text: string): string {
  const targets = ['『', '』'];
  let open = true;
  let out = '';
  for (const ch of text) {
    if (targets.includes(ch)) {
      out += "'";
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

// 简体 -> 繁体（OpenCC）并统一为全角标点与书名号
export function convertToTraditional(text: string): string {
  const converted = s2t(text);
  const punct = converted.split('').map((c: string) => punctHalfToFull[c] ?? c).join('');
  return toCornerSingleQuotes(toCornerQuotes(punct));
}

// 繁体 -> 简体（OpenCC）并统一为半角标点与 ASCII 双引号
export function convertToSimplified(text: string): string {
  const converted = t2s(text);
  const punct = converted.split('').map((c: string) => punctFullToHalf[c] ?? c).join('');
  return toAsciiSingleQuotes(toAsciiDoubleQuotes(punct));
}
