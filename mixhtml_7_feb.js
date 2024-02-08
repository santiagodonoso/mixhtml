function cl(text){console.log(text)}

// let html = document.getElementsByTagName("html")[0]
// html = html.outerHTML
history.replaceState({"mixonurl":mix_replace_url}, "title", mix_replace_url)

// ##############################
async function mixhtml(el=false){
    
    if( !el ){
        cl("info mix(el) not given. Using the element itself")
        el = event.target
    }
    cl(`##### mix-url: ${el.getAttribute("mix-url")}`)
    if( ! el.getAttribute("mix-url") ){ console.log( `error : mix() mix-url missing` ); return }    
    cl(`ok : mix() mix-url to fetch data is '${el.getAttribute("mix-url")}'`)    

    // If element/s in dom, then show it. Else fetch them
    if( document.querySelector(`[mix-on-url="${el.getAttribute("mix-url")}"]`) ){
        cl("SPA already loaded, showing elements")
        mixonurl(el.getAttribute("mix-url"))
        return
    }

    // xUrl not in the dom, get it
    mix_fetch_data(el)

}

// ##############################
async function mix_fetch_data(el){
    cl(`mix_fetch_data()`)
    if( ! el.getAttribute("mix-method") ){cl(`error : mix_fetch_data() mix-method missing`); return}
    el.setAttribute("mix-method", el.getAttribute("mix-method").toUpperCase())
    
    if( ! ["GET", "POST", "PUT", "PATCH", "DELETE"].includes(el.getAttribute("mix-method")) ){
        cl(`error : mix_fetch_data() method '${el.getAttribute("mix-method")}' not allowed`); return
    }

    cl(`ok : mix_fetch_data() method to fetch data is ${el.getAttribute("mix-method")}`)   
    let url = el.getAttribute("mix-url").includes("?") ? `${el.getAttribute("mix-url")}&spa=yes` : `${el.getAttribute("mix-url")}?spa=yes` 
    
    if(el.getAttribute("mix-method") == "POST"){
        if( ! el.getAttribute("mix-data") ){cl(`error : mix_fetch_data() mix-data missing`); return}
        if( ! document.querySelector(el.getAttribute("mix-data")) ){cl(`error - mix-data element doesn't exist`); return}            
    }    
    let conn = null
    if( ["POST", "PUT", "PATCH"].includes(el.getAttribute("mix-method")) ){
        conn = await fetch(url, {
            method : el.getAttribute("mix-method"),
            body : new FormData( document.querySelector(el.getAttribute("mix-data")) )
        })        
    }else{   
        conn = await fetch(url, {
            method : el.getAttribute("mix-method")
        })
    }

    res = await conn.text()
    document.querySelector("body").insertAdjacentHTML('beforeend', res)
    process_template(el.getAttribute("mix-url"))
}

// ##############################
function process_template(mix_url){
    cl(`process_template()`)
    let new_url = false    
    if( ! document.querySelector("template[mix-target]") ){ cl(`process_template() - error - template not found`); return }
    document.querySelectorAll('template[mix-target]').forEach(template => {
        // console.log("template", template)  

        if( template.getAttribute("mix-newurl") && new_url == false ){
            new_url = template.getAttribute("mix-newurl")
        }
        // cl(`new_url: ${new_url}`)

        if( ! template.getAttribute("mix-target") ){console.log(`process_template() - error - mix-target missing`); return}    
        console.log(`ok : mix() the response data will affect '${template.getAttribute("mix-target")}'`)
        if(! document.querySelector(template.getAttribute("mix-target")) ){console.log(`process_template() - error - mix-target is not in the dom`); return}   

        const position = template.getAttribute("mix-position") || "innerHTML" // default
        console.log(`ok : x() position is '${position}'`)
        if( ! ["innerHTML", "replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
            console.log(`error : mix() xPosition '${position}' is not valid`); return
        }

        if(position == "innerHTML"){            
            document.querySelector(template.getAttribute("mix-target")).innerHTML = template.innerHTML
        }
        else if(position == "replace"){
            document.querySelector(template.getAttribute("mix-target")).insertAdjacentHTML("afterend", template.innerHTML)
            document.querySelector(template.getAttribute("mix-target")).remove()            
        }
        else{
            document.querySelector(template.getAttribute("mix-target")).insertAdjacentHTML(position, template.innerHTML)
        }

        if( ! template.getAttribute("mix-push-url") ){ cl(`process_template() - optional - mix-push-url not set`) }
        // const xonurl = template.dataset.xonurl
        // cl(xonurl)
        template.remove()

        // Process newly injected elements and push to history
        mixonurl(mix_url)

    })
}


// ##############################
function mixonurl(mix_url, push_to_history = true){
    cl(`mixonurl(xurl): ${mix_url}`)
    
    document.querySelectorAll(`[mix-on-url='${mix_url}']`).forEach( el => {
        // cl(el)
        const title = el.getAttribute("mix-title") || false
        // console.log(`ok : x() the xTitle is '${title}'`)
        if(title){ document.title = title}   

        if(el.getAttribute("mix-push-url") && push_to_history){
            cl("Pushing to history")
            // cl(el.dataset.xpushurl)
            history.pushState({"mixonurl":el.getAttribute("mix-push-url")}, "", el.getAttribute("mix-push-url"))
            // history.replaceState({"xonurl":el.dataset.xseturl}, "title", el.dataset.xseturl)
        }

        if(el.getAttribute("mix-hide")){
            // document.querySelector(el.dataset.xhide).classList.add("hidden")        
            document.querySelectorAll(el.getAttribute("mix-hide")).forEach( i => {
                // cl(`hidding element: ${el.getAttribute("mix-hide")}`) 
                // cl(i)               
                i.classList.add("hidden")
            })
        }
        if(el.getAttribute("mix-show")){
            // cl(`showing element`)
            // cl(`showing element: ${el.getAttribute("mix-show")}`)
            // document.querySelector(el.dataset.xshow).classList.remove("hidden")
                  
            // document.querySelectorAll(`[data-xshow='${el.dataset.xshow}']`).forEach( i => {
            document.querySelectorAll(el.getAttribute("mix-show")).forEach( i => {
                cl(i)
                i.classList.remove("hidden")
            })
        }            
    })
}


// ##############################
window.onpopstate = function(event){
    cl(`##### onpopstate`)
    cl(event.state.mixonurl)
    mixonurl(event.state.mixonurl, false)
}


// ##############################
setInterval(function(){
    document.querySelectorAll("[mix-live-for]").forEach(el=>{
        if(el.getAttribute("mix-live-for") <= 0){
            el.remove()
        }else{
            el.setAttribute("mix-live-for", el.getAttribute("mix-live-for") - 1)
        }
    })
}, 1000)