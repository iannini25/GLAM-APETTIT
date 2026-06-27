# Prompt para o Claude Code — finalizar o site da Glam-Appetit

> Copie tudo abaixo da linha e cole no Claude Code, com a pasta `glam-appetit/` aberta como projeto.

---

Você é um(a) dev front-end sênior. Estou te entregando um site **estático e já construído** (HTML + CSS + JS puro, sem framework e sem build) de um salão de beleza boutique de Belo Horizonte chamado **Glam-Appetit** (marca pessoal do Hugo Antunnes, @glam_byhugoantunnes). O salão é referência em **ruivos sem descoloração**, mechas, balayage e morena iluminada, e também faz maquiagem, unhas e sobrancelhas.

A identidade é luxo editorial: vinho profundo + creme + rosé, tipografia Didone (Bodoni Moda) com Jost. O site já tem hero com fundo animado em canvas ("seda líquida"), uma "Carta de Cores" interativa (sanfona horizontal), galeria com filtros e lightbox, e usa as fotos reais do salão. **Não quero que pareça feito por IA** — mantenha a estética intencional e a sobriedade do que já existe. **Não introduza React/Vue/Tailwind nem build tools**; siga vanilla.

## Arquivos
- `index.html` — página única com âncoras (`#casa`, `#cores`, `#servicos`, `#galeria`, `#visita`, etc.)
- `assets/css/style.css` — design system (tokens em `:root`)
- `assets/js/main.js` — interações
- `assets/img/` — fotos reais + `favicon.svg`
- Leia o `README.md` para o contexto completo e a lista de placeholders.

## Tarefas (em ordem de prioridade)

### 1. Trocar os placeholders de contato (obrigatório)
- Substitua **todas** as ocorrências de `55XXXXXXXXXXX` (links `https://wa.me/...`) pelo número real do WhatsApp do salão. São vários pontos: nav, hero, signature ruivos, VIP, visita, CTA final e footer. Mantenha as mensagens pré-preenchidas (`?text=...`).
- Se eu te passar o número, use-o; se não, **pare e me pergunte** em vez de inventar.

### 2. Endereço, horário e dados locais (obrigatório)
- Em `#visita`, troque "Belo Horizonte — MG / Endereço completo a confirmar" pelo endereço real (rua, nº, bairro, CEP).
- Adicione um link "Como chegar" para o Google Maps (ou um `<iframe>` de mapa discreto, respeitando a estética).
- Confirme o **horário de fechamento** (hoje só consta "a partir das 10h", de terça a sábado) e atualize em `#visita`, no footer e na `stat-row` da seção `#casa`.
- Atualize o **JSON-LD** no `<head>`: `streetAddress`, `postalCode`, `telephone` e o `openingHoursSpecification` com o horário correto.

### 3. Depoimentos reais (obrigatório)
- A seção `#depoimentos` tem 3 cards **placeholder** (marcados com comentário `PLACEHOLDER` no HTML). Substitua pelos depoimentos reais do Google/Instagram, com nomes, iniciais (no avatar `.av`) e a categoria correta. Se não houver reviews, me sugira coletar ou troque a seção por algo verdadeiro (ex.: selos/depoimentos em vídeo).

### 4. Imagens (opcional, mas recomendado)
- Otimize: converta os PNGs de `assets/img/` para **WebP** (mantendo um fallback) e gere versões responsivas (`srcset`) — o site tem várias fotos pesadas.
- Crie uma **og:image dedicada** 1200×630 com a logo + um trabalho marcante e atualize a meta tag.
- **Se eu pedir mais imagens/arte**, você pode gerar conteúdo com o **Higgsfield** (ex.: uma textura editorial pro fundo de alguma seção, uma capa de redes sociais, ou um tratamento de imagem). Sugestões de prompt, sempre na paleta vinho/rosé/creme e com cara de revista de beleza (sem look de "IA genérica"):
  - *"editorial beauty salon ambiance, deep wine and cream tones, soft cinematic light, flowing silk texture, luxury, grain, no text"*
  - *"close-up of glossy auburn red hair, studio editorial lighting, marsala background, high-end hair magazine"*
  - **Importante:** as fotos reais do salão continuam sendo as protagonistas. Use IA só como complemento, nunca para substituir o trabalho real.

### 5. Evoluções de produto (opcional)
- Botão flutuante de WhatsApp fixo (canto inferior), discreto e on-brand.
- Seção de **tabela de serviços/valores** (ou "a partir de R$"), se o salão quiser divulgar.
- Integração com **sistema de agendamento online** (ex.: link para a ferramenta que eles já usam).
- `sitemap.xml`, `robots.txt`, e tags de Google Analytics / Meta Pixel.
- Mais fotos na galeria (inclusive antes/depois reais), mantendo os `data-cat` (`cabelo`, `beleza`, `unhas`).

### 6. QA antes de entregar (obrigatório)
- Teste as interações: Carta de Cores (hover/click/teclado), filtros da galeria, lightbox (abrir, navegar, fechar, ESC), menu mobile, âncoras.
- Confira responsivo em 1440px, 768px e 390px.
- Rode o Lighthouse e mire em verde em Performance/Acessibilidade/SEO.
- Teste com `prefers-reduced-motion` ativo (o canvas deve virar quadro estático e os reveals devem aparecer sem animação).
- Valide que não sobrou nenhum `XXXXXXXXXXX` nem "a confirmar".

## Regras
- Preserve os tokens de cor e a tipografia atuais.
- Nada de framework, nada de build, nada de bibliotecas pesadas.
- Mantenha o código limpo, comentado em PT-BR onde fizer sentido, e a performance alta.
- Em qualquer dúvida sobre dados do salão (número, endereço, valores), **pergunte — não invente.**
