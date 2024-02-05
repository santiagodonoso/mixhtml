from bottle import get, request, template

##############################

@get("/how-it-works")
def _():
    url = "/how-it-works"
    how_active_link = "active_nav_link"    
    is_spa = True if request.query.get("spa") else False
    
    # normal page
    return template("how", 
                    title = "mixhtml - How it works",
                    page="how",                     
                    how_active_link = how_active_link,
                    mix_replace_url = "/how-it-works",
                    nav_middle_id = "nav_how",
                    on_url = "/how-it-works",
                    is_spa=is_spa)











