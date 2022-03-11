let categories = ["category1","category2","category3"];
let selectedCategories = [...categories];


const constructUrl = (filters = []) =>{
  let urlParams = "&category=[";
  filters.forEach((filter,idx) =>{
    urlParams += '"'+filter+'"';
    if(idx < filters.length - 1){
      urlParams+= ",";
    }

  })
  urlParams+= "]";
  return `https://filltext.com/?rows=10&fname={firstName}&lname={lastName}${urlParams}&pretty=true`
}

const applyStyling = () =>{
  categories.forEach(category =>{
    document.getElementById(""+category).className = "category-item";

  })
  selectedCategories.forEach(category =>{
    document.getElementById(""+category).className = "isTurnedOn category-item";
  })
}

const init = (callback) =>{
    applyStyling();
    return callback(true)
}

const loadData = (url) =>{
  document.getElementById("empty").style.display = "none";
  document.getElementById("notempty").style.display = "block"
  document.getElementById("cardsContainer").innerHTML = "";
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    data.forEach(item =>{
      let cardsContainer = document.getElementById("cardsContainer");
      let card = createElement("div","",["card"]);
      let nameContainer = createElement("div",createInitials(item),["nameContainer"]);
      let usernameContainer = createElement("div",getUserName(item),["usernameContainer"]);
      let categoryContainer = createElement("div",item.category,["categoryContainer"]);
      card.append(nameContainer)
      card.append(usernameContainer)
      card.append(categoryContainer)
      console.log(card);
      cardsContainer.prepend(card);
    })
  });
}

const showEmptyState = () =>{
  document.getElementById("notempty").style.display = "none";
}

init(function(isFinished){
  if(isFinished){
    if(selectedCategories.length > 0){
      loadData(constructUrl(selectedCategories));
    }
    else{
      showEmptyState();
    }
  }
})



const onCategoryClicked = (name) =>{
  let index = selectedCategories.findIndex(item => item === name);
  if(index >= 0){
    selectedCategories.splice(index,1);
  }
  else{
    selectedCategories.push(name);
  }
  // emptyEverything();
  if(selectedCategories.length) loadData(constructUrl(selectedCategories));
  else showEmptyState();
  applyStyling();
}


const createElement = (type, innerHTML, classes, id) =>{
  let e = document.createElement(type);
  if(innerHTML) e.innerHTML = innerHTML;
  if(classes && classes.length){
    classes.forEach(function(c){
      e.classList.add(c);
    })
  };
  if(id) e.setAttribute("id",id);
  return e;
}


const createInitials = (data) =>{
  let output = data.fname.substring(0,1) + data.lname.substring(0,1);
  return output
}

const getUserName = (data) =>{
  return data.fname + " " + data.lname;
}