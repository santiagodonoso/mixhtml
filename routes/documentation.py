from bottle import get, request, template

##############################

@get("/documentation")
def _():
    is_spa = True if request.query.get("spa") else False
    return template("documentation.html", is_spa = is_spa)















