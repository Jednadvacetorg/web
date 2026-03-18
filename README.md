# Jednadvacet.org

## Správa obsahu

### Blog

- Články se ukládají do `content/blog-articles/` s názvy souborů ve formátu `YYYYMMDD.nazev-clanku.md`
- Obrázky se ukládají do `public/blog/` s názvy souborů ve formátu `nazev-clanku-obrazek.jpg`
- V článku se zobruje datum zveřejnění článku, to se nastaví v názvu souboru. (Tedy musí být aktualizováno před schválením v pull requestu.)

### People

- Profily autorů článků, organizátorů apod. se ukládají do `content/people/` s názvy souborů ve formátu `jmeno.md`
- Avatary se ukládají do `public/people/` s názvy souborů ve formátu `jmeno.jpg` (čtverec min 512px)
- Odkaz na Nostr by měl začínat na `nprofile...` nebo `npub...` (tedy ne URL)

## Předpřipravený devcontainer

Visual Studio Code nebo GitHub Workspace umožňují použít devcontainer, který má předinstalované doporučené extensions a nastavení. Cokoliv v něm spustíš (nebo AI agent) tak bude izolováno od tvého systému pomocí Docker kontejneru.

> Spustíš jej ve VScode pomocí `Ctrl+Shift+P` a vybráním `Dev Containers: Reopen in Container`.

## OpenCode - AI agent

V pravém horním rohu je tlačítko `OpenCode` (nebo `Ctrl+Shift+P` a vybrat `OpenCode: Open`).

V základu můžeš zdarma používat základní modely (denní limit, stačí na jednodušší úkoly)

Nejlepší modely můžeš použít třeba přes [PPQ.ai](https://ppq.ai/invite/a586e70a) kde si nabíješ kredit (přes LN 10% sleva) a můžeš anonymně používat modely různých firem. Po nabítí kreditu si do souboru `.env` nastav svůj API klíč a restartuj devcontainer (`Ctrl+Shift+P` a vybrat `Dev Containers: Rebuild Container`).
