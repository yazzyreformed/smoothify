# Renk Checkpoint — v1 (2026-05-24)

Bu, geri dönmek istersen kullanabileceğin renk kaydıdır. Her smoothie için
`bg` = [c1, c2, c3] gradient durakları, `accent` = vurgu rengi.

| id | name          | c1        | c2        | c3        | accent    |
|----|---------------|-----------|-----------|-----------|-----------|
| 1  | SPRING        | #28e0d4   | #0aa6c9   | #0b6fb0   | #fff4cf   |
| 2  | DOPİNG        | #5fe6b4   | #23c89a   | #f0a23c   | #fff6e6   |
| 3  | CHOCOFY       | #ffd84d   | #ffb02e   | #5db7e8   | #fffaf0   |
| 4  | ALOHA         | #ffd23f   | #ffa41b   | #ff7a00   | #fff7e0   |
| 5  | AÇAI          | #ffe066   | #ffb072   | #ff8a5b   | #fff6ea   |
| 6  | ACIDIC        | #ffd1e3   | #ffec7a   | #ff8f8f   | #fff5f8   |
| 7  | LOST PARADISE | #ffe17a   | #ffbf3c   | #ff9248   | #fffaee   |
| 8  | HAWAIIAN      | #2fe0c8   | #15b7d6   | #2a7fd6   | #eafff9   |

## Geçiş ayarları (v1)
- TRANSITION_MS = 850
- bg-base transition: `background 0.9s cubic-bezier(0.4, 0, 0.2, 1)`
- slide enter translateY: 7%, scale: 0.96
- blob opacity: a=0.55, b=0.50, c=0.28
