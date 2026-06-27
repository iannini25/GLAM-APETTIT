# Glam-Appetit · Salão Boutique — Site

Site institucional premium, estático e responsivo, feito à mão em **HTML + CSS + JavaScript puro** (sem framework, sem build, sem dependência externa além das fontes do Google). Carrega rápido, é acessível e está pronto pra publicar em qualquer hospedagem (Netlify, Vercel, Hostinger, GitHub Pages, etc.).

---

## Como abrir

- **Jeito rápido:** dê dois cliques em `index.html`.
- **Recomendado (pra fontes e caminhos funcionarem 100%):** rode um servidor local:
  ```bash
  # dentro da pasta do projeto
  python3 -m http.server 8080
  # abra http://localhost:8080
  ```

## Estrutura

```
glam-appetit/
├── index.html                 # a página inteira (uma única página, com âncoras)
├── assets/
│   ├── css/style.css          # design system completo (cores, tipos, componentes)
│   ├── js/main.js             # interações (hero canvas, carta de cores, galeria, lightbox)
│   └── img/                   # fotos reais do salão + favicon
├── README.md                  # este arquivo
└── PROMPT-CLAUDE-CODE.md       # prompt pronto pra mandar pro Claude Code finalizar
```

---

## Decisões de design (resumo)

- **Conceito:** "Joalheria da beleza". O símbolo da marca é uma gema/lábios, então o site é tratado como vitrine de joia — fundo **vinho profundo** no hero (e não o creme genérico de site de IA), tipografia **Didone** fiel à logo e as **fotos reais** como protagonistas.
- **Tipografia:** `Bodoni Moda` (display, alto contraste = a logo) + `Jost` (geométrica, caixa-alta espaçada = o "SALÃO BOUTIQUE").
- **Cores (tokens em `:root` no CSS):** vinho `#6B2A3A`, vinho profundo `#2A1018`, rosé/coral `#C75C6E` (tirado do lábio da logo), creme `#F4EEE4`, areia `#E3D6C4`, dourado `#B7965E`, tinta `#211519`.
- **Elemento-assinatura:** a **Carta de Cores** — sanfona horizontal interativa com as tonalidades autorais (Ruivo, Morena Iluminada, Loiro Pérola, Mel, Chocolate). Não é uma galeria comum; é a história de cor do salão, que é o diferencial deles (coloristas).
- **Fundo do hero:** "seda líquida" feita em `<canvas>` — manchas suaves cor de vinho/rosé se movendo lentamente. Optei por código em vez de imagem de IA porque fica mais leve, 100% no controle da marca e sem "cara de IA". Respeita `prefers-reduced-motion` (vira quadro estático).
- **Movimento:** uma entrada orquestrada no hero + reveals discretos no scroll. Nada de microefeitos espalhados.
- **Acessibilidade:** navegação por teclado, foco visível, `aria-*` nos componentes, alt em todas as imagens, contraste alto, `prefers-reduced-motion` respeitado.
- **SEO:** `<title>`/meta description, Open Graph e **JSON-LD** (schema `HairSalon`).

---

## ⚠️ O que precisa ser preenchido antes de publicar

Tudo abaixo está marcado como placeholder no código (procure por `XXXXXXXXXXX`, "a confirmar" e o comentário `PLACEHOLDER`):

1. **Número de WhatsApp** — todos os botões usam `https://wa.me/55XXXXXXXXXXX`. Troque pelo número real (formato: 55 + DDD + número, só dígitos). Aparece em: nav, hero, signature ruivos, VIP, visita, CTA final e footer.
2. **Endereço completo em BH** — em `#visita` está "Belo Horizonte — MG / Endereço completo a confirmar". Coloque rua, número, bairro e CEP, e atualize também o `streetAddress`/`postalCode` no JSON-LD do `<head>`.
3. **Horário de fechamento** — hoje consta "Terça a sábado, a partir das 10h" (o horário de abertura é real; o de fechamento não foi confirmado). Ajuste em `#visita`, no footer e no `openingHoursSpecification` do JSON-LD.
4. **Depoimentos** — os 3 cards da seção `#depoimentos` são **placeholder** (estão marcados com um comentário no HTML). Substitua por avaliações reais do Google/Instagram, com nomes e iniciais verdadeiros.
5. **Telefone fixo (opcional)** — adicione `telephone` no JSON-LD se houver.
6. **Imagem de compartilhamento (og:image)** — hoje aponta pra `assets/img/cabelo-ruivo.png`. Se quiser, gere uma arte dedicada 1200×630 e atualize a meta tag.

> As fotos usadas são as **reais** que você enviou (cabelos, make, unhas, sobrancelha e o interior do salão). A logo foi recriada em SVG vetorial (em `assets/img/favicon.svg` e inline no HTML) pra ficar nítida em qualquer tamanho e sobre qualquer fundo.

---

## Ideias de evolução (opcionais)

- Botão flutuante de WhatsApp fixo no canto.
- Integração com sistema de agendamento online.
- Seção de tabela de serviços/valores.
- Converter os PNGs em **WebP** pra deixar ainda mais leve.
- `sitemap.xml` + `robots.txt` + Google Analytics/Meta Pixel.

O arquivo **`PROMPT-CLAUDE-CODE.md`** traz tudo isso já formatado pra você colar no Claude Code e ele finalizar.
