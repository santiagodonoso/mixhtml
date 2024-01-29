

history.replaceState({"url_to_load":replace_state_url}, "title", replace_state_url)

pages_not_found = []
// ##############################
async function load(url_to_load, push_to_history = true){

  if(url_to_load === undefined){
    url_to_load = event.target.getAttribute("href")
  }
  // console.log("url_to_load", url_to_load)

  try{
    page_id = one(`[href='${url_to_load}']`).getAttribute("data-page-id")
  }catch(ex){
    // page_id = "page_not_found"
  }
  // console.log("page_id", page_id)
  if( one(`#${page_id}`) ){
    // console.log("PAGE ALREADY LOADED")
    hide_show(url_to_load)
    // one(`#${page_id}`).classList.add("spa_show")
    set_url(url_to_load, push_to_history)
    return
  }

  if( pages_not_found.includes(page_id) ){
    // console.log("PAGE ALREADY LOADED - NOT FOUND")
    hide_show(url_to_load)
    one(`#page_not_found`).classList.add("spa_show")
    set_url(url_to_load, push_to_history)
    return 
  }

  console.log("LOADING PAGE")
  one("#page_loading").classList.add("spa_show")
  let conn = await fetch(url_to_load, { headers : {"spa":"yes"} })
  let res = await conn.text()
  
  one("#pages").insertAdjacentHTML("beforeend", res)
  hide_show(url_to_load)
  
  try{
    // console.log("${page_id}", page_id)
    one(`#${page_id}`).classList.add("spa_show")
  }catch(ex){
    // console.log("PAGE WAS NOT FOUND")
    pages_not_found.push(page_id)
    one(`#page_not_found`).classList.add("spa_show")
  }
  set_url(url_to_load, push_to_history)
  return
}

// ##############################
window.onpopstate = function(event){
  // console.log(event)
  // console.log(event.state)
  load(event.state.url_to_load, false)
}

// ##############################
function set_url(url_to_load, push_to_history){ // just comma separated elements with # and .
  // Remove all active class
  // console.log(url_to_load)
  all(".spa_active").forEach( el => el.classList.remove("spa_active") )
  all(`[href='${url_to_load}']`).forEach( el => el.classList.add("spa_active") )
  if(push_to_history){
    // console.log("pushing to history")
    // console.log("url_to_load", url_to_load)
    history.pushState({"url_to_load":url_to_load}, "testxxx", url_to_load)
  }
}

// ##############################
function hide_show(url_to_load){
  
  // console.log("url_to_load", url_to_load)
  
  try{
    hide_elements_csv = one(`[href='${url_to_load}']`).getAttribute("data-hide") 
    hide_elements_list = hide_elements_csv.split(",")
    hide_elements_list.forEach( q => { // .page #something
      all(q).forEach( el => {
        el.classList.remove("spa_show")
        el.classList.add("spa_hide")
      })
    })

    show_elements_csv = one(`[href='${url_to_load}']`).getAttribute("data-show") 
    show_elements_list = show_elements_csv.split(",")
    show_elements_list.forEach( q => { // .page #something
      all(q).forEach( el => {
        el.classList.remove("spa_hide")
        el.classList.add("spa_show")
      })
    })  
  }catch(ex){
    // console.log("xxxxxxxxxxxxx")
    all(".page").forEach( o => { 
      o.classList.remove("spa_show")
      o.classList.add("spa_hide")
      // console.log("o", o)
    })
    // console.log("SHOW?")
    one("#page_not_found").classList.remove("spa_hide")
    one("#page_not_found").classList.add("spa_show")
    // console.log("SHOW?")
  }
  hljs.highlightAll()
}

// **************************************************
// window.onscroll = setScrollPosition;
function setScrollPosition(){
  // console.log(event.target)
  // console.log(event.target.activeElement)
  // var y = window.pageYOffset;
  var y = event.target.scrollTop;
  // console.log("y", y)
  // var sNavId = document.querySelector('.page-active').getAttribute('data-page-id-to-show')
  var page_id = event.target.getAttribute('id')
  // console.log("page_id", page_id)
  try{one('#'+page_id).setAttribute('data-scroll-y', y)}catch(err){}
}