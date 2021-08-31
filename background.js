function start() {
  
  // const div = document.getElementById('tradingview_2808a')
  const div2 = document.getElementsByTagName('iframe')
  // console.log('div', div);
  // console.log('div2', div2);
  let div

  for (let j = 0; j < div2.length; j++) {
    const element = div2[j];
    console.log(element.name)
    if(element.name.indexOf('tradingview')>-1){
      div = div2[j]
    }
  }

  var elmnt = div.contentWindow.document.getElementsByClassName("text")
  // var elmnt = div.contentWindow.document.getElementsByClassName("bar-mark-tooltip")

  console.log('elmnt', elmnt[0].innerText);
  const rawText = elmnt[0].innerText

  const arrayOfLines = rawText.match(/[^\r\n]+/g);

  console.log('arrayOfLines', arrayOfLines);

  const amountLine = arrayOfLines[1]
  const amountNumber = parseFloat(amountLine.replace(',','').split(" ")[1])
  console.log('amountNumber', amountNumber);

  const priceLine =  arrayOfLines[2]
  const priceNumber = parseFloat(priceLine.split('$')[1])
  console.log('priceNumber', priceNumber);
  // const amount = 
  // elmnt[0].innerText ='culito'
  const pricePerToken = priceNumber / amountNumber
  console.log('pricePerToken', pricePerToken);
  elmnt[0].innerText = pricePerToken

  }
  
  

  chrome.commands.onCommand.addListener((command,tab) => {
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: start
    });
  });
