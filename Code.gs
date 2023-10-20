function onOpen() {
  yNum=0;
  while(yNum < getMaxColumns(DocumentApp.getActiveDocument().getBody().getTables()[0]))
  {
    xNum = 0;
    while(xNum < DocumentApp.getActiveDocument().getBody().getTables()[0].getNumRows())
    {
      addDefinitionToCell(xNum, yNum)
      xNum ++;
    }     
    yNum ++;
  }
}

function getMaxColumns(table)
{
  return table.getRow(0).getNumCells();
}
function getDefinition(num1, num2) {
  var url = "https://api.dictionaryapi.dev/api/v1/entries/en/" + decodeURI(getCell(num1, num2).getText().replace(" -", ""));
  try{  return UrlFetchApp.fetch(encodeURI(url)).getContentText();  }
  catch { return null;  }
}

function getCell(num1, num2)
{
  return DocumentApp.getActiveDocument().getBody().getTables()[0].getCell(num1, num2);
}

function addDefinitionToCell(x, y)
{
  try{
    noun = (JSON.stringify(JSON.parse(getDefinition(x, y))[0]["meaning"][Object.keys(JSON.parse(getDefinition(x, y))[0]["meaning"])[0]][0]["definition"]));
  }
  catch{
    noun = null;
  }
  if(noun != null)
  {
    getCell(x, y).appendParagraph(noun)
  }
}
