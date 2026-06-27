# Design

> Visual system do Glam-Appetit. Derivado da **logo real**: gema/pétalas em framboesa #901848 + coral #F0605C, wordmark Didone em CAIXA-ALTA. Clima: claro, delicado, luxuoso. Identidade > tendência.

## Theme

Editorial de beleza "joalheria": base clara e arejada (off-white levemente rosado), com a framboesa e o coral da marca como voz, dourado-champagne como joia, e fotografia real como protagonista. Herói = foto editorial drásticamente bela (ruivo sobre vinho) com tipografia elegante por cima; corpo = leve e respirável. Art-direction por seção é permitida; a consistência é de voz, não de tratamento.

## Color

Paleta verificada para contraste WCAG AA. **Regra de ouro:** em fundo claro, texto só em `ink`/`raspberry`; `coral` e `gold` são decorativos (preenchimento, fios, gema) — reprovam como texto sobre claro. Em fundo escuro, `cream`/`rose`/`gold-on-dark`/`coral` passam.

| Token | Hex | Uso |
|---|---|---|
| `--blush` | `#FBF5F3` | fundo base (off-white rosado, hue ~350 — não é o creme-IA hue 40-100) |
| `--blush-2` | `#F6EBE8` | seções claras alternadas |
| `--shell` | `#F1E2DD` | superfícies/realces quentes |
| `--raspberry` | `#951B4C` | cor primária da marca: botões, swatches, acentos (7.66:1 em blush) |
| `--raspberry-deep` | `#5C1030` | fundo de seções escuras |
| `--plum` | `#2A0A17` | mais escuro: scrim do herói, rodapé |
| `--coral` | `#F0635C` | lábios da gema, preenchimentos, sublinhados (decorativo em claro) |
| `--coral-soft` | `#F59B8F` | hover/realce coral |
| `--rose-soft` | `#E6A9B4` | acento claro e eyebrows sobre escuro |
| `--gold` | `#C2A063` | dourado-champagne: fios/molduras finas (texto só sobre escuro) |
| `--gold-on-dark` | `#D8BC8A` | dourado para texto sobre fundo escuro (9.95:1 em plum) |
| `--ink` | `#2A0F1B` | títulos e texto sobre claro (16.45:1) |
| `--ink-soft` | `#6E4654` | texto secundário sobre claro (7.30:1) |
| `--cream` | `#FBF1EE` | texto sobre escuro (16.39:1 em plum) |

Estratégia de cor: **Committed/Drenched por seção** — claro domina o corpo; framboesa-profunda e plum carregam herói, carta de cores, visita e rodapé. Coral e dourado são joias pontuais, nunca papel de parede.

## Typography

- **Display:** `Bodoni Moda` (Didone alto-contraste) — É a fonte da logo. Wordmark da marca sempre em **CAIXA-ALTA** com `letter-spacing` ~.06em, gema acima/centralizada como na logo.
- **UI/Corpo:** `Jost` (geométrica, leve) — pareada por eixo de contraste (Didone serifada + geométrica sans). Corpo 300–400; títulos 500.
- Escala fluida `clamp()`, herói ≤ ~6rem. `text-wrap: balance` em h1–h3; medida de leitura 60–72ch.
- Light sobre escuro: +0.05 de line-height.

## Components

Gema/logo como SVG recolorível (coral nas pétalas, framboesa no corpo) via `currentColor` no wordmark — funciona sobre claro e escuro. Botões retos (sem raio), uppercase tracked. `<picture>` WebP+srcset em todas as fotos. Carta de Cores (sanfona), galeria com filtros + lightbox, botão flutuante de WhatsApp.

## Motion

Entrada orquestrada no herói; revelações sutis no scroll (sobre conteúdo já visível, nunca escondendo). Ease-out exponencial, sem bounce. `prefers-reduced-motion`: herói estático, revelações instantâneas.
