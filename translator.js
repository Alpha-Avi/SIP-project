const selectTag = document.querySelectorAll("select");
// console.log(selectTag)
const translateBtn = document.querySelector("#translate");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icon = document.querySelectorAll("i");


selectTag.forEach((tag,id)=>{
    for(const countriesCode in countries){ 
    let selected ;
    if(id == 0 && countriesCode== "en-GB"){
        seleted = "selected";
    }else if(id ==1 && countriesCode == "hi-IN"){
        seleted = "selected";
    }
        // for(const countriesCode in countries){
            let  option =  `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`
            tag.insertAdjacentHTML("beforeend",option);
        }
});
// translation area code 

translateBtn.addEventListener(("click"),()=>{
    let text = fromText.value,
    translatedfrom = selectTag[0].value,
    translatedto = selectTag[1].value;

    let apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translatedfrom}|${translatedto}`;

    fetch(apiURL).then(res =>res.json()).then(data =>{
        toText.value = data.responseData.translatedText;
    });
});

// acces  the icon 
icon.forEach(icon =>{
icon.addEventListener("click",({target})=>{
    if(target.classList.contains("copy")){
       // console.log("copy");
       if(target.id == "from"){
            navigator.clipboard.writeText(fromText.value)
       }else{
            navigator.clipboard.writeText(toText.value)
       }
    }else{
        //console.log("volume");
        let utterance;
        if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
        }else{
            utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value
        }
        speechSynthesis.speak(utterance);
    }
});
});