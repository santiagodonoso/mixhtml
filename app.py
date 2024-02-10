# 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
# https://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@github.com/santiagodonoso/coderspage.com.git

from bottle import default_app, error, get, post, request, response, static_file, template
from icecream import ic

##############################
@get("/favicon.png")
def _():
    return static_file("favicon.png", ".")

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
import routes.index
import routes.documentation
import routes.examples
import routes.how
import routes._item_preview
import routes._items

import routes.ex_1
import routes.ex_1_1
import routes.ex_2
import routes.ex_3
import routes.ex_4
import routes.is_email_available
import routes.example_delete_item
import routes.ex_8

import routes.ex_get_item
import routes.ex_post_item

##############################
application = default_app()
















