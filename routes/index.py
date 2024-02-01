from bottle import get, request, template

##############################
@get("/")
def _():
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
    return template("index.html", items=items, is_spa=is_spa, 
                    index_active_link=index_active_link,
                    url=url)












