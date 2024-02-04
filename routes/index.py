from bottle import get, request, template
from icecream import ic

##############################
@get("/")
def _():

    items = [
        {"id":1, "name":"one", "color":"#737373"},
        {"id":2, "name":"two", "color":"#737373"},
        {"id":3, "name":"three", "color":"##737373"},
        {"id":4, "name":"four", "color":"#737373"},
    ]    
    is_spa = True if request.query.get("spa") else False
    return template(
        "index",
        is_spa = is_spa,
        url = "/",
        on_url = "/",
        items = items,
        item_preview = "_item_preview_default"
        )










    """
    items = [
        {"id":1, "name":"one", "color":"#737373"},
        {"id":2, "name":"two", "color":"#737373"},
        {"id":3, "name":"three", "color":"##737373"},
        {"id":4, "name":"four", "color":"#737373"},
    ]
    is_spa = True if request.query.get("spa") else False
    return template("base", 
                    title = "MIX HTML", 
                    is_spa=is_spa, 
                    page="index", 
                    mix_replace_url = "/",
                    nav_middle_id = "nav_index",
                    on_url = "/",
                    items=items)
    """                    
    """
    url = "/"
    index_active_link = "active_nav_link"
    # nav_middle_id = "nav_index"
    is_spa = True if request.query.get("spa") else False
    items = [
        {"id":1, "name":"one", "color":"#737373"},
        {"id":2, "name":"two", "color":"#737373"},
        {"id":3, "name":"three", "color":"##737373"},
        {"id":4, "name":"four", "color":"#737373"},
    ]
    return template("base.html", items=items, is_spa=is_spa, 
                    index_active_link=index_active_link,
                    url=url)
    """











