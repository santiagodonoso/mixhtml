function cl(text){console.log(text)}

// let html = document.getElementsByTagName("html")[0]
// html = html.outerHTML
history.replaceState({"xonurl":"/"}, "title", "/")

// ##############################
async function x(el=false){
    
    if( !el ){
        cl("info x(el) not given. Using the element itself")
        el = event.target
    }
    cl(`##### xurl: ${el.dataset.xurl}`)
    if( ! el.dataset.xurl ){ console.log( `error : x() xurl missing` ); return }    
    cl(`ok : x() xurl to fetch data is '${el.dataset.xurl}'`)    

    // If element/s in dom, then show it. Else fetch them
    if( document.querySelector(`[data-xOnUrl="${el.dataset.xurl}"]`) ){
        cl("SPA already loaded, showing elements")
        xonurl(el.dataset.xurl)
        return
    }

    // xUrl not in the dom, get it
    fetch_data(el)

}

// ##############################
async function fetch_data(el){
    cl(`fetch_data()`)
    if( ! el.dataset.xmethod ){cl(`error : fetch_data() xMethod missing`); return}     
    el.dataset.xmethod = el.dataset.xmethod.toUpperCase() 
    if( ! ["GET", "POST", "PUT", "PATCH", "DELETE"].includes(el.dataset.xmethod) ){
        cl(`error : fetch_data() method '${el.dataset.xmethod}' not allowed`); return
    }
    cl(`ok : fetch_data() method to fetch data is ${el.dataset.xmethod}`)   
    const conn = await fetch(el.dataset.xurl, {
        method : el.dataset.xmethod
    })
    const res = await conn.text()
    document.querySelector("body").insertAdjacentHTML('beforeend', res)
    process_template(el.dataset.xurl)
}

// ##############################
function process_template(xurl){
    cl(`process_template()`)
    let actual_html = ""
    let new_url = false    
    if( ! document.querySelector("template[data-xTarget]") ){ cl(`process_template() - error - template not found`); return }
    document.querySelectorAll('template[data-xTarget]').forEach(template => {
        // console.log("template", template)  

        if( template.dataset.xnewurl && new_url == false ){
            new_url = template.dataset.xnewurl
        }
        // cl(`new_url: ${new_url}`)

        if( ! template.dataset.xtarget ){console.log(`process_template() - error - xTarget missing`); return}    
        console.log(`ok : x() the response data will affect '${template.dataset.xtarget}'`)
        if(! document.querySelector(template.dataset.xtarget) ){console.log(`process_template() - error - xTarget is not in the dom`); return}   

        const position = template.dataset.xposition || "innerHTML" // default
        console.log(`ok : x() position is '${position}'`)
        if( ! ["innerHTML", "replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
            console.log(`error : x() xPosition '${position}' is not valid`); return
        }

        if(position == "innerHTML"){            
            document.querySelector(template.dataset.xtarget).innerHTML = template.innerHTML
        }
        else if(position == "replace"){
            document.querySelector(template.dataset.xtarget).insertAdjacentHTML("afterend", template.innerHTML)
            document.querySelector(template.dataset.xtarget).remove()            
        }
        else{
            document.querySelector(template.dataset.xtarget).insertAdjacentHTML(position, template.innerHTML)
        }

        if( ! template.dataset.xpushurl ){ cl(`process_template() - optional - xPushUrl not set`) }
        // const xonurl = template.dataset.xonurl
        // cl(xonurl)
        template.remove()

        // Process newly injected elements and push to history
        xonurl(xurl)

    })
}


// ##############################
function xonurl(xurl, push_to_history = true){
    cl(`xonurl(xurl): ${xurl}`)
    document.querySelectorAll(`[data-xonurl='${xurl}']`).forEach( el => {
        // cl(el)
        const title = el.dataset.xtitle || false
        // console.log(`ok : x() the xTitle is '${title}'`)
        if(title){ document.title = title}   

        if(el.dataset.xpushurl && push_to_history){
            cl("set url, but do not push to history")
            // cl(el.dataset.xpushurl)
            history.pushState({"xonurl":el.dataset.xpushurl}, "", el.dataset.xpushurl)
            // history.replaceState({"xonurl":el.dataset.xseturl}, "title", el.dataset.xseturl)
        }

        if(el.dataset.xhide){
            // document.querySelector(el.dataset.xhide).classList.add("hidden")        
            document.querySelectorAll(el.dataset.xhide).forEach( i => {
                // cl(`hidding element: ${el.dataset.xhide}`) 
                // cl(i)               
                i.classList.add("hidden")
            })
        }
        if(el.dataset.xshow){
            // cl(`showing element: ${el.dataset.xshow}`)
            // document.querySelector(el.dataset.xshow).classList.remove("hidden")
                  
            // document.querySelectorAll(`[data-xshow='${el.dataset.xshow}']`).forEach( i => {
            document.querySelectorAll(el.dataset.xshow).forEach( i => {
                // cl(i)
                i.classList.remove("hidden")
            })
        }            
    })
}


// ##############################
window.onpopstate = function(event){
    cl(`##### onpopstate`)
    cl(event.state.xonurl)
    xonurl(event.state.xonurl, false)
}




// ##############################















/*
async function x(entry=false){
    
    if(!entry){
        // console.log("info x(entry) not given. Using the element itself")
        entry = event.target
    }
    // console.log(`info x(entry): ${entry}`)

    const xurl = entry.dataset.xurl
    if( ! xurl ){console.log(`error : x() xurl missing`); return}    
    // console.log(`ok : x() xurl to fetch data is '${url}'`)
    
    // If element/s in dom, then show it. Else fetch them
    if( document.querySelector(`[data-xOnUrl="${xurl}"]`) ){
        cl("SPA already loaded, showing elements")
        xonurl(xurl, false)
        return
    }


    const methods_allowed = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    let method = entry.dataset.xmethod
    if( ! method ){console.log(`error : x() xMethod missing`); return}     
    method = method.toUpperCase() 
    if( ! methods_allowed.includes(method) ){
        console.log(`error : x() method '${method}' not allowed`); return
    }
    console.log(`ok : x() method to fetch data is ${method}`)




    const conn = await fetch(xurl, {
        method : method
    })
    const res = await conn.text()
    console.log(`inserting res in the dom`)
    document.querySelector("body").insertAdjacentHTML('beforeend', res)

    let actual_html = ""
    let new_url = false
    document.querySelectorAll('template[data-xTarget]').forEach(template => {
        console.log("template", template)  

        if( template.dataset.xnewurl && new_url == false ){
            new_url = template.dataset.xnewurl
        }
        // cl(`new_url: ${new_url}`)

        const target = template.dataset.xtarget
        if( ! target ){console.log(`error : x() xTarget missing`); return}    
        console.log(`ok : x() the response data will affect '${target}'`)
        if(! document.querySelector(target) ){console.log(`error : x() xTarget is not in the dom`); return}   

        const position = template.dataset.xposition || "innerHTML" // default
        console.log(`ok : x() position is '${position}'`)
        if( ! ["innerHTML", "replace", "beforebegin", "afterbegin", "beforeend", "afterend"].includes(position) ){
            console.log(`error : x() xPosition '${position}' is not valid`); return
        }

        const temp_html = document.querySelector(target).outerHTML
        actual_html += `<template class="x" data-xTarget="${target}">${temp_html}</template>`


        if(position == "innerHTML"){            
            document.querySelector(target).innerHTML = template.innerHTML
        }
        else if(position == "replace"){
            document.querySelector(target).insertAdjacentHTML("afterend", template.innerHTML)
            document.querySelector(target).remove()            
        }
        else{
            document.querySelector(target).insertAdjacentHTML(position, template.innerHTML)
        }

        // const xonurl = template.dataset.xonurl
        // cl(xonurl)
        template.remove()

        // Process newly injected elements and push to history
        xonurl(xurl)

    })

    if( new_url ){ // push to history
        cl("Pushing to history")
        // cl(actual_html)
        history.pushState({"xonurl":new_url}, "", new_url)
    }
}


// ##############################
function xonurl(xurl, is_push_to_history = true){
    cl(`xonurl(xurl): ${xurl}`)
    document.querySelectorAll(`[data-xonurl='${xurl}']`).forEach( el => {
        cl(el)
        const title = el.dataset.xtitle || false
        // console.log(`ok : x() the xTitle is '${title}'`)
        if(title){ document.title = title}   

        if(el.dataset.xseturl && !is_push_to_history){
            cl("set url, but do not push to history")
            cl(el.dataset.xseturl)
            // history.pushState({"xonurl":el.dataset.xurl}, "", el.dataset.xurl)
            history.replaceState({"xonurl":el.dataset.xseturl}, "title", el.dataset.xseturl)
        }

        if(el.dataset.xhide){
            cl("hiding")
            // document.querySelector(el.dataset.xhide).classList.add("hidden")        
            document.querySelectorAll(el.dataset.xhide).forEach( i => {
                // console.log("hiding:", i)
                i.classList.add("hidden")
            })
        }
        if(el.dataset.xshow){
            cl("showing")
            // document.querySelector(el.dataset.xshow).classList.remove("hidden")
                  
            // document.querySelectorAll(`[data-xshow='${el.dataset.xshow}']`).forEach( i => {
            document.querySelectorAll(el.dataset.xshow).forEach( i => {
                // cl(i)
                i.classList.remove("hidden")
            })
        }            
    })
}

// ##############################
window.onpopstate = function(event){
    cl(event.state.xonurl)
    xonurl(event.state.xonurl, false)
}


// ##############################
// let clock = 0
// setInterval(function(){
//     document.querySelectorAll("[data-xTTL]").forEach(page=>{
//         // console.log(page)
//         let is_page_shown = page.classList.contains("hidden") ? false : true
//         // console.log("is_page_shown", is_page_shown)

//         if(page.dataset.xttl <= 0 && !is_page_shown ){
//             console.log("removing page")
//             page.remove()
//         }else if(!is_page_shown){
//             page.dataset.xttl -= 1 
//         }
//         })
// }, 1000)

*/