from bottle import post, request, template
from icecream import ic
##############################

@post("/ex-8")
def _():
    name = request.forms.get("user_name") 
    last_name = request.forms.get('user_last_name')
    print(name)
    if name == "" or last_name == "":
        return """
            <template
                mix-target = "#ex_8_error"
                mix-position = "beforeend"
            >
            <div class="p-2 text-white bg-red-500"
                mix-live-for = "5"
            >
                name and/or last name missing
            </div>
            </template>
        """
    
    return f"""
        <template
            mix-target="[id='ex_8_users']"
            mix-after
        >
            <tr>
                <td>{name}</td>                
                <td>{last_name}</td>                
            </tr>
        </template>     
    """











