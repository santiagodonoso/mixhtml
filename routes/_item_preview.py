from bottle import get, request, template

##############################

@get("/items/preview/<id>")
def _(id):
    url = f"/items/preview/{id}"
    index_active_link = "active_nav_link"    
    is_spa = True if request.query.get("spa") else False
    items = [
        {"id":1, "name":"one", "color":"#737373"},
        {"id":2, "name":"two", "color":"#737373"},
        {"id":3, "name":"three", "color":"##737373"},
        {"id":4, "name":"four", "color":"#737373"},
    ]    
    if not is_spa:
        return template("index", 
                        items=items, 
                        id=id, 
                        is_spa = is_spa, 
                        index_active_link=index_active_link,
                        url=url,
                        on_url = url,
                        item_preview = "_item_preview")

    return template(    "_item_preview", 
                        is_spa = is_spa, 
                        id=id
                    )













