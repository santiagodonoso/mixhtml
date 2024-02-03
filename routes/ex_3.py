from bottle import post, request, template
import uuid

##############################

@post("/ex-3")
def _():
    id = uuid.uuid4().hex[-6:]
    name = request.forms.get('user_name', "X")
    return f"""
        <template
            mix-target="[mix-id='ex_3_div']"
            mix-position = "replace"
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-neutral-800">
                Hi {name}, your profile has been created. Your user id is: {id}
            </div>
        </template>

        <template
            mix-target="[mix-id='btn_3']"
            mix-position = "replace"
        >
        </template>        
    """











