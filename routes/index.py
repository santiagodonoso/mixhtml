from bottle import get, template

##############################
@get("/")
def _():
    items = [
        {"id":1, "name":"one", "color":"#737373"},
        {"id":2, "name":"two", "color":"#737373"},
        {"id":3, "name":"three", "color":"##737373"},
        {"id":4, "name":"four", "color":"#737373"},
    ]
    return template("index.html", items=items)












