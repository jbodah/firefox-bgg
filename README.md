# firefox-bgg

a Firefox extension for expanding BoardGameGeek links by name

## Installation

<TODO>

## Usage

On any BGG page, type a game name surrounded by hash tags:

```
I really liked #sherlock holmes consulting#
```

Then hit `Ctrl+j`. If there is a match then the game name will expand with a link to the game:

```
I really liked [thing=3224]Sherlock Holmes Consulting Detective: The Mansion Murders[/thing]
```

The match is always based on character count, so it will match the shortest matching name returned by the BGG XML API

Wildcards are also supported via the `*` character:

```
I didn't care for #arkham * card game#
```

becomes

```
I didn't care for [thing=205637]Arkham Horror: The Card Game[/thing]
```
