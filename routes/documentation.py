from bottle import get, request, template

##############################

@get("/documentation")
def _():
    url = "/documentation"
    documentation_active_link = "active_nav_link"    
    is_spa = True if request.query.get("spa") else False
    
    # normal page
    return template("documentation", 
                    title = "Documentation", 
                    page="documentation", 
                    documentation_active_link=documentation_active_link,
                    mix_replace_url = "/documentation",
                    nav_middle_id = "nav_documentation",
                    on_url = "/documentation",
                    is_spa=is_spa)



    # url = "/documentation"
    # documentation_active_link = "active_nav_link"    
    # is_spa = True if request.query.get("spa") else False
    # return template("documentation.html", is_spa = is_spa, 
    #                 documentation_active_link=documentation_active_link,
    #                 url=url)












