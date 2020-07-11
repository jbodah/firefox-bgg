document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key == "j") {
    value = event.target.value;
    match = /#[^#]*#/.exec(value);
    hashIdx = match.index;
    lastIdx = hashIdx + match[0].length;
    gameName = match[0].substr(1, match[0].length - 2)
    searchTerms = gameName.split('*')
    query = searchTerms.join().replaceAll(' ', '+');
    xhr = new XMLHttpRequest();
    xhr.onload = function(_event2) {
      nodes = xhr.responseXML.childNodes[0].childNodes;
      items = [];
      for (i = 0; i < nodes.length; i++) {
        node = nodes.item(i);
        if (node.nodeName == "item") {
          items.push(node);
        }
      }

      itemNamesAndIds = [];
      for (i = 0; i < items.length; i++) {
        item = items[i];
        itemName = "";
        for (j = 0; j < item.childNodes.length; j++) {
          maybeName = item.childNodes.item(j);
          if (maybeName.nodeName == "name")  {
            itemName = maybeName.attributes.value.value;
            break
          }
        }
        itemNamesAndIds.push([itemName, item.attributes.id.value]);
      }

      itemNamesAndIds = itemNamesAndIds.filter(function (tuple) {
        return searchTerms.every(term => tuple[0].toUpperCase().includes(term.toUpperCase()));
      })
      sorted = itemNamesAndIds.sort(function(tuple1, tuple2) {
        if (tuple1[0].length == tuple2[0].length) {
          return 0;
        }

        if (tuple1[0].length < tuple2[0].length) {
          return -1;
        }

        return 1;
      });
      idVal = sorted[0][1];
      name = sorted[0][0]
      replaceText = "[thing=" + idVal + "]" + name + "[/thing]"
      start = event.target.selectionStart;
      end = event.target.selectionEnd;
      event.target.value = event.target.value.substr(0, hashIdx) + replaceText + event.target.value.substr(lastIdx);
      event.target.selectionStart = hashIdx + replaceText.length;
      event.target.selectionEnd = hashIdx + replaceText.length;
    }
    xhr.open("GET", "https://boardgamegeek.com/xmlapi2/search?query=" + query + "&type=boardgame");
    xhr.send();
  }
});
