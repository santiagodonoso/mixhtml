# 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
# https://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@github.com/santiagodonoso/coderspage.com.git

from bottle import default_app, error, get, post, request, response, static_file, template
from icecream import ic

##############################
@get("/favicon.ico")
def _():
    return static_file("favicon.ico", ".")

##############################
@get("/app.css")
def _():
    return static_file("app.css", ".")

##############################
@get("/mixhtml.js")
def _():
    return static_file("mixhtml.js", ".")

##############################
@error(404)
def _(error):
   is_spa = request.query.get("spa", False)
   return template("404", is_spa=is_spa)

##############################
@get("/items/<id>")
def _(id):
    item = template("item.html", id=id)
    html =   f"""
            <template 
            data-xTarget = "#more_info"
            data-xPosition = "beforeend"
            data-xPushUrl = "/items/{id}"         
            >
                {item}
            </template>
            """
    return html


##############################
import routes.index
import routes._items

##############################
application = default_app()















