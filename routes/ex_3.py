from bottle import post, request, template
import uuid

##############################

@post("/ex-3")
def _():
    id = uuid.uuid4().hex[-6:]
    name = request.forms.get('user_name', "X")
    return f"""
        <template
            mix-target="#ex_3_frm"
            mix-replace
        >
            <div class="flex items-center justify-center p-4 text-neutral-200 bg-green-600">
                Hi {name}, your profile has been created. Your user id is: {id}
            </div>
        </template>      
    """











