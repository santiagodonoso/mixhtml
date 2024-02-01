from bottle import get, request, template

##############################

@get("/documentation")
def _():
    url = "/documentation"
    documentation_active_link = "active_nav_link"    
    is_spa = True if request.query.get("spa") else False
    return template("documentation.html", is_spa = is_spa, 
                    documentation_active_link=documentation_active_link,
                    url=url)















