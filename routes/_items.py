from bottle import get, template
import random

##############################
@get("/items/from/<number>")
def _(number):
    next_number = int(number) + 4
    html = """
    <template
        mix-target = "#mini_items"           
        mix-position = "beforeend"    
    >
    """
    for i in range(int(number), next_number):
       item = {"id": i, "color": random.choice(["#737373"])}
       html += template("_item_mini.html", item=item)     
    html += "</template>"
    html += f"""
    <template
        mix-target = "#btn_show_more"           
        mix-position = "replace"    
    >"""
    
    html += template("__btn_show_more.html", id=next_number)

    html += "</template>"
    return html