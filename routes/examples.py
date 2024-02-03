from bottle import get, request, template

##############################

@get("/examples")
def _():
    url = "/examples"
    examples_active_link = "active_nav_link"    
    is_spa = True if request.query.get("spa") else False
    
    # normal page
    return template("examples", 
                    title = "Examples", 
                    page="examples", 
                    examples_active_link=examples_active_link,
                    mix_replace_url = "/examples",
                    nav_middle_id = "nav_examples",
                    on_url = "/examples",
                    is_spa=is_spa)












