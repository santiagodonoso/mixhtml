from bottle import get, template
import random

##############################
@get("/items/from/<number>")
def _(number):
    next_number = int(number) + 4
    html = """
    <template
        data-xTarget = "#items"           
        data-xPosition = "beforeend"    
    >
    """
    for i in range(int(number), next_number):
       item = {"id": i, "color": random.choice(["#737373"])}
       html += template("_item.html", item=item)     
    html += "</template>"
    html += f"""
    <template
        data-xTarget = "#btn_show_more"           
        data-xPosition = "replace"    
    >"""
    
    html += template("__btn_show_more.html", id=next_number)

    html += "</template>"
    return html